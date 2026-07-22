# Configuración de producción

## Google Sheets

1. Crear una hoja y una pestaña llamada `RSVP`.
2. En la primera fila escribir: `Fecha | Nombre | Asistencia | Mensaje`.
3. Abrir **Extensiones → Apps Script** y pegar el contenido de `rsvp-google-apps-script.gs`.
4. En **Configuración del proyecto → Propiedades de la secuencia de comandos**, crear `RSVP_SHARED_SECRET` con una clave aleatoria larga.
5. En **Implementar → Nueva implementación**, seleccionar **Aplicación web**, ejecutar como propietaria y permitir acceso a **Cualquier usuario**.
6. Copiar la URL de producción que termina en `/exec`.

## Cloudflare

1. Usar el widget de Turnstile existente para `pauhoyos.com`.
2. Usar el Worker conectado al repositorio, `pauhoyos-com`.
3. En **Settings → Variables and secrets** cargar estos tres valores con el tipo **Secret** (no *Variable*):
   - `RSVP_APPS_SCRIPT_URL`: URL `/exec` de Apps Script.
   - `RSVP_SHARED_SECRET`: la misma clave de Apps Script.
   - `TURNSTILE_SECRET`: secret key de Turnstile.
4. En **Settings → Build → Environment variables** cargar:
   - `VITE_TURNSTILE_SITE_KEY`: site key pública de Turnstile.
   - `NODE_VERSION`: `22`.
   La primera puede ser una *Variable*: es pública y se incorpora en el build del sitio.
5. Si alguna clave fue compartida por error, reemplazarla por una nueva cadena aleatoria larga tanto en las Propiedades del script de Google como en el Secret homónimo del Worker.
6. La URL del Web App es el único dato de Apps Script que usa el Worker; el Script ID no se configura en el sitio.
7. En **Settings → Builds**, conectar el repositorio, elegir `main`, root `/`, build `npm run build` y deploy `npx wrangler deploy`.
8. Asociar `pauhoyos.com` como Custom Domain. Crear una regla 301 de `www.pauhoyos.com/*` a `https://pauhoyos.com/*`.
