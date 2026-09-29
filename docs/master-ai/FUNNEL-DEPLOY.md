# DEPLOY — get this live on rumedominic.com/master-ai

## STEP 0 — fix the domain first (IMPORTANT)
rumedominic.com may be showing a Namecheap parked page = the domain is registered
but not fully pointed at live hosting. Before anything else:
- Log in to Namecheap -> Domain List -> rumedominic.com.
- Confirm it points to your web host (nameservers / A record / CNAME).
- If your book site is on WordPress hosting, point the domain there.
- Until the domain resolves to real hosting, no page will show. This is a
  dashboard fix (Namecheap + host), not a code fix.

## STEP 1 — put the page live
Option A (recommended, WordPress): create a new page at /master-ai and paste the
  index.html body via a Custom HTML block, OR upload the folder to a subfolder.
Option B (standalone): upload the master-ai/ folder to any static host (Netlify,
  Cloudflare Pages, your host's file manager). Point learn.rumedominic.com to it.

## STEP 2 — connect Brevo (so emails are captured)
1. Create a free Brevo account -> create a list "Master AI 9 Days".
2. Create an automation: on signup -> send the course link + book.
3. Get your form/API endpoint. In index.html, replace REPLACE_WITH_YOUR_BREVO_ENDPOINT
   with it. (Never paste secret API keys directly in the HTML — use Brevo's hosted
   form embed or a small server endpoint.)

## STEP 3 — add real testimonials
Replace the [bracketed] quotes with real student quotes. Drop proof screenshots in
assets/ and un-comment the <img class="proof-shot"> lines.

## STEP 4 — go live & promote
Point your 12,000 audience to rumedominic.com/master-ai. Post where your people
already are. Track signups by source.
