document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 400);
    });
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        if (scrollTop > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTop > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const countdownDate = new Date('2026-10-15T09:00:00');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;

        if (distance < 0) return;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = d.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = m.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = s.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    const statElements = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                statElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000;
                    const steps = 60;
                    const stepTime = Math.floor(duration / steps);
                    let current = 0;
                    const increment = target / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.innerText = target.toLocaleString() + '+';
                            clearInterval(timer);
                        } else {
                            el.innerText = Math.floor(current).toLocaleString() + '+';
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.4 });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
