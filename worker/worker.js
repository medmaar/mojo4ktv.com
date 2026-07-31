// Mojo 4K IPTV – Free Trial Worker
// TODO: Adapt from your existing trial worker (mojo4k.fr/mojo4k.de pattern)
// This worker handles free trial requests and KV storage.

export default {
  async fetch(request, env) {
    return new Response('Mojo 4K Trial System - Configure worker.js', { status: 200 });
  }
};
