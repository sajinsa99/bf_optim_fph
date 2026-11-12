'use strict';

// ── Constantes ────────────────────────────────────────────────────────────────
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MOIS_COURT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const JOURS_COURT = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

// Seuils de recommandation d'un pont.
// On se limite à de courts pontages (au plus 2 jours de congé à la suite) : c'est la
// définition d'un « pont ». Au-delà, il s'agit de poser une semaine entière, pas un pont.
const GAP_MAX = 2;        // au plus 2 jours de congé posés pour combler un trou
const RATIO_MIN = 2;      // au moins 2 jours de repos par jour de congé posé

const ANNEE = new Date().getFullYear();

// ── Chargement des jours fériés (calendrier officiel DINUM, format iCal) ────────
// Même approche que bf_planning : on parse le .ics et on ne garde que l'année en cours.
async function chargerFeries() {
  const feries = new Map(); // clé "YYYYMMDD" → nom
  try {
    const res = await fetch('public_holidays.ics');
    const texte = await res.text();
    for (const ev of texte.split('BEGIN:VEVENT').slice(1)) {
      const dm = ev.match(/DTSTART;VALUE=DATE:(\d{8})/);
      const sm = ev.match(/SUMMARY:(.+)/);
      if (dm && sm && dm[1].startsWith(String(ANNEE))) {
        feries.set(dm[1], sm[1].trim());
      }
    }
  } catch {
    /* fichier statique indisponible */
  }
  return feries;
}

// ── Construction de l'année ─────────────────────────────────────────────────────
function cle(y, m, d) {
  return `${y}${String(m + 1).padStart(2, '0')}${String(d).padStart(2, '0')}`;
}

// Tableau d'un objet par jour de l'année, index 0 = 1er janvier.
function construireAnnee(feries) {
  const jours = [];
  const fin = new Date(ANNEE, 11, 31);
  for (let d = new Date(ANNEE, 0, 1); d <= fin; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    const k = cle(ANNEE, d.getMonth(), d.getDate());
    const nomFerie = feries.get(k) || null;
    const weekend = dow === 0 || dow === 6;
    jours.push({
      date: new Date(d),
      mois: d.getMonth(),
      jour: d.getDate(),
      dow,
      weekend,
      ferie: !!nomFerie,
      nomFerie,
      libre: weekend || !!nomFerie, // libre « de base », avant de poser des congés
      conge: false,
    });
  }
  return jours;
}

// ── Détection des ponts ─────────────────────────────────────────────────────────
// On repère les suites de jours travaillés encadrées par des jours libres et on
// marque comme « congé » celles qui sont rentables (gap court + fort ratio).
function marquerConges(jours) {
  let i = 0;
  while (i < jours.length) {
    if (jours[i].libre) { i++; continue; }

    // Suite de jours travaillés [i, j[
    let j = i;
    while (j < jours.length && !jours[j].libre) j++;
    const gap = j - i;

    // Jours libres consécutifs à gauche (L) et à droite (R).
    let L = 0;
    for (let k = i - 1; k >= 0 && jours[k].libre; k--) L++;
    let R = 0;
    for (let k = j; k < jours.length && jours[k].libre; k++) R++;

    const sejour = L + gap + R;
    const ratio = sejour / gap;
    if (gap <= GAP_MAX && ratio >= RATIO_MIN) {
      for (let k = i; k < j; k++) jours[k].conge = true;
    }
    i = j;
  }
}

// ── Périodes de repos (fusion week-ends + fériés + congés posés) ─────────────────
function calculerPeriodes(jours) {
  const periodes = [];
  let i = 0;
  while (i < jours.length) {
    const libre2 = jours[i].libre || jours[i].conge;
    if (!libre2) { i++; continue; }

    let j = i;
    while (j < jours.length && (jours[j].libre || jours[j].conge)) j++;
    const bloc = jours.slice(i, j);
    const nbConge = bloc.filter((x) => x.conge).length;
    const aFerie = bloc.some((x) => x.ferie);
    // On ne retient que les périodes « intéressantes » : au moins 3 jours et
    // soit un férié, soit un congé posé (on ignore les simples week-ends).
    if (bloc.length >= 3 && (aFerie || nbConge > 0)) {
      periodes.push({
        debut: bloc[0].date,
        fin: bloc[bloc.length - 1].date,
        duree: bloc.length,
        nbConge,
        congesJours: bloc.filter((x) => x.conge),
        feries: bloc.filter((x) => x.ferie).map((x) => x.nomFerie),
      });
    }
    i = j;
  }
  return periodes;
}

// ── Formatage ────────────────────────────────────────────────────────────────────
function fmtCourt(date) {
  return `${JOURS_COURT[date.getDay()]} ${date.getDate()} ${MOIS_COURT[date.getMonth()]}`;
}
function fmtLong(date) {
  return `${JOURS[date.getDay()]} ${date.getDate()} ${MOIS[date.getMonth()]} ${date.getFullYear()}`;
}
function listeDates(jours) {
  return jours.map((x) => fmtCourt(x.date)).join(' + ');
}

// ── Rendu ────────────────────────────────────────────────────────────────────────
function rendreFeries(feries) {
  const tbody = document.querySelector('#table-feries tbody');
  const entrees = [...feries.entries()]
    .map(([k, nom]) => ({
      date: new Date(Number(k.slice(0, 4)), Number(k.slice(4, 6)) - 1, Number(k.slice(6, 8))),
      nom,
    }))
    .sort((a, b) => a.date - b.date);

  for (const e of entrees) {
    const tr = document.createElement('tr');
    const weekend = e.date.getDay() === 0 || e.date.getDay() === 6;
    if (weekend) tr.classList.add('ferie-weekend');
    tr.innerHTML =
      `<td>${e.date.getDate()} ${MOIS[e.date.getMonth()]}</td>` +
      `<td>${JOURS[e.date.getDay()]}${weekend ? ' <span class="tag">week-end</span>' : ''}</td>` +
      `<td>${e.nom}</td>`;
    tbody.appendChild(tr);
  }
}

function rendreResume(periodes) {
  const resume = document.getElementById('resume');
  const liste = document.getElementById('liste-ponts');

  const ponts = periodes.filter((p) => p.nbConge > 0);
  const acquis = periodes.filter((p) => p.nbConge === 0); // longs week-ends sans congé

  const totalConge = ponts.reduce((s, p) => s + p.nbConge, 0);
  const totalRepos = ponts.reduce((s, p) => s + p.duree, 0);

  resume.innerHTML =
    `<p class="chiffres">En posant <strong>${totalConge} jour${totalConge > 1 ? 's' : ''} de congé</strong>, ` +
    `vous obtenez <strong>${totalRepos} jours de repos</strong> répartis sur ` +
    `<strong>${ponts.length} pont${ponts.length > 1 ? 's' : ''}</strong>.</p>` +
    (acquis.length
      ? `<p class="note">Et ${acquis.length} long${acquis.length > 1 ? 's' : ''} week-end${acquis.length > 1 ? 's' : ''} ` +
        `déjà acquis sans poser de congé (férié collé au week-end).</p>`
      : '');

  // Ponts à poser, classés par rentabilité décroissante.
  ponts.sort((a, b) => (b.duree / b.nbConge) - (a.duree / a.nbConge) || a.debut - b.debut);
  for (const p of ponts) {
    const ratio = (p.duree / p.nbConge).toFixed(1).replace('.', ',');
    const li = document.createElement('li');
    li.className = 'pont';
    li.innerHTML =
      `<span class="pont-action">Poser ${p.nbConge} congé${p.nbConge > 1 ? 's' : ''} : ${listeDates(p.congesJours)}</span>` +
      `<span class="pont-gain">→ ${p.duree} jours de repos (${fmtCourt(p.debut)} → ${fmtCourt(p.fin)}), ratio ${ratio}×</span>`;
    liste.appendChild(li);
  }

  // Longs week-ends gratuits, par ordre chronologique.
  acquis.sort((a, b) => a.debut - b.debut);
  for (const p of acquis) {
    const li = document.createElement('li');
    li.className = 'pont gratuit';
    li.innerHTML =
      `<span class="pont-action">0 congé — ${p.feries.join(', ')}</span>` +
      `<span class="pont-gain">→ ${p.duree} jours de repos (${fmtCourt(p.debut)} → ${fmtCourt(p.fin)})</span>`;
    liste.appendChild(li);
  }
}

function rendreCalendrier(jours) {
  const cal = document.getElementById('calendrier');
  const parMois = Array.from({ length: 12 }, () => []);
  for (const j of jours) parMois[j.mois].push(j);

  for (let m = 0; m < 12; m++) {
    const ligne = document.createElement('div');
    ligne.className = 'mois-ligne';

    const label = document.createElement('div');
    label.className = 'mois-label';
    label.textContent = MOIS_COURT[m];
    ligne.appendChild(label);

    const cases = document.createElement('div');
    cases.className = 'mois-cases';
    for (const j of parMois[m]) {
      const c = document.createElement('div');
      c.className = 'case';
      if (j.ferie) c.classList.add('ferie');
      else if (j.conge) c.classList.add('conge');
      else if (j.weekend) c.classList.add('weekend');
      else c.classList.add('travaille');
      c.textContent = j.jour;
      c.title = fmtLong(j.date) + (j.nomFerie ? ` — ${j.nomFerie}` : (j.conge ? ' — congé à poser' : ''));
      cases.appendChild(c);
    }
    ligne.appendChild(cases);
    cal.appendChild(ligne);
  }
}

// ── Démarrage ────────────────────────────────────────────────────────────────────
(async function main() {
  document.getElementById('annee').textContent = ANNEE;
  for (const el of document.querySelectorAll('.annee-inline')) el.textContent = ANNEE;

  const feries = await chargerFeries();
  const jours = construireAnnee(feries);
  marquerConges(jours);
  const periodes = calculerPeriodes(jours);

  rendreFeries(feries);
  rendreResume(periodes);
  rendreCalendrier(jours);
})();
