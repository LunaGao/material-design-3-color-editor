/**
 * Main Application Script
 * Handles page navigation, interactions, and initialization
 */

class MaterialApp {
    constructor() {
        this.currentPage = 'components';
        this.colorManager = null;
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupFormHandlers();
        this.initializeColorManager();
        this.setupToolbarButtons();
        this.setupModal();
        this.addExtraFeatures();
        
        // Initialize the app once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMReady();
            });
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        this.showWelcomeMessage();
        this.setupKeyboardShortcuts();
    }

    /**
     * Set up tab navigation functionality
     */
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const pages = document.querySelectorAll('.page');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = e.target.dataset.page;
                this.switchPage(targetPage);
            });
        });
    }

    /**
     * Set up toolbar buttons in the header
     */
    setupToolbarButtons() {
        // Export theme button
        const exportBtn = document.getElementById('export-theme-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportTheme();
            });
        }

        // Import theme button
        const importBtn = document.getElementById('import-theme-btn');
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                this.importTheme();
            });
        }

        // Shortcuts help button
        const shortcutsBtn = document.getElementById('shortcuts-help-btn');
        if (shortcutsBtn) {
            shortcutsBtn.addEventListener('click', () => {
                this.showShortcutsModal();
            });
        }
        
        // Random theme button in preset section
        const randomThemeBtn = document.getElementById('random-theme-btn');
        if (randomThemeBtn) {
            randomThemeBtn.addEventListener('click', () => {
                if (this.colorManager) {
                    this.colorManager.generateRandomTheme();
                    this.showToast('已生成随机主题');
                }
            });
        }
        
        // Reset theme button in preset section
        const resetThemeBtn = document.getElementById('reset-theme-btn');
        if (resetThemeBtn) {
            resetThemeBtn.addEventListener('click', () => {
                if (this.colorManager) {
                    this.colorManager.resetToDefault();
                    this.showToast('已重置为默认主题');
                }
            });
        }
        
        // Reset dark mode button in preset section
        const resetDarkBtn = document.getElementById('reset-dark-btn');
        if (resetDarkBtn) {
            resetDarkBtn.addEventListener('click', () => {
                if (this.colorManager) {
                    this.colorManager.resetDarkModeToDefault();
                    this.showToast('已重置黑暗模式为默认');
                }
            });
        }
    }

    /**
     * Set up modal functionality
     */
    setupModal() {
        const modal = document.getElementById('shortcuts-modal');
        const closeBtn = document.getElementById('modal-close-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideModal();
            });
        }
        
        if (modal) {
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
    }

    /**
     * Show shortcuts modal
     */
    showShortcutsModal() {
        const modal = document.getElementById('shortcuts-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    /**
     * Hide modal
     */
    hideModal() {
        const modal = document.getElementById('shortcuts-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    /**
     * Switch between different pages
     */
    switchPage(pageId) {
        // Remove active class from all tabs and pages in both views
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

        // Add active class to selected tab
        const selectedTab = document.querySelector(`[data-page="${pageId}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Show corresponding pages in both light and dark views
        const lightPage = document.getElementById(`light-${pageId}-page`);
        const darkPage = document.getElementById(`dark-${pageId}-page`);
        
        if (lightPage) {
            lightPage.classList.add('active');
        }
        
        if (darkPage) {
            darkPage.classList.add('active');
        }
        
        this.currentPage = pageId;
        
        // Trigger page-specific initialization
        this.onPageSwitch(pageId);
    }

    /**
     * Handle page switch events
     */
    onPageSwitch(pageId) {
        switch (pageId) {
            case 'components':
                this.initComponentsPage();
                break;
            case 'cards':
                this.initCardsPage();
                break;
            case 'forms':
                this.initFormsPage();
                break;
            case 'layout':
                this.initLayoutPage();
                break;
        }
    }

    /**
     * Initialize components page
     */
    initComponentsPage() {
        // Add click handlers for demonstration in both light and dark views
        const lightButtons = document.querySelectorAll('#light-components-page .md-button');
        const darkButtons = document.querySelectorAll('#dark-components-page .md-button');
        
        [...lightButtons, ...darkButtons].forEach(button => {
            if (!button.dataset.listenerAdded) {
                button.addEventListener('click', (e) => {
                    this.showToast(`点击了 ${e.target.textContent} 按钮`);
                });
                button.dataset.listenerAdded = 'true';
            }
        });
    }

    /**
     * Initialize cards page
     */
    initCardsPage() {
        const lightCardButtons = document.querySelectorAll('#light-cards-page .md-button');
        const darkCardButtons = document.querySelectorAll('#dark-cards-page .md-button');
        
        [...lightCardButtons, ...darkCardButtons].forEach(button => {
            if (!button.dataset.listenerAdded) {
                button.addEventListener('click', (e) => {
                    this.showToast(`卡片操作: ${e.target.textContent}`);
                });
                button.dataset.listenerAdded = 'true';
            }
        });
    }

    /**
     * Initialize forms page
     */
    initFormsPage() {
        // Already handled in setupFormHandlers
    }

    /**
     * Initialize layout page
     */
    initLayoutPage() {
        const lightNavItems = document.querySelectorAll('#light-layout-page .nav-item');
        const darkNavItems = document.querySelectorAll('#dark-layout-page .nav-item');
        
        [...lightNavItems, ...darkNavItems].forEach(item => {
            if (!item.dataset.listenerAdded) {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Get the parent container to find related nav items
                    const parentContainer = e.target.closest('.navigation');
                    const relatedNavItems = parentContainer.querySelectorAll('.nav-item');
                    
                    // Remove active class from related nav items only
                    relatedNavItems.forEach(nav => nav.classList.remove('active'));
                    // Add active class to clicked item
                    e.target.closest('.nav-item').classList.add('active');
                    this.showToast(`导航到: ${e.target.closest('.nav-item').textContent.trim()}`);
                });
                item.dataset.listenerAdded = 'true';
            }
        });
    }

    /**
     * Set up form handlers
     */
    setupFormHandlers() {
        const form = document.querySelector('.md-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });

            form.addEventListener('reset', () => {
                this.showToast('表单已重置');
            });
        }

        // Add floating label animation for text fields
        const textFields = document.querySelectorAll('.md-textfield input, .md-textfield textarea');
        textFields.forEach(field => {
            field.addEventListener('focus', (e) => {
                e.target.closest('.md-textfield').classList.add('focused');
            });

            field.addEventListener('blur', (e) => {
                e.target.closest('.md-textfield').classList.remove('focused');
            });
        });
    }

    /**
     * Handle form submission
     */
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simple form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--md-sys-color-error)';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        if (isValid) {
            this.showToast('表单提交成功！', 'success');
            console.log('Form data:', data);
        } else {
            this.showToast('请填写所有必填字段', 'error');
        }
    }

    /**
     * Initialize color manager
     */
    initializeColorManager() {
        this.colorManager = new ColorManager();
    }

    /**
     * Export current theme
     */
    exportTheme() {
        if (!this.colorManager) {
            this.showToast('颜色管理器未初始化', 'error');
            return;
        }
        
        const themeJson = this.colorManager.exportTheme();
        const blob = new Blob([themeJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'material-theme.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('主题已导出');
    }

    /**
     * Import theme from file
     */
    importTheme() {
        if (!this.colorManager) {
            this.showToast('颜色管理器未初始化', 'error');
            return;
        }
        
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const success = this.colorManager.importTheme(e.target.result);
                    if (success) {
                        this.showToast('主题导入成功');
                    } else {
                        this.showToast('主题导入失败', 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
        
        input.click();
    }

    /**
     * Add extra interactive features
     */
    addExtraFeatures() {
        // Add ripple effect to buttons
        this.addRippleEffect();
        
        // Add smooth scrolling
        this.addSmoothScrolling();
    }

    /**
     * Add material design ripple effect
     */
    addRippleEffect() {
        const buttons = document.querySelectorAll('.md-button, .tab-btn, .preset-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Add smooth scrolling behavior
     */
    addSmoothScrolling() {
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    /**
     * Set up keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + 1-4 for page navigation
            if (e.ctrlKey && e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const pages = ['components', 'cards', 'forms', 'layout'];
                const pageIndex = parseInt(e.key) - 1;
                if (pages[pageIndex]) {
                    this.switchPage(pages[pageIndex]);
                }
            }
            
            // Ctrl + R for random theme
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                if (this.colorManager) {
                    this.colorManager.generateRandomTheme();
                    this.showToast('已生成随机主题 (Ctrl+R)');
                }
            }
            
            // Ctrl + D for default theme
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                if (this.colorManager) {
                    this.colorManager.resetToDefault();
                    this.showToast('已重置为默认主题 (Ctrl+D)');
                }
            }
            
            // Ctrl + E for export theme
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.exportTheme();
            }
            
            // Ctrl + I for import theme
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                this.importTheme();
            }
            
            // Ctrl + ? for help
            if (e.ctrlKey && (e.key === '?' || e.key === '/')) {
                e.preventDefault();
                this.showShortcutsModal();
            }
            
            // Escape to close modal
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        setTimeout(() => {
            this.showToast('欢迎使用 Material Design 3 颜色主题编辑器！', 'info', 4000);
        }, 500);
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = 3000) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background-color: var(--md-sys-color-inverse-surface);
            color: var(--md-sys-color-inverse-on-surface);
            padding: 12px 16px;
            border-radius: var(--md-sys-shape-corner-small);
            box-shadow: var(--md-sys-elevation-level3);
            z-index: 1000;
            font-size: 14px;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
        `;

        if (type === 'error') {
            toast.style.backgroundColor = 'var(--md-sys-color-error-container)';
            toast.style.color = 'var(--md-sys-color-on-error-container)';
        } else if (type === 'success') {
            toast.style.backgroundColor = 'var(--md-sys-color-tertiary-container)';
            toast.style.color = 'var(--md-sys-color-on-tertiary-container)';
        }

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Animate out
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, duration);

        // Add click to dismiss
        toast.addEventListener('click', () => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        });
    }
}

// Initialize the application
const app = new MaterialApp();