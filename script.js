// Portfolio JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Typing Animation for Hero Subtitle
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'PHP Developer',
        'Data Analyst', 
        'Data Scientce Student',
        'Creative Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Header background on scroll
    const header = document.querySelector('.header');
    
    function updateHeaderBackground() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--burgundy-primary)' : 'var(--burgundy-secondary)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Parallax effect for hero image
    function updateParallax() {
        const heroImage = document.querySelector('.hero-image');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // Smooth reveal animation for cards
    const cards = document.querySelectorAll('.education-card, .service-card, .testimonial-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Mobile menu toggle (for future mobile optimization)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: var(--burgundy-primary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        header.querySelector('.container').appendChild(mobileMenuBtn);
        
        // Mobile menu functionality
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            this.innerHTML = navMenu.classList.contains('mobile-open') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Show/hide mobile menu button based on screen size
        function toggleMobileMenu() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navMenu.classList.add('mobile-nav');
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.classList.remove('mobile-nav', 'mobile-open');
            }
        }
        
        window.addEventListener('resize', toggleMobileMenu);
        toggleMobileMenu();
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Add CSS for mobile menu
    const mobileMenuCSS = `
        @media (max-width: 768px) {
            .mobile-nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .mobile-nav.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-nav .nav-list {
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
            }
            
            .mobile-nav .nav-link {
                padding: 1rem;
                border-bottom: 1px solid var(--burgundy-primary);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = mobileMenuCSS;
    document.head.appendChild(style);
    
    // Download CV functionality
    const downloadCvBtn = document.getElementById('download-cv');
    
    downloadCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'CV_Basma_Gouam.pdf';
        link.download = 'CV_Basma_Gouam.pdf';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        showNotification('CV download started!', 'success');
    });
    
    // Initialize page
    updateActiveNavLink();
    updateHeaderBackground();
    
    console.log('Portfolio JavaScript loaded successfully!');



    console.log('Portfolio JavaScript loaded successfully!');
    
    // Skills Filtering
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    if (currentTheme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        if (newTheme === 'light') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    });






});

// Projects Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play (optional - remove if you don't want auto-play)
    // setInterval(nextSlide, 5000);
});

