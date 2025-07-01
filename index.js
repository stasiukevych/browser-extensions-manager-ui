document.addEventListener("DOMContentLoaded", () => { console.log("Page (DOM) is initialized..."); });

const body = document.body;
const logoImage = document.querySelector('.logo img');
const themeSwitcher = document.querySelector('.theme-switcher');
const themeImage = document.querySelector('.theme-switcher__icon');
const statusFilterToggles = document.querySelectorAll('.status-toggle');
const removeButtons = document.querySelectorAll('button[data-type="remove"]');
const statusFilterButtons = document.querySelectorAll('.status-filter__buttons button');

themeSwitcher.addEventListener('click', e => {
     e.preventDefault();
     const themeImageSuffix = themeImage.src.split('/').pop();
     console.log('Current theme suffix: ' + `${themeImageSuffix}`);

     if (themeImageSuffix === 'icon-moon.svg') {
          themeImage.src = 'assets/images/icon-sun.svg';
          logoImage.src = 'assets/images/logo-light.svg';
          body.setAttribute('theme', '🌑');
          console.log('Changed theme to dark');
     } else {
          themeImage.src = 'assets/images/icon-moon.svg';
          logoImage.src = 'assets/images/logo-dark.svg';
          body.setAttribute('theme', '☀️');
          console.log('Changed theme to light');
     }
});

removeButtons.forEach(button => {
     button.addEventListener('click', () => {
          const parentExtension = button.closest('.extension');
          parentExtension.remove();
     });
});

statusFilterButtons.forEach(button => {
     button.addEventListener('click', () => {
          // remove state="active" from all buttons
          statusFilterButtons.forEach(b => b.removeAttribute('state'));

          // add state="active" to the clicked one
          button.setAttribute('state', 'active');

          const filterType = button.getAttribute('filter-type');

          if ("active" === filterType) {
               statusFilterToggles.forEach(toggle => {
                    const isActive = toggle.getAttribute('aria-pressed') === 'true';
                    const rootParent = toggle.closest('.extension');

                    rootParent.classList.toggle('visually-hidden', !isActive);
               });
          }

          if ("inactive" === filterType) {
               statusFilterToggles.forEach(toggle => {
                    const isInactive = toggle.getAttribute('aria-pressed') === 'false';
                    const rootParent = toggle.closest('.extension');

                    rootParent.classList.toggle('visually-hidden', !isInactive);
               });
          }

          if ("all" === filterType) {
               statusFilterToggles.forEach(toggle => {
                    const rootParent = toggle.closest('.extension');
                    rootParent.classList.toggle('visually-hidden', false);
               });
          }
     });
});

statusFilterToggles.forEach(button => {
     button.addEventListener('click', () => {
          const isPressed = button.getAttribute('aria-pressed') === 'true';
          button.setAttribute('aria-pressed', String(!isPressed))

          const activeFilter = document.querySelector('button[state="active"]');
          const filterType = activeFilter.getAttribute('filter-type');

          if (!isPressed) {
               if ("active" !== filterType) {
                    button.closest('.extension').classList.toggle('visually-hidden', true);
               }
          }

          if (isPressed) {
               if ("inactive" !== filterType) {
                    button.closest('.extension').classList.toggle('visually-hidden', true);
               }
          }
     });
});