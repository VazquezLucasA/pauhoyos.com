const attendanceLabels = {
  si: 'Sí, voy',
  quizas: 'Todavía no sé',
  no: 'No puedo ir',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function safeSheetValue(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

async function validateTurnstile(token, request, secret) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const result = await response.json();
  const hostname = new URL(request.url).hostname;
  return Boolean(result.success && result.hostname === hostname && result.action === 'rsvp');
}

async function submitRsvp(request, env) {
  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Método no permitido.' }, 405);
  }

  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ ok: false, message: 'Origen no permitido.' }, 403);
  }

  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > 10240) {
    return json({ ok: false, message: 'Solicitud demasiado grande.' }, 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Datos inválidos.' }, 400);
  }

  const nombre = typeof body.nombre === 'string' ? body.nombre.trim() : '';
  const mensaje = typeof body.mensaje === 'string' ? body.mensaje.trim() : '';
  const asistencia = typeof body.asistencia === 'string' ? body.asistencia : '';
  const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';

  if (
    body.website
    || nombre.length < 2
    || nombre.length > 100
    || mensaje.length > 500
    || !attendanceLabels[asistencia]
    || !token
  ) {
    return json({ ok: false, message: 'Revisá los datos ingresados.' }, 400);
  }

  const turnstileOk = await validateTurnstile(token, request, env.TURNSTILE_SECRET);
  if (!turnstileOk) {
    return json({ ok: false, message: 'No pudimos validar la verificación. Intentá nuevamente.' }, 403);
  }

  const upstream = await fetch(env.RSVP_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env.RSVP_SHARED_SECRET,
      fecha: new Date().toISOString(),
      nombre: safeSheetValue(nombre),
      asistencia: attendanceLabels[asistencia],
      mensaje: safeSheetValue(mensaje),
    }),
  });

  let result;
  try {
    result = await upstream.json();
  } catch {
    result = null;
  }

  if (!upstream.ok || !result?.ok) {
    return json({ ok: false, message: 'No pudimos guardar tu confirmación. Probá nuevamente.' }, 502);
  }

  return json({ ok: true }, 201);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/rsvp') {
      return submitRsvp(request, env);
    }

    if (decodeURIComponent(url.pathname).startsWith('/mis-15+10')) {
      const asset = await env.ASSETS.fetch(request);
      const headers = new Headers(asset.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers });
    }

    return new Response('Not found', { status: 404 });
  },
};
