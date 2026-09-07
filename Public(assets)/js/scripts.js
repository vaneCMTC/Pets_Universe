/* ================================================
                    PETS UNIVERSE 
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // VALIDACIÓN: Confirmar contraseñas (registro)
    const formRegistro = document.querySelector('form[action="registro_proceso.php"]');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function (e) {
            const clave = formRegistro.querySelector('[name="clave"]').value;
            const claveConfirmar = formRegistro.querySelector('[name="clave_confirmar"]').value;

            if (clave !== claveConfirmar) {
                e.preventDefault();
                alert('⚠️ Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.');
                formRegistro.querySelector('[name="clave_confirmar"]').focus();
            }
        });
    }

    // 2. VALIDACIÓN: Teléfono exactamente 10 dígitos
    const telefonoInput = document.querySelector('[name="numero_telefono"]');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function () {
            // Solo permite números
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        telefonoInput.addEventListener('blur', function () {
            if (this.value.length > 0 && this.value.length !== 10) {
                this.classList.add('is-invalid');
                mostrarError(this, 'El número de teléfono debe tener exactamente 10 dígitos.');
            } else {
                this.classList.remove('is-invalid');
                ocultarError(this);
            }
        });
    }

    // 3. MOSTRAR / OCULTAR CONTRASEÑA
   document.querySelectorAll('[data-toggle-password]').forEach(function (icon) {
    icon.addEventListener('click', function () {
        const targetId = this.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId);
        if (!input) return;

        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('bi-eye-slash');
            this.classList.add('bi-eye');
        } else {
            input.type = 'password';
            this.classList.remove('bi-eye');
            this.classList.add('bi-eye-slash');
        }
    });
});

    // Funciones auxiliares
    function mostrarError(input, mensaje) {
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.classList.add('invalid-feedback');
            input.parentNode.insertBefore(feedback, input.nextSibling);
        }
        feedback.textContent = mensaje;
    }

    function ocultarError(input) {
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = '';
        }
    }

});

document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 4;

    const btnNext = document.getElementById("btnNextStep");
    const btnPrev = document.getElementById("btnPrevStep");
    const btnToggleNewPet = document.getElementById("btnToggleNewPet");
    const newPetForm = document.getElementById("newPetInlineForm");

    // Lógica para mostrar/ocultar el formulario rápido de nueva mascota
    if (btnToggleNewPet) {
        btnToggleNewPet.addEventListener("click", function () {
            newPetForm.classList.toggle("d-none");
        });
    }

    // Selección interactiva de tarjetas de mascotas
    document.querySelectorAll(".pet-selectable-card").forEach(card => {
        card.addEventListener("click", function () {
            document.querySelectorAll(".pet-selectable-card").forEach(c => {
                c.classList.remove("selected", "border-primary");
                c.querySelector(".check-icon").classList.add("d-none");
            });
            this.classList.add("selected", "border-primary");
            this.querySelector(".check-icon").classList.remove("d-none");
        });
    });

    // Selección interactiva de tarjetas de servicios
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", function () {
            document.querySelectorAll(".service-card").forEach(c => c.classList.remove("selected", "border-primary"));
            this.classList.add("selected", "border-primary");
        });
    });

    // Control de avance y retroceso del Wizard
    function updateWizard() {
        document.querySelectorAll(".wizard-step-pane").forEach(pane => {
            pane.classList.add("d-none");
            pane.classList.remove("active");
        });

        const activePane = document.querySelector(`.wizard-step-pane[data-step="${currentStep}"]`);
        if (activePane) {
            activePane.classList.remove("d-none");
            activePane.classList.add("active");
        }

        document.querySelectorAll("[data-step-indicator]").forEach(indicator => {
            const stepNum = parseInt(indicator.getAttribute("data-step-indicator"));
            if (stepNum === currentStep) {
                indicator.classList.add("active", "fw-bold");
            } else {
                indicator.classList.remove("active");
            }
        });

        if (currentStep === 1) {
            btnPrev.style.display = "none";
        } else {
            btnPrev.style.display = "inline-block";
        }

        if (currentStep === totalSteps) {
            btnNext.innerHTML = 'Confirmar Cita <i class="bi bi-check-circle ms-1"></i>';
            updateSummaryData();
        } else {
            btnNext.innerHTML = 'Siguiente <i class="bi bi-arrow-right ms-1"></i>';
        }
    }

    // Agendar cita
    function updateSummaryData() {
        const selectedPetCard = document.querySelector(".pet-selectable-card.selected");
        const petName = selectedPetCard ? selectedPetCard.querySelector("h6").innerText : "Nueva Mascota";
        
        const selectedServiceCard = document.querySelector(".service-card.selected");
        const serviceName = selectedServiceCard ? selectedServiceCard.getAttribute("data-service") : "Consulta General";
        const servicePrice = selectedServiceCard ? selectedServiceCard.getAttribute("data-price") : "45000";

        const doctor = document.getElementById("selectDoctor").value || "No seleccionado";
        const fecha = document.getElementById("inputFechaCita").value || "Por definir";
        const hora = document.getElementById("inputHoraCita").value || "Por definir";

        document.getElementById("sumPet").innerText = petName;
        document.getElementById("sumService").innerText = serviceName;
        document.getElementById("sumDoctor").innerText = doctor;
        document.getElementById("sumDateTime").innerText = `${fecha} a las ${hora}`;
        document.getElementById("sumPrice").innerText = `$${Number(servicePrice).toLocaleString()} COP`;
    }

    if (btnNext) {
        btnNext.addEventListener("click", function () {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            } else {
                alert("¡Cita agendada con éxito en el sistema!");
                const modalEl = document.getElementById("modalAgendamientoGalactico");
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
                currentStep = 1;
                updateWizard();
            }
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", function () {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });
    }
});
