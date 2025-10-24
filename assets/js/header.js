// Header Navigation Script - H2O Poços Artesianos
document.addEventListener('DOMContentLoaded', function() {
    // Função para definir página ativa baseada na URL atual
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('data-page');
            
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'inicio')) {
                link.classList.add('active');
            }
        });
    }
    
    // Função para adicionar efeitos de hover suaves
    function initHoverEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Função para menu mobile (se necessário no futuro)
    function initMobileMenu() {
        const nav = document.querySelector('.navigation');
        const navList = document.querySelector('.nav-list');
        
        // Criar botão de menu mobile
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        
        // Adicionar botão ao header
        const container = document.querySelector('.header .container');
        container.appendChild(mobileMenuBtn);
        
        // Toggle do menu mobile
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('mobile-open');
            this.classList.toggle('active');
            
            // Atualizar aria-label
            const isOpen = navList.classList.contains('mobile-open');
            this.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
            });
        });
    }
    
    // Função para scroll suave
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const heroButtons = document.querySelectorAll('.btn[href^="#"]');
        const allScrollLinks = [...navLinks, ...heroButtons];
        
        allScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Função para adicionar classe de scroll ao header
    function initScrollHeader() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Inicializar todas as funcionalidades
    setActivePage();
    initHoverEffects();
    initMobileMenu();
    initSmoothScroll();
    initScrollHeader();
    
    // Adicionar classe para indicar que o JavaScript está carregado
    document.body.classList.add('js-loaded');
});
