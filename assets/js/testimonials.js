// JavaScript para carrossel de depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('testimonialPrev');
    const nextButton = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    
    // Verifica se os elementos existem
    if (!testimonialsTrack || !testimonialSlides.length || !prevButton || !nextButton || !dotsContainer) {
        console.error('Elementos do carrossel não encontrados');
        return;
    }
    
    // Cria os dots de navegação
    function createDots() {
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
            dot.setAttribute('data-slide', index);
            
            if (index === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Atualiza o slide ativo
    function updateSlide() {
        testimonialSlides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Atualiza os dots
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Atualiza estado dos botões
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === testimonialSlides.length - 1;
        
        // Anuncia mudança para leitores de tela
        announceSlideChange();
    }
    
    // Vai para um slide específico
    function goToSlide(slideIndex) {
        if (isTransitioning || slideIndex === currentSlide) return;
        
        isTransitioning = true;
        currentSlide = slideIndex;
        updateSlide();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 1200); // Ajustado para 1.2s para coincidir com a transição CSS
    }
    
    // Próximo slide
    function nextSlide() {
        if (currentSlide < testimonialSlides.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0); // Volta para o primeiro
        }
    }
    
    // Slide anterior
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(testimonialSlides.length - 1); // Vai para o último
        }
    }
    
    // Auto-play do carrossel
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 7000); // Muda a cada 7 segundos para dar mais tempo de leitura
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Anuncia mudança de slide para leitores de tela
    function announceSlideChange() {
        const currentTestimonial = testimonialSlides[currentSlide];
        const authorName = currentTestimonial.querySelector('.author-name').textContent;
        const authorLocation = currentTestimonial.querySelector('.author-location').textContent;
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Depoimento ${currentSlide + 1} de ${testimonialSlides.length}: ${authorName} de ${authorLocation}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    nextButton.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.testimonials-section')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    stopAutoPlay();
                    prevSlide();
                    startAutoPlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    stopAutoPlay();
                    nextSlide();
                    startAutoPlay();
                    break;
            }
        }
    });
    
    // Pausa o auto-play quando o usuário interage
    const carousel = document.querySelector('.testimonials-carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Pausa o auto-play quando a aba não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Touch/swipe support para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe para a esquerda - próximo slide
                nextSlide();
            } else {
                // Swipe para a direita - slide anterior
                prevSlide();
            }
        }
    }
    
    // Intersection Observer para animações quando a seção entra na viewport
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                startAutoPlay();
            } else {
                entry.target.classList.remove('animate-in');
                stopAutoPlay();
            }
        });
    }, observerOptions);
    
    observer.observe(document.querySelector('.testimonials-section'));
    
    // Inicialização
    console.log('Inicializando carrossel com', testimonialSlides.length, 'slides');
    
    // Garante que apenas o primeiro slide esteja ativo
    testimonialSlides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    createDots();
    updateSlide();
    startAutoPlay();
    
    // Adiciona classe para animação de entrada
    setTimeout(() => {
        document.querySelector('.testimonials-section').classList.add('loaded');
    }, 100);
    
    // Melhoria de performance: pré-carrega próximas imagens se houver
    function preloadNextSlides() {
        const nextIndex = (currentSlide + 1) % testimonialSlides.length;
        const prevIndex = currentSlide === 0 ? testimonialSlides.length - 1 : currentSlide - 1;
        
        // Aqui você pode adicionar lógica para pré-carregar conteúdo se necessário
        // Por exemplo, se houver imagens nos depoimentos
    }
    
    // Chama pré-carregamento quando muda de slide
    const originalGoToSlide = goToSlide;
    goToSlide = function(slideIndex) {
        originalGoToSlide(slideIndex);
        preloadNextSlides();
    };
});
