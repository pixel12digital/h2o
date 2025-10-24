// JavaScript para formulário de contato - redirecionamento para WhatsApp com acessibilidade
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Elementos do formulário
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const telefoneInput = document.getElementById('telefone');
        const mensagemInput = document.getElementById('mensagem');
        const submitButton = contactForm.querySelector('.form-submit');
        
        // Função para mostrar erro de validação
        function showFieldError(field, errorMessage) {
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.form-error');
            
            formGroup.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.setAttribute('aria-live', 'assertive');
            
            // Foca no campo com erro
            field.focus();
            field.setAttribute('aria-invalid', 'true');
        }
        
        // Função para limpar erro de validação
        function clearFieldError(field) {
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.form-error');
            
            formGroup.classList.remove('error');
            errorElement.textContent = '';
            field.setAttribute('aria-invalid', 'false');
        }
        
        // Validação em tempo real
        function validateField(field) {
            const value = field.value.trim();
            
            if (field.hasAttribute('required') && !value) {
                const fieldName = field.getAttribute('name');
                let errorMessage = '';
                
                switch(fieldName) {
                    case 'nome':
                        errorMessage = 'Por favor, digite seu nome completo.';
                        break;
                    case 'email':
                        errorMessage = 'Por favor, digite seu e-mail.';
                        break;
                    case 'mensagem':
                        errorMessage = 'Por favor, digite sua mensagem.';
                        break;
                }
                
                showFieldError(field, errorMessage);
                return false;
            }
            
            // Validação específica para email
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Por favor, digite um e-mail válido.');
                    return false;
                }
            }
            
            clearFieldError(field);
            return true;
        }
        
        // Event listeners para validação em tempo real
        [nomeInput, emailInput, telefoneInput, mensagemInput].forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Limpa erro quando o usuário começa a digitar
                if (this.closest('.form-group').classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });
        
        // Validação do formulário completo
        function validateForm() {
            let isValid = true;
            
            [nomeInput, emailInput, telefoneInput, mensagemInput].forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
        
        // Função para mostrar estado de carregamento
        function setLoadingState(loading) {
            if (loading) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                submitButton.setAttribute('aria-label', 'Enviando mensagem...');
            } else {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                submitButton.setAttribute('aria-label', 'Enviar mensagem');
            }
        }
        
        // Event listener para envio do formulário
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valida o formulário
            if (!validateForm()) {
                // Foca no primeiro campo com erro
                const firstError = contactForm.querySelector('.form-group.error .form-input, .form-group.error .form-textarea');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }
            
            // Coleta os dados do formulário
            const nome = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const telefone = telefoneInput ? telefoneInput.value.trim() : '';
            const mensagem = mensagemInput.value.trim();
            
            // Mostra estado de carregamento
            setLoadingState(true);
            
            // Monta a mensagem para o WhatsApp
            let whatsappMessage = `Olá, vim através do site. Gostaria de fazer um orçamento!

*Dados do cliente:*
• Nome: ${nome}
• E-mail: ${email}`;
            
            if (telefone) {
                whatsappMessage += `\n• Telefone: ${telefone}`;
            }
            
            whatsappMessage += `\n• Mensagem: ${mensagem}`;
            
            // Codifica a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // URL do WhatsApp com a mensagem
            const whatsappUrl = `https://wa.me/5548991111950?text=${encodedMessage}`;
            
            // Pequeno delay para mostrar o estado de carregamento
            setTimeout(() => {
                // Abre o WhatsApp em uma nova aba
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                
                // Limpa o formulário após o envio
                contactForm.reset();
                
                // Remove estado de carregamento
                setLoadingState(false);
                
                // Anuncia sucesso para leitores de tela
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'sr-only';
                announcement.textContent = 'Formulário enviado com sucesso! Você será redirecionado para o WhatsApp.';
                document.body.appendChild(announcement);
                
                // Remove o anúncio após alguns segundos
                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 3000);
                
            }, 500);
        });
        
        // Melhoria na navegação por teclado
        contactForm.addEventListener('keydown', function(e) {
            // Enter no último campo foca no botão de envio
            if (e.key === 'Enter' && e.target === mensagemInput) {
                e.preventDefault();
                submitButton.focus();
            }
        });
    }
});
