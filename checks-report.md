# Checks Report — bf_optim_fph — 2026-11-13 11:50:11

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
2026-11-13T10:50:02Z	INFO	[vulndb] Need to update DB
2026-11-13T10:50:02Z	INFO	[vulndb] Downloading vulnerability DB...
2026-11-13T10:50:02Z	INFO	[vulndb] Downloading artifact...	repo="mirror.gcr.io/aquasec/trivy-db:2"
20.36 MiB / 133.47 MiB [--------->__________________________________________________] 15.26% ? p/s ?48.75 MiB / 133.47 MiB [--------------------->______________________________________] 36.52% ? p/s ?78.19 MiB / 133.47 MiB [----------------------------------->________________________] 58.58% ? p/s ?100.62 MiB / 133.47 MiB [--------------------------------->___________] 75.39% 133.61 MiB p/s ETA 0s123.47 MiB / 133.47 MiB [----------------------------------------->___] 92.50% 133.61 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 133.61 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 128.52 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 128.52 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 128.52 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 120.23 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 120.23 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 120.23 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 112.47 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 112.47 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 112.47 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 105.22 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 105.22 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [------------------------------------------->] 100.00% 105.22 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 98.43 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 98.43 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 98.43 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 92.08 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 92.08 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 92.08 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 86.14 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 86.14 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-------------------------------------------->] 100.00% 86.14 MiB p/s ETA 0s133.47 MiB / 133.47 MiB [-----------------------------------------------] 100.00% 24.82 MiB p/s 5.6s2026-11-13T10:50:08Z	INFO	[vulndb] Artifact successfully downloaded	repo="mirror.gcr.io/aquasec/trivy-db:2"
2026-11-13T10:50:08Z	INFO	[vuln] Vulnerability scanning is enabled
2026-11-13T10:50:09Z	INFO	[npm] Run "npm install" to collect the license information of packages	dir="node_modules"
2026-11-13T10:50:09Z	INFO	Number of language-specific files	num=1
2026-11-13T10:50:09Z	INFO	[npm] Detecting vulnerabilities...

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

[90m10:50AM[0m [32mINF[0m [1m13 commits scanned.[0m
[90m10:50AM[0m [32mINF[0m [1mscanned ~125761 bytes (125.76 KB) in 237ms[0m
[90m10:50AM[0m [32mINF[0m [1mno leaks found[0m
```

---

### `detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline)`

**Status:** ⏭ SKIP

---

