(function () {
  emailjs.init("--UxGFnyckluLkMSG"); // Tu public key

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_xiqpklo", "template_2td1hxn", this)
      .then(() => {
        status.innerHTML = "¡Mensaje enviado con éxito!";
        form.reset();
        status.style.color = "green";
      })
      .catch((error) => {
        status.innerHTML = "Error al enviar. Intenta nuevamente.";
        status.style.color = "red";
        console.error("EmailJS error:", error);
      });
  });
})();
