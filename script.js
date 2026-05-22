
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;

  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });
}
const skillFills = document.querySelectorAll('.level-fill');

if (skillFills.length > 0) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width') || fill.style.width;

        fill.style.width = '0%';

        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 100);

        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => {
    const originalWidth = fill.style.width || '100%';
    fill.setAttribute('data-width', originalWidth);
    fill.style.width = '0%';
    skillObserver.observe(fill);
  });
}
const fadeEls = document.querySelectorAll(
  '.goal-item, .skill-card, .contact-item, .about-card, .about-text'
);

if (fadeEls.length > 0) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    fadeObserver.observe(el);
  });
}
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const oneBeerAudio = document.getElementById('oneBeerAudio');

console.log('script.js loaded');
console.log('musicBtn:', musicBtn);
console.log('oneBeerAudio:', oneBeerAudio);

if (musicBtn && musicIcon && musicText && oneBeerAudio) {
  musicBtn.addEventListener('click', async () => {
    try {
      if (oneBeerAudio.paused) {
        await oneBeerAudio.play();

        musicBtn.classList.add('playing');
        musicIcon.textContent = 'Ⅱ';
        musicText.textContent = 'Pause One Beer - MF DOOM';
      } else {
        oneBeerAudio.pause();

        musicBtn.classList.remove('playing');
        musicIcon.textContent = '▶';
        musicText.textContent = 'Play One Beer - MF DOOM';
      }
    } catch (error) {
      console.error('Audio play error:', error);
      alert('The audio could not play. Check if one-beer.mp3 is in the same folder and is a valid MP3 file.');
    }
  });

  oneBeerAudio.addEventListener('ended', () => {
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '▶';
    musicText.textContent = 'Play One Beer - MF DOOM';
  });
}
const fistBumpBtn = document.getElementById('fistBumpBtn');
const fistBumpCount = document.getElementById('fistBumpCount');
const FIST_BUMP_KEY = 'izreinante_fist_bumps';

if (fistBumpBtn && fistBumpCount) {
  let bumps = Number(localStorage.getItem(FIST_BUMP_KEY)) || 0;
  fistBumpCount.textContent = bumps;

  fistBumpBtn.addEventListener('click', () => {
    bumps += 1;
    localStorage.setItem(FIST_BUMP_KEY, bumps);
    fistBumpCount.textContent = bumps;

    fistBumpBtn.classList.remove('bumped');
    void fistBumpBtn.offsetWidth;
    fistBumpBtn.classList.add('bumped');
  });
}