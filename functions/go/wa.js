// Cloudflare Pages Function – Route: /go/wa
// Phone number stays server-side — never in HTML source.
// Prevents duplicate number exposure across sites; safe from Google crawl.

const WHATSAPP_NUMBER = '17828026280'; // +1 (782) 802-6280  — digits only
const BRAND_GREETING  = 'Hi Mojo 4K!';

function buildMessage(raw) {
  if (!raw) return BRAND_GREETING;
  const rest = raw.replace(/^Hi[^!.,]{0,40}[!,.]?\s*/i, '').trim();
  return rest
    ? `${BRAND_GREETING} ${rest.charAt(0).toUpperCase() + rest.slice(1)}`
    : BRAND_GREETING;
}

export async function onRequestGet(context) {
  const url      = new URL(context.request.url);
  const msg      = url.searchParams.get('msg');
  const finalMsg = buildMessage(msg);
  const target   = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`;
  return Response.redirect(target, 302);
}
