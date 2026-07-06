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
    
    // ==========================================
    // Event Registration Modal Controls
    // ==========================================
    const registerModal = document.getElementById('register-modal');
    const closeRegisterModal = document.getElementById('close-register-modal');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Capture registration clicks
    document.querySelectorAll('a[href="#register"], .nav-register-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(registerModal);
        });
    });

    if (closeRegisterModal) {
        closeRegisterModal.addEventListener('click', () => {
            closeModal(registerModal);
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(registerModal);
        }
    });

    // ==========================================
    // Client-Side Validation & AJAX Submission
    // ==========================================
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function showError(inputElement, errorMessage) {
        const group = inputElement.closest('.form-group');
        if (!group) return;
        inputElement.classList.add('is-invalid');
        const errorText = group.querySelector('.error-text');
        if (errorText) {
            errorText.innerText = errorMessage;
            errorText.classList.add('visible');
        }
    }

    function clearError(inputElement) {
        const group = inputElement.closest('.form-group');
        if (!group) return;
        inputElement.classList.remove('is-invalid');
        const errorText = group.querySelector('.error-text');
        if (errorText) {
            errorText.innerText = '';
            errorText.classList.remove('visible');
        }
    }

    function setupValidationListeners(formElement) {
        formElement.querySelectorAll('input, textarea, select').forEach(input => {
            ['input', 'change', 'blur'].forEach(evt => {
                input.addEventListener(evt, () => clearError(input));
            });
        });
    }

    const apiBase = window.location.port === '8081' ? '' : 'http://localhost:8081';

    // Registration Form Submit Handler
    const registrationForm = document.getElementById('registration-form');
    const regSubmitBtn = registrationForm ? registrationForm.querySelector('button[type="submit"]') : null;

    if (registrationForm) {
        setupValidationListeners(registrationForm);

        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullNameInput = document.getElementById('reg-fullname');
            const emailInput = document.getElementById('reg-email');
            const collegeInput = document.getElementById('reg-college');
            const phoneInput = document.getElementById('reg-phone');
            const categoryInput = document.getElementById('reg-category');

            let isValid = true;

            if (fullNameInput.value.trim() === '') {
                showError(fullNameInput, 'Full name is required.');
                isValid = false;
            } else {
                clearError(fullNameInput);
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email address is required.');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (collegeInput.value.trim() === '') {
                showError(collegeInput, 'College / Organization is required.');
                isValid = false;
            } else {
                clearError(collegeInput);
            }

            if (phoneInput.value.trim() === '') {
                showError(phoneInput, 'Phone number is required.');
                isValid = false;
            } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(phoneInput.value.trim())) {
                showError(phoneInput, 'Please enter a valid phone number (10-20 digits).');
                isValid = false;
            } else {
                clearError(phoneInput);
            }

            if (!categoryInput.value) {
                showError(categoryInput, 'Please select an event category.');
                isValid = false;
            } else {
                clearError(categoryInput);
            }

            if (!isValid) return;

            // Map data payload
            const payload = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                college: collegeInput.value.trim(),
                phone: phoneInput.value.trim(),
                category: categoryInput.value
            };

            // Disable submit to prevent duplicate submissions
            if (regSubmitBtn) regSubmitBtn.disabled = true;

            fetch(apiBase + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; }).catch(() => {
                        throw new Error('Server returned error status ' + response.status);
                    });
                }
                return response.json();
            })
            .then(data => {
                closeModal(registerModal);
                registrationForm.reset();
                alert("Registration Successful! Thank you for registering for NovaNexus TechFest.");
            })
            .catch(err => {
                alert(err.message || 'Registration failed. Please check your inputs and try again.');
            })
            .finally(() => {
                if (regSubmitBtn) regSubmitBtn.disabled = false;
            });
        });
    }

    // Contact Form Submit Handler
    const contactForm = document.querySelector('.contact-form');
    const contactSubmitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        setupValidationListeners(contactForm);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Full name is required.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email address is required.');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subject is required.');
                isValid = false;
            } else {
                clearError(subjectInput);
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message content is required.');
                isValid = false;
            } else {
                clearError(messageInput);
            }

            if (!isValid) return;

            // Map data payload
            const payload = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Disable submit to prevent duplicate submissions
            if (contactSubmitBtn) contactSubmitBtn.disabled = true;

            fetch(apiBase + '/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; }).catch(() => {
                        throw new Error('Server returned error status ' + response.status);
                    });
                }
                return response.json();
            })
            .then(data => {
                contactForm.reset();
                alert("Your message has been sent successfully. We'll contact you soon.");
            })
            .catch(err => {
                alert(err.message || 'Failed to send message. Please try again later.');
            })
            .finally(() => {
                if (contactSubmitBtn) contactSubmitBtn.disabled = false;
            });
        });
    }
});