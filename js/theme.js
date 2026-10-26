/**
 * Ayoush Chhetri — Theme & UI Interactions
 * Handles Light/Dark mode, mobile menu, and instant search
 */

(function () {
  // 1. Initial theme load before DOMContentLoaded to prevent flash of wrong theme
  const savedTheme = localStorage.getItem('ayoush_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Listen for OS theme change if user hasn't explicitly chosen
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('ayoush_theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  // 2. Setup interactive elements on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('ayoush_theme', isDark ? 'dark' : 'light');
      });
    });

    // Mobile Navigation Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });

      // Close menu on link click
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
        });
      });
    }

    // Instant Post Search / Filter (if present on page)
    const searchInput = document.getElementById('post-search');
    const postCards = document.querySelectorAll('.post-card');
    const noResultsMsg = document.getElementById('no-search-results');

    if (searchInput && postCards.length > 0) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let matchCount = 0;

        postCards.forEach((card) => {
          const title = card.querySelector('.post-card-title')?.textContent.toLowerCase() || '';
          const excerpt = card.querySelector('.post-card-excerpt')?.textContent.toLowerCase() || '';
          const tags = card.querySelector('.post-card-tag')?.textContent.toLowerCase() || '';

          const matches = title.includes(query) || excerpt.includes(query) || tags.includes(query);
          if (matches) {
            card.style.display = 'block';
            matchCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (noResultsMsg) {
          noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
        }
      });
    }
  });
})();
