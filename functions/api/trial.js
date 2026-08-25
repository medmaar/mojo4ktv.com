// Proxy to CF Worker — makes the call server-side so no browser CORS
export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    const resp = await fetch('https://iptv-trial-mojo4ktv.medmaar.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });
    const text = await resp.text();
    return new Response(text, {
      status: resp.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
