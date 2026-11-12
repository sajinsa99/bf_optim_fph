# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`bf_optim_fph` est un **optimiseur de ponts** : à partir des **jours fériés français de
l'année en cours**, il indique comment poser ses congés pour enchaîner un maximum de jours de
repos (ponts autour des fériés et des week-ends, souvent en mai). Deux couches :

- **`server.js`** — serveur Node.js + Express minimal. Il sert uniquement les fichiers
  statiques de `public/`. **Aucune** authentification, **aucune** donnée persistée, **aucune**
  API (contrairement à `bf_planning`) : tout le calcul se fait côté navigateur.
- **`public/`** — frontend HTML/CSS/JS vanilla (pas de framework).

Tous les textes, commentaires et messages de commit sont en **français**. Garder cette
convention.

## Commands

```bash
npm install
npm start                 # node server.js, écoute sur PORT (défaut 3000) → http://localhost:3000
```

Il n'y a **pas** de suite de tests.

### Linting / checks
```bash
bash checks.sh            # lance tous les linters/scanners dans l'image Docker xmk_linters → checks-report.md
```
`checks.sh` nécessite Docker (image SAP interne **`xmk_linters:2.0.2`**) et lance shellcheck,
jsonlint, markdownlint, eslint, semgrep, trivy, gitleaks. shellcheck est aussi disponible
localement pour un contrôle rapide hors Docker (`shellcheck install.sh update_deps.sh`).

## Architecture

### Source des jours fériés
- `public/public_holidays.ics` — calendrier officiel DINUM (Métropole), format iCal,
  couvre 2021–2031 (11 jours fériés/an). **Copie** du même fichier dans `bf_planning` ;
  dupliqué volontairement pour garder `bf_optim_fph` autonome.
- Parsing (`public/app.js`, `chargerFeries`) : split sur `BEGIN:VEVENT`, regex
  `DTSTART;VALUE=DATE:(\d{8})` + `SUMMARY:(.+)`, filtré sur l'année en cours
  (`new Date().getFullYear()`). Même logique que `bf_planning/public/app.js`.

### Logique d'optimisation (`public/app.js`, client-side)
- `construireAnnee` : un objet par jour du 1/1 au 31/12 ; chaque jour est `weekend`, `ferie`,
  ou travaillé. `libre = weekend || ferie`.
- `marquerConges` : repère les suites de jours **travaillés** encadrées par des jours libres.
  Pour un trou de `g` jours bordé de `L` jours libres à gauche et `R` à droite, le séjour
  obtenu est `L + g + R` et la rentabilité `(L+g+R)/g`. On ne retient (marque `conge`) que les
  trous avec **`g ≤ GAP_MAX` (2)** et **ratio ≥ `RATIO_MIN` (2)**. Le plafond à 2 est
  volontaire : au-delà on pose une semaine entière, pas un « pont ».
- `calculerPeriodes` : fusionne week-ends + fériés + congés posés en périodes continues
  (≥ 3 jours contenant un férié ou un congé). Les périodes avec `nbConge > 0` sont des **ponts
  à poser** ; celles avec `nbConge === 0` sont des **longs week-ends déjà acquis** (férié collé
  au week-end). La fusion évite de double-compter les jours de repos.
- `rendre*` : tableau des fériés, résumé + liste des ponts (triés par rentabilité), et le
  calendrier (12 lignes = mois, une case par jour).

### Code couleur des cases (voir `public/style.css`, variables `:root`)
- vert franc `.ferie` = jour férié · vert pâle `.conge` = congé à poser ·
  gris clair `.weekend` = week-end · blanc `.travaille` = jour travaillé.

### Déploiement
`install.sh` (lancé en **root** sur Ubuntu) déploie dans `/opt/bf_optim_fph`, installe le
service systemd `deploy/bf_optim_fph.service` (tourne en `www-data`, `PORT=3001` pour ne pas
entrer en conflit avec `bf_planning` sur 3000), et injecte le snippet
`deploy/nginx-bf_optim_fph.conf` sous `/optim/` dans le vhost nginx `bruno` via le glob include
`/etc/nginx/snippets/*_location.conf` (mécanisme partagé avec `bf_planning`, idempotent).
Pas de `.env`, pas de mot de passe, pas de dossier `data/` : le service démarre immédiatement.

## Conventions
- Node épinglé à 20.20.2 / npm 10.8.2 (voir `engines` dans `package.json` et `.nvmrc`).
- Dépendance unique : `express` — garder l'empreinte minimale.
- Gitignored : `node_modules/`, `tmp/`, `.vscode/`, `checks-report.md`.
- Projet **année en cours uniquement** : pas de navigation entre années.
- `update_deps.sh` : vérifie les mises à jour npm en respectant le pin Node (copie générique
  de `bf_planning/update_deps.sh`).
