# Checks Report — bf_optim_fph — 2026-11-13 13:17:32

## Summary

| Check | Status |
|---|---|
| shellcheck  install.sh | ✅ PASS |
| shellcheck  update_deps.sh | ✅ PASS |
| jsonlint  package.json | ✅ PASS |
| markdownlint-cli2  Markdown files | ✅ PASS |
| eslint  (no eslint.config.js found — create one to enable) | ⏭ SKIP |
| yamllint  YAML files | ✅ PASS |
| semgrep  server.js + public/app.js | ✅ PASS |
| trivy  HIGH/CRITICAL CVEs | ✅ PASS |
| gitleaks  secrets in repo | ✅ PASS |
| detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline) | ⏭ SKIP |
| **Total** | PASS: 8 · FAIL: 0 · SKIP: 2 |

---

## Shell

### `shellcheck  install.sh`

**Status:** ✅ PASS

_no output_

---

### `shellcheck  update_deps.sh`

**Status:** ✅ PASS

_no output_

---

## JSON

### `jsonlint  package.json`

**Status:** ✅ PASS

```
{
  "name": "bf_optim_fph",
  "version": "1.0.0",
  "description": "Optimiseur de ponts : comment poser ses congés autour des jours fériés français",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "22.22.1",
    "npm": "9.2.0"
  },
  "dependencies": {
    "express": "^5.3.0"
  }
}
```

---

## Markdown

### `markdownlint-cli2  Markdown files`

**Status:** ✅ PASS

```
markdownlint-cli2 v0.24.1 (markdownlint v0.42.1)
Finding: ./README.md ./CLAUDE.md
Linting: 2 files
Summary: 0 issues in 0 files
```

---

## JavaScript

### `eslint  (no eslint.config.js found — create one to enable)`

**Status:** ⏭ SKIP

---

## YAML

### `yamllint  YAML files`

**Status:** ✅ PASS

_no output_

---

## Static Analysis

### `semgrep  server.js + public/app.js`

**Status:** ✅ PASS

```
               
               
┌─────────────┐
│ Scan Status │
└─────────────┘
  Scanning 2 files tracked by git with 1074 Code rules:
                                                                                                                        
  Language      Rules   Files          Origin      Rules                                                                
 ─────────────────────────────        ───────────────────                                                               
  js              153       2          Community    1074                                                                
  <multilang>      47       2                                                                                           
                                                                                                                        
                
                
┌──────────────┐
│ Scan Summary │
└──────────────┘
✅ Scan completed successfully.
 • Findings: 0 (0 blocking)
 • Rules run: 200
 • Targets scanned: 2
 • Parsed lines: ~100.0%
 • No ignore information available
Ran 200 rules on 2 files: 0 findings.
(need more rules? `semgrep login` for additional free Semgrep Registry rules)

If Semgrep missed a finding, please send us feedback to let us know!
See https://semgrep.dev/docs/reporting-false-negatives/
```

---

## Dependency CVEs

### `trivy  HIGH/CRITICAL CVEs`

**Status:** ✅ PASS

```
2026-11-13T12:17:24Z	INFO	[vulndb] Need to update DB
2026-11-13T12:17:24Z	INFO	[vulndb] Downloading vulnerability DB...
2026-11-13T12:17:24Z	INFO	[vulndb] Downloading artifact...	repo="mirror.gcr.io/aquasec/trivy-db:2"
28.82 MiB / 133.47 MiB [------------>_______________________________________________] 21.59% ? p/s ?72.02 MiB / 133.47 MiB [-------------------------------->___________________________] 53.96% ? p/s ?115.57 MiB / 133.47 MiB [--------------------------------------------------->_______] 86.59% ? p/s ?133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 174.39 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 174.39 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 174.39 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 163.14 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 163.14 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 163.14 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 152.61 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 152.61 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 152.61 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 142.76 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 142.76 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 142.76 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 133.55 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 133.55 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 133.55 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 124.94 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 124.94 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 124.94 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 116.88 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 116.88 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 116.88 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 109.34 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-----------------------------------------------] 100.00% 26.95 MiB p/s 5.2s2026-11-13T12:17:29Z	INFO	[vulndb] Artifact successfully downloaded	repo="mirror.gcr.io/aquasec/trivy-db:2"
2026-11-13T12:17:29Z	INFO	[vuln] Vulnerability scanning is enabled
2026-11-13T12:17:29Z	INFO	[npm] Run "npm install" to collect the license information of packages	dir="node_modules"
2026-11-13T12:17:29Z	INFO	Number of language-specific files	num=1
2026-11-13T12:17:29Z	INFO	[npm] Detecting vulnerabilities...

Report Summary

┌───────────────────┬──────┬─────────────────┐
│      Target       │ Type │ Vulnerabilities │
├───────────────────┼──────┼─────────────────┤
│ package-lock.json │ npm  │        0        │
└───────────────────┴──────┴─────────────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)
```

---

## Secrets

### `gitleaks  secrets in repo`

**Status:** ✅ PASS

```

    ○
    │╲
    │ ○
    ○ ░
    ░    gitleaks

[90m12:17PM[0m [32mINF[0m [1m15 commits scanned.[0m
[90m12:17PM[0m [32mINF[0m [1mscanned ~133851 bytes (133.85 KB) in 230ms[0m
[90m12:17PM[0m [32mINF[0m [1mno leaks found[0m
```

---

### `detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline)`

**Status:** ⏭ SKIP

---

