document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');
    
    // Toggle Mobile Menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close Mobile Menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active Navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Header Scroll Effect including mobile-specific behavior
    function handleHeaderVisibility() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            if (window.pageYOffset > 50) {
                header.style.padding = '5px 0';
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
                header.style.transform = 'translateY(0)';
            } else {
                // Hide header when at the top on mobile
                header.style.transform = 'translateY(-100%)';
                header.style.padding = '';
                header.style.backgroundColor = '';
            }
        } else {
            // Desktop behavior remains the same
            if (window.pageYOffset > 50) {
                header.style.padding = '5px 0';
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            } else {
                header.style.padding = '';
                header.style.backgroundColor = '';
            }
            // Always show header on desktop
            header.style.transform = 'translateY(0)';
        }
    }
    
    // Initial call to set correct state on page load
    handleHeaderVisibility();
    
    // Add event listener for scroll
    window.addEventListener('scroll', handleHeaderVisibility);
    
    // Add event listener for resize to handle orientation changes
    window.addEventListener('resize', handleHeaderVisibility);
});