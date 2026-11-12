# Checks Report — bf_optim_fph — 2026-11-12 15:39:37

## Summary

| Check | Status |
|---|---|
| shellcheck  install.sh | ✅ PASS |
| shellcheck  update_deps.sh | ✅ PASS |
| jsonlint  package.json | ✅ PASS |
| markdownlint-cli2  Markdown files | ❌ FAIL |
| eslint  (no eslint.config.js found — create one to enable) | ⏭ SKIP |
| yamllint  (no *.yaml / *.yml files found) | ⏭ SKIP |
| semgrep  server.js + public/app.js | ❌ FAIL |
| trivy  HIGH/CRITICAL CVEs | ✅ PASS |
| gitleaks  secrets in repo | ✅ PASS |
| detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline) | ⏭ SKIP |
| **Total** | PASS: 5 · FAIL: 2 · SKIP: 3 |

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
    "node": "20.20.2",
    "npm": "10.8.2"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

## Markdown

### `markdownlint-cli2  Markdown files`

**Status:** ❌ FAIL (exit 1)

```
markdownlint-cli2 v0.24.0 (markdownlint v0.42.0)
Finding: ./README.md ./CLAUDE.md
Linting: 2 files
Attempted: 16 fixes in 2 files
Summary: 29 issues in 2 files
CLAUDE.md:3:81 error MD013/line-length Line length [Expected: 80; Actual: 102]
CLAUDE.md:7:81 error MD013/line-length Line length [Expected: 80; Actual: 87]
CLAUDE.md:8:81 error MD013/line-length Line length [Expected: 80; Actual: 93]
CLAUDE.md:12:81 error MD013/line-length Line length [Expected: 80; Actual: 94]
CLAUDE.md:16:81 error MD013/line-length Line length [Expected: 80; Actual: 86]
CLAUDE.md:31:81 error MD013/line-length Line length [Expected: 80; Actual: 110]
CLAUDE.md:34:81 error MD013/line-length Line length [Expected: 80; Actual: 93]
CLAUDE.md:43:81 error MD013/line-length Line length [Expected: 80; Actual: 87]
CLAUDE.md:51:81 error MD013/line-length Line length [Expected: 80; Actual: 93]
CLAUDE.md:53:81 error MD013/line-length Line length [Expected: 80; Actual: 93]
CLAUDE.md:54:81 error MD013/line-length Line length [Expected: 80; Actual: 89]
CLAUDE.md:55:81 error MD013/line-length Line length [Expected: 80; Actual: 94]
CLAUDE.md:56:81 error MD013/line-length Line length [Expected: 80; Actual: 85]
CLAUDE.md:59:81 error MD013/line-length Line length [Expected: 80; Actual: 94]
CLAUDE.md:60:81 error MD013/line-length Line length [Expected: 80; Actual: 95]
CLAUDE.md:62:81 error MD013/line-length Line length [Expected: 80; Actual: 89]
CLAUDE.md:72:81 error MD013/line-length Line length [Expected: 80; Actual: 89]
CLAUDE.md:73:81 error MD013/line-length Line length [Expected: 80; Actual: 92]
CLAUDE.md:75:81 error MD013/line-length Line length [Expected: 80; Actual: 95]
CLAUDE.md:77:81 error MD013/line-length Line length [Expected: 80; Actual: 94]
CLAUDE.md:85:81 error MD013/line-length Line length [Expected: 80; Actual: 92]
README.md:3:81 error MD013/line-length Line length [Expected: 80; Actual: 93]
README.md:4:81 error MD013/line-length Line length [Expected: 80; Actual: 94]
README.md:11:81 error MD013/line-length Line length [Expected: 80; Actual: 96]
README.md:14:81 error MD013/line-length Line length [Expected: 80; Actual: 92]
README.md:20:81 error MD013/line-length Line length [Expected: 80; Actual: 89]
README.md:43:81 error MD013/line-length Line length [Expected: 80; Actual: 119]
README.md:48:81 error MD013/line-length Line length [Expected: 80; Actual: 89]
README.md:49:81 error MD013/line-length Line length [Expected: 80; Actual: 95]
```

---

## JavaScript

### `eslint  (no eslint.config.js found — create one to enable)`

**Status:** ⏭ SKIP

---

## YAML

### `yamllint  (no *.yaml / *.yml files found)`

**Status:** ⏭ SKIP

---

## Static Analysis

### `semgrep  server.js + public/app.js`

**Status:** ❌ FAIL (exit 1)

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
 • Findings: 1 (1 blocking)
 • Rules run: 200
 • Targets scanned: 2
 • Parsed lines: ~100.0%
 • No ignore information available
Ran 200 rules on 2 files: 1 finding.
                  
                  
┌────────────────┐
│ 1 Code Finding │
└────────────────┘
             
    server.js
     ❱ javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
          ❰❰ Blocking ❱❱
          A CSRF middleware was not detected in your express application. Ensure you are either using one such
          as `csurf` or `csrf` (see rule references) and/or you are properly doing CSRF validation in your    
          routes with a token or cookies.                                                                     
          Details: https://sg.run/BxzR                                                                        
                                                                                                              
            6┆ const app = express();
```

---

## Dependency CVEs

### `trivy  HIGH/CRITICAL CVEs`

**Status:** ✅ PASS

```
2026-11-12T14:39:28Z	INFO	[vulndb] Need to update DB
2026-11-12T14:39:28Z	INFO	[vulndb] Downloading vulnerability DB...
2026-11-12T14:39:28Z	INFO	[vulndb] Downloading artifact...	repo="mirror.gcr.io/aquasec/trivy-db:2"
29.71 MiB / 133.50 MiB [------------->______________________________________________] 22.26% ? p/s ?71.25 MiB / 133.50 MiB [-------------------------------->___________________________] 53.37% ? p/s ?110.52 MiB / 133.50 MiB [------------------------------------------------>__________] 82.78% ? p/s ?133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 172.97 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 172.97 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 172.97 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 161.81 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 161.81 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 161.81 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 151.37 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 151.37 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 151.37 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 141.61 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 141.61 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 141.61 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 132.47 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 132.47 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 132.47 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 123.93 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 123.93 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 123.93 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 115.93 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 115.93 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 115.93 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 108.45 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [------------------------------------------->] 100.00% 108.45 MiB p/s ETA 0s133.50 MiB / 133.50 MiB [-----------------------------------------------] 100.00% 25.70 MiB p/s 5.4s2026-11-12T14:39:34Z	INFO	[vulndb] Artifact successfully downloaded	repo="mirror.gcr.io/aquasec/trivy-db:2"
2026-11-12T14:39:34Z	INFO	[vuln] Vulnerability scanning is enabled
2026-11-12T14:39:34Z	INFO	[npm] Run "npm install" to collect the license information of packages	dir="node_modules"
2026-11-12T14:39:34Z	INFO	Number of language-specific files	num=1
2026-11-12T14:39:34Z	INFO	[npm] Detecting vulnerabilities...

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

[90m2:39PM[0m [32mINF[0m [1m2 commits scanned.[0m
[90m2:39PM[0m [32mINF[0m [1mscanned ~89127 bytes (89.13 KB) in 255ms[0m
[90m2:39PM[0m [32mINF[0m [1mno leaks found[0m
```

---

### `detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline)`

**Status:** ⏭ SKIP

---

