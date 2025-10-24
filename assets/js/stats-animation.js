// Animação dos contadores estatísticos
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Função para animar o contador
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 segundos
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Usar easing function para suavizar a animação
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Adicionar classe de animação final
                element.classList.add('animate');
                setTimeout(() => {
                    element.classList.remove('animate');
                }, 2000);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Observer para detectar quando a seção entra na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    // Adicionar delay escalonado para cada estatística
                    setTimeout(() => {
                        animateCounter(stat);
                    }, index * 300);
                });
                
                // Parar de observar após a primeira execução
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Disparar quando 50% da seção estiver visível
    });
    
    // Observar a seção de perfuração
    const perfuracaoSection = document.querySelector('.perfuracao-section');
    if (perfuracaoSection) {
        observer.observe(perfuracaoSection);
    }
    
    // Adicionar efeito de hover com animação adicional
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
