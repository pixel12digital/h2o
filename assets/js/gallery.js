// JavaScript para galeria de imagens com lightbox
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Coleta todas as imagens da galeria
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-image');
        images.push({
            src: img.src,
            alt: img.alt
        });
        
        // Adiciona event listener para cada item da galeria
        item.addEventListener('click', function() {
            openLightbox(index);
        });
        
        // Adiciona suporte para navegação por teclado
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Torna os itens focáveis
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Ver imagem: ${img.alt}`);
    });
    
    // Função para abrir o lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Previne scroll da página
        
        // Foca no botão de fechar para acessibilidade
        setTimeout(() => {
            lightboxClose.focus();
        }, 100);
    }
    
    // Função para fechar o lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restaura scroll da página
        
        // Retorna o foco para o item da galeria que foi clicado
        galleryItems[currentImageIndex].focus();
    }
    
    // Função para atualizar a imagem no lightbox
    function updateLightboxImage() {
        const currentImage = images[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        
        // Atualiza estado dos botões de navegação
        lightboxPrev.disabled = currentImageIndex === 0;
        lightboxNext.disabled = currentImageIndex === images.length - 1;
        
        // Atualiza aria-label para leitores de tela
        lightboxModal.setAttribute('aria-labelledby', `Imagem ${currentImageIndex + 1} de ${images.length}: ${currentImage.alt}`);
    }
    
    // Função para navegar para a imagem anterior
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        }
    }
    
    // Função para navegar para a próxima imagem
    function showNextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        }
    }
    
    // Event listeners para os controles do lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Fecha o lightbox ao clicar no fundo
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                showPreviousImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                showNextImage();
                break;
        }
    });
    
    // Previne que o foco saia do modal quando navegando por teclado
    lightboxModal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = lightboxModal.querySelectorAll(
                'button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    // Lazy loading para melhorar performance
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Aplica lazy loading nas imagens da galeria
    galleryItems.forEach(item => {
        const img = item.querySelector('.gallery-image');
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
    
    // Melhoria de acessibilidade: anúncios para leitores de tela
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Adiciona anúncios quando navegando pelas imagens
    const originalShowPrevious = showPreviousImage;
    const originalShowNext = showNextImage;
    
    showPreviousImage = function() {
        originalShowPrevious();
        announceToScreenReader(`Imagem ${currentImageIndex + 1} de ${images.length}`);
    };
    
    showNextImage = function() {
        originalShowNext();
        announceToScreenReader(`Imagem ${currentImageIndex + 1} de ${images.length}`);
    };
});
