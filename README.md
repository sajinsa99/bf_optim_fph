# bf_optim_fph

Optimiseur de **ponts** : à partir des **jours fériés français de l'année en cours**, l'outil
indique **comment poser ses congés** pour enchaîner un maximum de jours de repos (ponts autour
des jours fériés et des week-ends, souvent concentrés en mai).

## Fonctionnement

- Les jours fériés proviennent du calendrier officiel DINUM (Métropole),
  `public/public_holidays.ics` — même source que le projet voisin `bf_planning`.
- Tout le calcul se fait côté navigateur (JS vanilla). Le serveur se contente de servir la page.
- **Année en cours uniquement** (pas de navigation entre années).

Un pont est recommandé quand poser quelques jours de congé (au plus 4 d'affilée) rapporte au
moins 2 jours de repos par jour posé (week-ends et fériés inclus).

## Page web

- La **liste des jours fériés** de l'année (date, jour de la semaine, fête).
- Une **recommandation** : combien de congés poser, pour combien de jours de repos, et le
  détail de chaque pont classé par rentabilité.
- Un **calendrier** de l'année (une ligne par mois, une case par jour) :

| Couleur | Signification |
| --- | --- |
| 🟩 Vert | Jour férié |
| 🟢 Vert pâle | Congé à poser (le pont recommandé) |
| ⬜ Gris clair | Week-end |
| ⬜ Blanc | Jour travaillé |

## Commandes

```bash
npm install
npm start                 # node server.js, écoute sur PORT (défaut 3000)
```

Puis ouvrir <http://localhost:3000>.

## Qualité / sécurité

```bash
bash checks.sh            # shellcheck, eslint, semgrep, trivy, gitleaks… via l'image xmk_linters:2.0.2 (Docker requis)
```

## Déploiement

`install.sh` (lancé en **root** sur Ubuntu) déploie dans `/opt/bf_optim_fph`, installe le
service systemd `deploy/bf_optim_fph.service` (port 3001, utilisateur `www-data`) et injecte le
snippet `deploy/nginx-bf_optim_fph.conf` sous `/fph_optim/` dans le vhost nginx existant.
