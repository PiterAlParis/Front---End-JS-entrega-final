const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const feedback = document.getElementById('formFeedback');

        if (!form.checkValidity()) {
            feedback.textContent = 'Por favor completá todos los campos.';
            feedback.style.color = 'crimson';
            return;
        }

        feedback.textContent = 'Enviando...';

        setTimeout(() => {
            feedback.textContent = 'Gracias — recibimos tu mensaje.';
            feedback.style.color = 'green';
            form.reset();
        }, 900);
    });
}