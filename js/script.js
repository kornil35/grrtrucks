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
    const overlay = document.getElementById('overlay-bg');
    nav.classList.toggle('show');
    overlay.classList.toggle('show');
  }
  
  // Закрытие по клику на пункт меню (на мобилке)
  document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });
  