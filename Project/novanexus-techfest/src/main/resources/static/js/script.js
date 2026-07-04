document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const countdownDate = new Date();
    countdownDate.setMonth(countdownDate.getMonth() + 2);
    
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;

        if (distance < 0) {
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (elements.days) elements.days.innerText = days.toString().padStart(2, '0');
        if (elements.hours) elements.hours.innerText = hours.toString().padStart(2, '0');
        if (elements.minutes) elements.minutes.innerText = minutes.toString().padStart(2, '0');
        if (elements.seconds) elements.seconds.innerText = seconds.toString().padStart(2, '0');
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
                    const stepTime = Math.abs(Math.floor(duration / steps));
                    let current = 0;
                    const increment = target / steps;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.innerText = target + (target > 1000 ? '+' : '');
                            clearInterval(timer);
                        } else {
                            el.innerText = Math.floor(current) + (target > 1000 ? '+' : '');
                        }
                    }, stepTime);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
