// Google Tag Manager Configuration
// Este arquivo configura as tags do Google Analytics e Google Ads através do GTM

// Configuração do Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Configuração do Google Analytics
gtag('config', 'G-QEXTBVKVLB', {
    // Configurações específicas do GA4
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
});

// Configuração do Google Ads
gtag('config', 'AW-1017149392', {
    // Configurações específicas do Google Ads
    conversion_id: 'AW-1017149392',
    send_page_view: true
});

// Eventos personalizados para conversões
// Evento de clique no WhatsApp
function trackWhatsAppClick() {
    gtag('event', 'conversion', {
        'send_to': 'AW-1017149392',
        'event_category': 'engagement',
        'event_label': 'whatsapp_click'
    });
    
    gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': 'whatsapp_contact'
    });
}

// Evento de envio de formulário
function trackFormSubmit() {
    gtag('event', 'conversion', {
        'send_to': 'AW-1017149392',
        'event_category': 'lead',
        'event_label': 'form_submit'
    });
    
    gtag('event', 'form_submit', {
        'event_category': 'lead',
        'event_label': 'contact_form'
    });
}

// Evento de visualização de página
function trackPageView(pageName) {
    gtag('event', 'page_view', {
        'page_title': pageName,
        'page_location': window.location.href
    });
}

// Adicionar listeners para eventos de conversão
document.addEventListener('DOMContentLoaded', function() {
    // Rastrear cliques nos botões do WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(function(button) {
        button.addEventListener('click', trackWhatsAppClick);
    });
    
    // Rastrear envio de formulários
    const contactForms = document.querySelectorAll('form[id="contactForm"]');
    contactForms.forEach(function(form) {
        form.addEventListener('submit', trackFormSubmit);
    });
    
    // Rastrear visualização da página atual
    const currentPage = document.title;
    trackPageView(currentPage);
});

// Função para rastrear eventos de scroll (engajamento)
let scrollTracked = false;
window.addEventListener('scroll', function() {
    if (!scrollTracked && window.scrollY > 500) {
        scrollTracked = true;
        gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': 'scroll_50_percent'
        });
    }
});

// Função para rastrear tempo na página
let timeOnPage = 0;
setInterval(function() {
    timeOnPage += 10;
    
    // Rastrear após 30 segundos
    if (timeOnPage === 30) {
        gtag('event', 'timing', {
            'event_category': 'engagement',
            'event_label': 'time_on_page_30s'
        });
    }
    
    // Rastrear após 60 segundos
    if (timeOnPage === 60) {
        gtag('event', 'timing', {
            'event_category': 'engagement',
            'event_label': 'time_on_page_60s'
        });
    }
}, 10000); // Verifica a cada 10 segundos
