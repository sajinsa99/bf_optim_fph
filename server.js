'use strict';

const express = require('express');
const path = require('path');

const app = express(); // nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
const PORT = process.env.PORT || 3000;

// Site statique en lecture seule : aucune donnée persistée, aucune authentification.
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache')
}));

app.listen(PORT, () => {
  console.log(`bf_optim_fph running on port ${PORT}`);
});
