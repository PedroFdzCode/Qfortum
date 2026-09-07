# Qualitas Fortum — sitio web estático

HTML puro, sin dependencias ni proceso de build. Se puede publicar tal cual en
GitHub Pages, Netlify, Vercel o cualquier hosting clásico.

## Estructura

| Archivo | Página |
|---|---|
| index.html | Home (servicios, clientes, contacto) |
| sistema-calidad.html | Sistema de gestión de calidad |
| sistema-medioambiente.html | Sistema de gestión ambiental |
| sistema-riesgos-laborales.html | Seguridad y salud en el trabajo |
| sistema-proteccion-datos.html | Protección de datos |
| sistema-alimentario.html | Seguridad alimentaria |
| legal.html | Aviso legal + política de privacidad |
| contacto.js | Envío real del formulario de contacto |
| assets/ | Logo corporativo y logos de clientes |

## Formulario de contacto

Usa [FormSubmit](https://formsubmit.co) vía AJAX, sin backend propio. El destinatario
está definido en `contacto.js`:

```js
var DESTINATARIO = 'info@qfortum.es';
```

**Activación (una sola vez):** tras publicar el sitio, envía el formulario una vez.
FormSubmit mandará un correo de confirmación a esa dirección; al pulsar su enlace
queda activado y los mensajes posteriores llegan directamente.

Para cambiar de proveedor (Formspree, EmailJS, API propia) basta sustituir la
constante `ENDPOINT` del mismo archivo; el resto del código no cambia.

## Pendiente

- Imagen real del hero (ahora hay un marcador en `index.html`).
- Revisión legal de los textos de `legal.html`.
- Analítica y verificación de dominio.
