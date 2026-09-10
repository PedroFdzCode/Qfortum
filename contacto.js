/* Envío real del formulario de contacto.
 *
 * Servicio: FormSubmit (https://formsubmit.co) — no requiere backend ni registro.
 * IMPORTANTE: el primer envío desde el dominio publicado genera un correo de
 * activación a DESTINATARIO. Hay que pulsar el enlace de ese correo una sola vez;
 * a partir de ahí todos los mensajes llegan directamente a la bandeja.
 *
 * Para cambiar de servicio, basta con sustituir ENDPOINT por el de Formspree
 * (https://formspree.io/f/XXXXXXX), EmailJS o tu propia API: el resto del código
 * no necesita cambios siempre que el endpoint acepte POST con JSON.
 */
(function () {
  // var DESTINATARIO = 'pedrofdezs01@gmail.com';
  var DESTINATARIO = 'p.fernandez@qfortum.es';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + DESTINATARIO;

  var form = document.getElementById('qf-contacto-form');
  var status = document.getElementById('qf-form-status');
  if (!form || !status) return;
  var button = form.querySelector('button[type="submit"]');

  function show(kind, message) {
    status.style.display = 'block';
    status.textContent = message;
    if (kind === 'ok') {
      status.style.background = '#e6f5f3';
      status.style.color = '#0f766e';
      status.style.border = '1px solid #b7e2dc';
    } else {
      status.style.background = '#fdecea';
      status.style.color = '#a8342a';
      status.style.border = '1px solid #f4c7c2';
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (form.elements._honey && form.elements._honey.value) return;

    var required = ['nombre', 'empresa', 'email'];
    for (var i = 0; i < required.length; i++) {
      if (!form.elements[required[i]].value.trim()) {
        show('error', 'Completa los campos obligatorios: nombre, empresa y email.');
        form.elements[required[i]].focus();
        return;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.elements.email.value.trim())) {
      show('error', 'Revisa la dirección de email.');
      form.elements.email.focus();
      return;
    }
    if (!form.elements.privacidad.checked) {
      show('error', 'Debes aceptar la política de privacidad para continuar.');
      return;
    }

    var payload = {
      _subject: 'Nueva consulta desde qfortum.es',
      _template: 'table',
      _captcha: 'false',
      Nombre: form.elements.nombre.value.trim(),
      Empresa: form.elements.empresa.value.trim(),
      Email: form.elements.email.value.trim(),
      'Teléfono': form.elements.telefono.value.trim() || '—',
      Servicio: form.elements.servicio.value || '—',
      Mensaje: form.elements.mensaje.value.trim() || '—'
    };

    button.disabled = true;
    button.style.opacity = '0.65';
    button.style.cursor = 'progress';
    var originalLabel = button.textContent;
    button.textContent = 'Enviando…';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function () {
        form.reset();
        show('ok', 'Mensaje enviado. Gracias por contactar con Qualitas Fortum; te responderemos lo antes posible.');
      })
      .catch(function () {
        show('error', 'No hemos podido enviar el mensaje. Escríbenos a ' + DESTINATARIO);
      })
      .then(function () {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        button.textContent = originalLabel;
      });
  });
})();
