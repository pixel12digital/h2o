// Animations for Services Page
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards
    const serviceCards = document.querySelectorAll('.servico-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate differential items
    const differentialItems = document.querySelectorAll('.diferencial-item');
    differentialItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add hover effects to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Counter animation for stats (if any)
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    };

    // Observe counter elements
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.stats-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-servicos');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    const loadingAnimation = () => {
        const cards = document.querySelectorAll('.servico-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100);
        });
    };

    // Trigger loading animation after a short delay
    setTimeout(loadingAnimation, 300);
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    .servico-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .servico-card.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    .diferencial-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .diferencial-item.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Additional styling for better contrast with new color palette */
    .servico-card:hover {
        border-color: #FFC107;
    }
    
    .servico-tag {
        background: linear-gradient(135deg, #000, #333);
        color: #FFC107;
    }
`;
document.head.appendChild(style);
