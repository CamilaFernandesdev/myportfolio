// ===== GERENCIADOR DE FORMULÁRIOS =====

export class FormManager {
    constructor() {
        this.forms = [];
        this.validators = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[1-9][\d]{0,15}$/,
            required: (value) => value.trim().length > 0
        };
    }
    
    init() {
        this.setupForms();
        console.log('📝 Form Manager inicializado');
    }
    
    setupForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            this.setupForm(form);
        });
    }
    
    setupForm(form) {
        const formData = {
            element: form,
            fields: this.getFormFields(form),
            isValid: false
        };
        
        this.forms.push(formData);
        
        // Setup validation
        formData.fields.forEach(field => {
            this.setupFieldValidation(field);
        });
        
        // Setup form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(formData);
        });
        
        // Real-time validation
        form.addEventListener('input', () => {
            this.validateForm(formData);
        });
    }
    
    getFormFields(form) {
        const fields = [];
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button') {
                fields.push({
                    element: input,
                    name: input.name || input.id,
                    type: input.type,
                    required: input.hasAttribute('required'),
                    rules: this.getValidationRules(input)
                });
            }
        });
        
        return fields;
    }
    
    getValidationRules(input) {
        const rules = [];
        
        if (input.hasAttribute('required')) {
            rules.push('required');
        }
        
        if (input.type === 'email') {
            rules.push('email');
        }
        
        if (input.type === 'tel') {
            rules.push('phone');
        }
        
        if (input.hasAttribute('minlength')) {
            rules.push(`minlength:${input.getAttribute('minlength')}`);
        }
        
        if (input.hasAttribute('maxlength')) {
            rules.push(`maxlength:${input.getAttribute('maxlength')}`);
        }
        
        return rules;
    }
    
    setupFieldValidation(field) {
        const input = field.element;
        
        // Criar container de erro se não existir
        let errorContainer = input.parentNode.querySelector('.field-error');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'field-error';
            input.parentNode.appendChild(errorContainer);
        }
        
        field.errorContainer = errorContainer;
        
        // Validation on blur
        input.addEventListener('blur', () => {
            this.validateField(field);
        });
        
        // Clear error on focus
        input.addEventListener('focus', () => {
            this.clearFieldError(field);
        });
    }
    
    validateField(field) {
        const value = field.element.value;
        const errors = [];
        
        field.rules.forEach(rule => {
            const error = this.checkRule(value, rule);
            if (error) {
                errors.push(error);
            }
        });
        
        if (errors.length > 0) {
            this.showFieldError(field, errors[0]);
            field.isValid = false;
        } else {
            this.clearFieldError(field);
            field.isValid = true;
        }
        
        return field.isValid;
    }
    
    checkRule(value, rule) {
        if (rule === 'required') {
            return !this.validators.required(value) ? 'Este campo é obrigatório' : null;
        }
        
        if (rule === 'email') {
            return value && !this.validators.email.test(value) ? 'Email inválido' : null;
        }
        
        if (rule === 'phone') {
            return value && !this.validators.phone.test(value) ? 'Telefone inválido' : null;
        }
        
        if (rule.startsWith('minlength:')) {
            const minLength = parseInt(rule.split(':')[1]);
            return value.length < minLength ? `Mínimo ${minLength} caracteres` : null;
        }
        
        if (rule.startsWith('maxlength:')) {
            const maxLength = parseInt(rule.split(':')[1]);
            return value.length > maxLength ? `Máximo ${maxLength} caracteres` : null;
        }
        
        return null;
    }
    
    showFieldError(field, message) {
        field.element.classList.add('field-invalid');
        field.errorContainer.textContent = message;
        field.errorContainer.style.display = 'block';
        
        // Acessibilidade
        field.element.setAttribute('aria-invalid', 'true');
        field.element.setAttribute('aria-describedby', field.errorContainer.id || 'error');
    }
    
    clearFieldError(field) {
        field.element.classList.remove('field-invalid');
        field.errorContainer.textContent = '';
        field.errorContainer.style.display = 'none';
        
        // Acessibilidade
        field.element.setAttribute('aria-invalid', 'false');
        field.element.removeAttribute('aria-describedby');
    }
    
    validateForm(formData) {
        let isValid = true;
        
        formData.fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        formData.isValid = isValid;
        
        // Atualizar estado do botão submit
        const submitBtn = formData.element.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = !isValid;
            submitBtn.classList.toggle('btn-disabled', !isValid);
        }
        
        return isValid;
    }
    
    async handleSubmit(formData) {
        // Validar novamente antes do submit
        if (!this.validateForm(formData)) {
            this.showFormError(formData, 'Por favor, corrija os erros no formulário');
            return;
        }
        
        // Mostrar loading
        this.setFormLoading(formData, true);
        
        try {
            // Coletar dados do formulário
            const data = this.getFormData(formData);
            
            // Simular envio (você pode substituir por sua API)
            await this.submitForm(data);
            
            // Sucesso
            this.showFormSuccess(formData, 'Mensagem enviada com sucesso!');
            this.resetForm(formData);
            
        } catch (error) {
            this.showFormError(formData, 'Erro ao enviar mensagem. Tente novamente.');
            console.error('Erro no formulário:', error);
        } finally {
            this.setFormLoading(formData, false);
        }
    }
    
    getFormData(formData) {
        const data = {};
        
        formData.fields.forEach(field => {
            data[field.name] = field.element.value;
        });
        
        return data;
    }
    
    async submitForm(data) {
        // Simular API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular sucesso (você pode implementar sua lógica aqui)
                if (Math.random() > 0.1) { // 90% chance de sucesso
                    resolve({ success: true });
                } else {
                    reject(new Error('Erro simulado'));
                }
            }, 2000);
        });
    }
    
    setFormLoading(formData, loading) {
        const submitBtn = formData.element.querySelector('[type="submit"]');
        
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        }
    }
    
    showFormSuccess(formData, message) {
        this.showFormMessage(formData, message, 'success');
    }
    
    showFormError(formData, message) {
        this.showFormMessage(formData, message, 'error');
    }
    
    showFormMessage(formData, message, type) {
        // Remover mensagem anterior
        const existingMessage = formData.element.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        
        // Inserir no topo do formulário
        formData.element.insertBefore(messageDiv, formData.element.firstChild);
        
        // Auto-remove após 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
        
        // Scroll para a mensagem
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    resetForm(formData) {
        formData.element.reset();
        
        // Limpar erros
        formData.fields.forEach(field => {
            this.clearFieldError(field);
        });
        
        // Reset validation state
        formData.isValid = false;
    }
    
    // Adicionar estilos de validação se não existirem
    ensureValidationStyles() {
        if (!document.getElementById('form-validation-styles')) {
            const style = document.createElement('style');
            style.id = 'form-validation-styles';
            style.textContent = `
                .field-invalid {
                    border-color: #f56565 !important;
                    box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1) !important;
                }
                
                .field-error {
                    color: #f56565;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    display: none;
                }
                
                .form-message {
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }
                
                .form-message-success {
                    background: #c6f6d5;
                    color: #22543d;
                    border: 1px solid #9ae6b4;
                }
                
                .form-message-error {
                    background: #fed7d7;
                    color: #742a2a;
                    border: 1px solid #fc8181;
                }
                
                .btn-disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            `;
            document.head.appendChild(style);
        }
    }
}
