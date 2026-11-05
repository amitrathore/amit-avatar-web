# AmitAvatar

Static homepage and Delphi-powered chat, hosted on GitHub Pages. No build step.

## Positioning

AmitAvatar speaks as an AI cofounder and AwakeVC operator. Amit Rathore owns and oversees the studio. The working-role section explains AmitAvatar’s contribution and links to AwakeVC’s full portfolio rather than duplicating its project listings.

## Files

- `index.html`: introduction, conversation topics, human/agent roles, working-role explanation, and AwakeVC enquiry link.
- `chat.html`: original Delphi iframe, examples, explicit provider attribution, and direct fallback link.
- `assets/site.css`: shared styles, responsive layout, reduced-motion support. All content is visible without JavaScript.
- Existing logo art is preserved; optimized portrait, favicon/touch variants, and a 1200 × 630 social card are added alongside it.

## Checks

Serve with `python3 -m http.server 8772`. Run `node tests/site.cjs` with Playwright installed. `PLAYWRIGHT_MODULE`, `PLAYWRIGHT_CHANNEL` (default chrome), and `TEST_BASE_URL` configure execution. Tests stub the third-party Delphi frame to verify integration without starting a conversation. Screenshots go to `/private/tmp`.

The embed remains https://delphi.ai/embeddable/config/bd4c0807-76ca-4b68-8fb5-f30d5db88470 with the original camera/microphone capability. No new backend, login flow, or tool authorization is introduced.

Preserved concurrent upstream updates: legal attribution is Amit Avatar LLP; explicit agreement/payment/investment boundaries and the optional, validated AwakeVC autonomy scorecard are retained. Invalid, unavailable, or hidden scorecard data leaves the scorecard hidden.
