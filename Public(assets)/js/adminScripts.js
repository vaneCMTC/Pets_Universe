/* ================================================
        PETS UNIVERSE - PANEL DE ADMINISTRADOR
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('adminSidebar');
    const toggleBtn = document.getElementById('adminSidebarToggle');
    const overlay = document.getElementById('adminOverlay');

    function cerrarSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    }

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        });
        overlay.addEventListener('click', cerrarSidebar);
    }

    // Confirmación para acciones críticas de administrador (activar/desactivar, cancelar, eliminar)
    document.querySelectorAll('[data-confirm-admin]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            const mensaje = this.getAttribute('data-confirm-admin') || '¿Confirmas esta acción?';
            if (!confirm(mensaje)) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
});