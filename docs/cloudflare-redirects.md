# Old-domain redirects (Cloudflare Single Redirects)

The old domains all use Cloudflare DNS, so they redirect with Single Redirect
rules (Rules, Redirect Rules, Create rule, "Custom filter expression"). Each
domain's DNS record must be proxied (orange cloud) for the rule to run. Use
status 301 and turn "Preserve query string" on.

Put the `/` rule above the catch-all in the same zone.

## positivesumexperiments.com (and www)

Rule 1, home goes to the blog index:

- Expression:
  `(http.host in {"positivesumexperiments.com" "www.positivesumexperiments.com"} and http.request.uri.path eq "/")`
- Type: Static, URL `https://housefulloflove.com/blog`, status 301.

Rule 2, everything else keeps its path:

- Expression:
  `(http.host in {"positivesumexperiments.com" "www.positivesumexperiments.com"})`
- Type: Dynamic, expression
  `concat("https://housefulloflove.com", http.request.uri.path)`, status 301.

## positivesumcompany.com, thepositivesumcompany.com (and www)

One rule per zone:

- Expression:
  `(http.host in {"positivesumcompany.com" "www.positivesumcompany.com" "thepositivesumcompany.com" "www.thepositivesumcompany.com"})`
- Type: Dynamic, expression
  `concat("https://housefulloflove.com", http.request.uri.path)`, status 301.

(A bare `/` becomes `https://housefulloflove.com/`.)

## www.housefulloflove.com

No rule. The app's own `next.config.ts` redirect sends www to the apex (308)
once www points at the Worker: add `www.housefulloflove.com` as a custom
domain on the Worker, which creates a proxied DNS record.

## Check

After the rules are on, from this repo:

```bash
OLD_BASE=https://positivesumexperiments.com SITE=experiments node --test tests/old-redirects.test.mjs
OLD_BASE=https://positivesumcompany.com SITE=company node --test tests/old-redirects.test.mjs
```

The test accepts 301 or 308 and checks the exact `location`.
