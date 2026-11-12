# Checks Report — bf_optim_fph — 2026-11-12 15:43:37

## Summary

| Check | Status |
|---|---|
| shellcheck  install.sh | ❌ FAIL |
| shellcheck  update_deps.sh | ❌ FAIL |
| jsonlint  package.json | ❌ FAIL |
| markdownlint-cli2  Markdown files | ❌ FAIL |
| eslint  (no eslint.config.js found — create one to enable) | ⏭ SKIP |
| yamllint  YAML files | ❌ FAIL |
| semgrep  server.js + public/app.js | ❌ FAIL |
| trivy  HIGH/CRITICAL CVEs | ❌ FAIL |
| gitleaks  secrets in repo | ❌ FAIL |
| detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline) | ⏭ SKIP |
| **Total** | PASS: 0 · FAIL: 8 · SKIP: 2 |

---

## Shell

### `shellcheck  install.sh`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

### `shellcheck  update_deps.sh`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

## JSON

### `jsonlint  package.json`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

## Markdown

### `markdownlint-cli2  Markdown files`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

## JavaScript

### `eslint  (no eslint.config.js found — create one to enable)`

**Status:** ⏭ SKIP

---

## YAML

### `yamllint  YAML files`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

## Static Analysis

### `semgrep  server.js + public/app.js`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

## Dependency CVEs

### `trivy  HIGH/CRITICAL CVEs`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

## Secrets

### `gitleaks  secrets in repo`

**Status:** ❌ FAIL (exit 127)

```
checks.sh: line 42: docker: command not found
```

---

### `detect-secrets  (run: detect-secrets scan > .secrets.baseline  to create baseline)`

**Status:** ⏭ SKIP

---

