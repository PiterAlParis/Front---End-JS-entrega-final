document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const feedback = document.getElementById('formFeedback');

  if (!form.checkValidity()) {
    feedback.textContent = 'Por favor completá los campos obligatorios correctamente.';
    feedback.style.color = 'crimson';
    // opcional: mostrar mensajes por campo
    return;
  }

  // Aquí enviás el formulario; ejemplo: fetch a tu endpoint o usar Formspree / Netlify Forms
  feedback.textContent = 'Enviando...';

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  // Ejemplo simulado (reemplazá con fetch real)
  setTimeout(() => {
    feedback.textContent = 'Gracias — recibimos tu mensaje.';
    feedback.style.color = 'green';
    form.reset();
  }, 900);
});