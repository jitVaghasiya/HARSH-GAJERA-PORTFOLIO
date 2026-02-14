let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

const darkModeButton = document.getElementById('darkModeButton');

const enableDarkMode = () => {
    darkModeEnabled = true;
    localStorage.setItem('darkModeEnabled', 'true');
    document.body.classList.add('dark-mode');
};

const disableDarkMode = () => {
    darkModeEnabled = false;
    localStorage.setItem('darkModeEnabled', 'false');
    document.body.classList.remove('dark-mode');
};

document.addEventListener('DOMContentLoaded', () => {
    if (darkModeButton) {
        darkModeButton.checked = darkModeEnabled;
    }
    document.body.classList.toggle('dark-mode', darkModeEnabled);
});

if (darkModeButton) {
    darkModeButton.addEventListener('change', () => {
        if (darkModeButton.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
}

// Menu

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
}

// multiple text (Typed.js)

if (typeof Typed !== 'undefined') {
    const multipleText = new Typed('.multiple', {
        strings: ['3D Animator', '3D Product Animator', '3D Model Designer',],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
    });
}

// Header shadow on scroll effect

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Scroll section active link

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav ul li a');

window.onscroll = () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(
                'header nav ul li a[href="#' + id + '"]'
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        if (navList) {
            navList.classList.remove('active');
        }
    });
});

// Read More functionality for About section
const readMoreBtn = document.getElementById('readMoreBtn');
const aboutTextMore = document.querySelector('.about-text-more');

if (readMoreBtn && aboutTextMore) {
    readMoreBtn.addEventListener('click', () => {
        if (aboutTextMore.style.display === 'none') {
            aboutTextMore.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
        } else {
            aboutTextMore.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        }
    });
}

// Make About 'Read More' accessible and initialize hidden state
if (readMoreBtn && aboutTextMore) {
    aboutTextMore.style.display = aboutTextMore.style.display || 'none';
    readMoreBtn.setAttribute('aria-expanded', 'false');
    readMoreBtn.addEventListener('click', () => {
        const expanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
            aboutTextMore.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.setAttribute('aria-expanded', 'false');
        } else {
            aboutTextMore.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
            readMoreBtn.setAttribute('aria-expanded', 'true');
        }
    });
    readMoreBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            readMoreBtn.click();
        }
    });
}

// Services: make each "Read More" button toggle its paragraph (collapse/expand) with accessibility
const serviceBoxes = document.querySelectorAll('.services .box');
serviceBoxes.forEach(box => {
    const btn = box.querySelector('.services-btn button');
    const p = box.querySelector('p');
    if (!btn || !p) return;

    // initialize collapsed state
    p.style.maxHeight = p.style.maxHeight || '140px';
    p.style.overflow = 'hidden';
    p.style.transition = 'max-height 0.3s ease';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = btn.textContent || 'Read More';

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
            p.style.maxHeight = '140px';
            btn.textContent = 'Read More';
            btn.setAttribute('aria-expanded', 'false');
        } else {
            p.style.maxHeight = p.scrollHeight + 'px';
            btn.textContent = 'Read Less';
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});