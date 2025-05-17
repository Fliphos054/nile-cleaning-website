document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Testimonial Slider
    if (document.querySelector('.testimonial-slider')) {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = testimonials.length - 1;
                showTestimonial(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonials.length) newIndex = 0;
                showTestimonial(newIndex);
            });
        }
        
        // Auto-rotate testimonials
        const testimonialInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
        
        // Show first testimonial initially
        showTestimonial(0);
    }
    
    // Form Submission Handler (Confirmed Working)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formData = new FormData(contactForm);
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.innerHTML = `
                            <div class="alert success">
                                <i class="fas fa-check-circle"></i>
                                <div>
                                    <strong>Message Sent!</strong>
                                    <p>We'll contact you shortly at ${formData.get('email') || formData.get('phone')}</p>
                                </div>
                            </div>
                        `;
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.innerHTML = `
                        <div class="alert error">
                            <i class="fas fa-exclamation-circle"></i>
                            <div>
                                <strong>Delivery Failed</strong>
                                <p>Please call us directly at <a href="tel:226-898-5073">226-898-5073</a></p>
                            </div>
                        </div>
                    `;
                }
                console.error('Form error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
    });

    // Logo hover effect
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        logoLink.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});