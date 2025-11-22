// Открытие полноэкранного скрина
function openFullImage() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'flex';
}

// Закрытие скрина
function closeFullImage() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
}

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const burger = document.getElementById('burger');
    if (!nav || !burger) return;

    const isOpen = nav.classList.toggle('active');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // Lock body scroll while menu is open
    document.body.classList.toggle('no-scroll', isOpen);

    // Manage global handlers for ESC and outside click
    if (isOpen) {
        // store handlers so we can remove them later
        window._menuHandlers = window._menuHandlers || {};
        window._menuHandlers.esc = function (e) {
            if (e.key === 'Escape') toggleMenu();
        };
        window._menuHandlers.outside = function (e) {
            const navEl = document.getElementById('mainNav');
            const burgerEl = document.getElementById('burger');
            if (!navEl.contains(e.target) && !burgerEl.contains(e.target)) {
                toggleMenu();
            }
        };
        document.addEventListener('keydown', window._menuHandlers.esc);
        document.addEventListener('click', window._menuHandlers.outside);
    } else {
        if (window._menuHandlers) {
            document.removeEventListener('keydown', window._menuHandlers.esc);
            document.removeEventListener('click', window._menuHandlers.outside);
            window._menuHandlers = null;
        }
    }
}
// Setup menu and FAQ behavior after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // close menu when a nav link is clicked (mobile)
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('mainNav');
            const burger = document.getElementById('burger');
            if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (burger) burger.classList.remove('open');
                if (burger) burger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
                if (window._menuHandlers) {
                    document.removeEventListener('keydown', window._menuHandlers.esc);
                    document.removeEventListener('click', window._menuHandlers.outside);
                    window._menuHandlers = null;
                }
            }
        });
    });

    // Make burger keyboard-accessible and initialize aria state
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');
    if (burger) {
        burger.setAttribute('role', 'button');
        burger.setAttribute('tabindex', '0');
        if (!burger.hasAttribute('aria-expanded')) burger.setAttribute('aria-expanded', 'false');
        // allow keyboard toggle if inline onclick is not used
        burger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // FAQ accordion: fold/unfold behavior
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(btn => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (isOpen) {
                // expand
                answer.hidden = false;
                const height = answer.scrollHeight;
                answer.style.maxHeight = height + 'px';
            } else {
                // collapse
                answer.style.maxHeight = answer.scrollHeight + 'px';
                // trigger reflow for transition
                window.getComputedStyle(answer).maxHeight;
                answer.style.maxHeight = '0px';
                // hide after transition
                setTimeout(() => { answer.hidden = true; }, 350);
            }
        });
        // keyboard support: enter / space
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
});