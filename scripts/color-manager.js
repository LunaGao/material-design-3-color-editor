/**
 * Material Design 3 Color Manager
 * Handles dynamic color theme changes and synchronization
 */

class ColorManager {
    constructor() {
        this.colorInputs = document.querySelectorAll('input[type="color"]');
        this.hexInputs = document.querySelectorAll('.hex-input');
        this.presetButtons = document.querySelectorAll('.preset-btn');
        this.init();
    }

    init() {
        this.setupColorInputListeners();
        this.setupHexInputListeners();
        this.setupPresetButtons();
        this.setupDarkModeControls();
        this.initializeDarkModeColors();
        this.loadSavedTheme();
    }

    /**
     * Set up dark mode background color control
     */
    setupDarkModeControls() {
        const darkBgInput = document.getElementById('dark-bg-color');
        if (darkBgInput) {
            darkBgInput.addEventListener('input', (e) => {
                this.updateDarkModeBackgroundColor(e.target.value);
            });
            
            darkBgInput.addEventListener('change', (e) => {
                this.saveTheme();
            });
        }
    }

    /**
     * Update dark mode background color specifically
     */
    updateDarkModeBackgroundColor(color) {
        const darkViewElements = document.querySelectorAll('.dark-view');
        darkViewElements.forEach(element => {
            element.style.setProperty('--md-sys-color-background', color);
            element.style.setProperty('--md-sys-color-surface', color);
        });
        
        // Also update the global dark theme rule
        this.updateGlobalDarkThemeRule('background', color);
        this.updateGlobalDarkThemeRule('surface', color);
        
        // Update the input value to match
        const darkBgInput = document.getElementById('dark-bg-color');
        if (darkBgInput && darkBgInput.value !== color) {
            darkBgInput.value = color;
        }
    }

    /**
     * Initialize dark mode colors on startup
     */
    initializeDarkModeColors() {
        // Set up default dark mode colors for dark view elements
        this.resetDarkModeToDefault();
    }

    /**
     * Set up event listeners for color input changes
     */
    setupColorInputListeners() {
        this.colorInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.updateColorToken(e.target.dataset.token, e.target.value);
            });

            input.addEventListener('change', (e) => {
                this.saveTheme();
            });
        });
    }

    /**
     * Set up event listeners for HEX input changes
     */
    setupHexInputListeners() {
        this.hexInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleHexInput(e.target);
            });

            input.addEventListener('blur', (e) => {
                this.validateAndUpdateHex(e.target);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.validateAndUpdateHex(e.target);
                    e.target.blur();
                }
            });
        });
    }

    /**
     * Handle HEX input changes
     */
    handleHexInput(input) {
        const value = input.value.toUpperCase();
        input.value = value;
        
        // Remove invalid class during typing
        input.classList.remove('invalid');
        
        // If it's a valid hex color, update immediately
        if (this.isValidHexColor(value)) {
            this.updateColorToken(input.dataset.token, value);
        }
    }

    /**
     * Validate and update HEX input on blur/enter
     */
    validateAndUpdateHex(input) {
        const value = input.value.trim();
        
        if (!value) {
            // If empty, get current color from CSS
            const currentColor = this.getCurrentColorValue(input.dataset.token);
            input.value = currentColor;
            input.classList.remove('invalid');
            return;
        }
        
        let processedValue = value;
        
        // Add # if missing
        if (!processedValue.startsWith('#')) {
            processedValue = '#' + processedValue;
        }
        
        // Handle 3-digit hex (expand to 6-digit)
        if (processedValue.length === 4) {
            processedValue = '#' + processedValue[1] + processedValue[1] + 
                           processedValue[2] + processedValue[2] + 
                           processedValue[3] + processedValue[3];
        }
        
        if (this.isValidHexColor(processedValue)) {
            input.value = processedValue.toUpperCase();
            input.classList.remove('invalid');
            this.updateColorToken(input.dataset.token, processedValue);
            this.saveTheme();
        } else {
            input.classList.add('invalid');
            // Revert to previous valid value after a delay
            setTimeout(() => {
                const currentColor = this.getCurrentColorValue(input.dataset.token);
                input.value = currentColor;
                input.classList.remove('invalid');
            }, 2000);
        }
    }

    /**
     * Check if a string is a valid HEX color
     */
    isValidHexColor(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }

    /**
     * Get current color value from CSS custom property
     */
    getCurrentColorValue(token) {
        const cssVariable = `--md-sys-color-${token}`;
        const value = getComputedStyle(document.documentElement)
            .getPropertyValue(cssVariable).trim();
        
        // If no value found, try to get it from the corresponding input
        if (!value) {
            const colorInput = document.querySelector(`input[type="color"][data-token="${token}"]`);
            if (colorInput) {
                return colorInput.value;
            }
        }
        
        return value || '#000000'; // fallback to black if nothing found
    }
    /**
     * Set up preset theme buttons
     */
    setupPresetButtons() {
        this.presetButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                if (preset) {
                    this.applyPreset(preset);
                }
            });
        });
    }

    /**
     * Update a specific color token in the CSS custom properties
     */
    updateColorToken(token, color, themeMode = 'both') {
        const cssVariable = `--md-sys-color-${token}`;
        
        if (themeMode === 'both' || themeMode === 'light') {
            // Update light mode (root level)
            document.documentElement.style.setProperty(cssVariable, color);
        }
        
        if (themeMode === 'both' || themeMode === 'dark') {
            // Update dark mode
            this.updateDarkModeColor(token, color);
        }
        
        // Update the corresponding color input field if it exists
        const colorInput = document.querySelector(`input[type="color"][data-token="${token}"]`);
        if (colorInput && colorInput.value !== color) {
            colorInput.value = color;
        }
        
        // Update the corresponding HEX input field if it exists
        const hexInput = document.querySelector(`.hex-input[data-token="${token}"]`);
        if (hexInput && hexInput.value.toUpperCase() !== color.toUpperCase()) {
            hexInput.value = color.toUpperCase();
            hexInput.classList.remove('invalid');
        }
    }

    /**
     * Update dark mode specific color token
     */
    updateDarkModeColor(token, color) {
        // Get dark mode appropriate color
        const darkColor = this.getDarkModeColor(token, color);
        const cssVariable = `--md-sys-color-${token}`;
        
        // Update CSS variable for dark view elements
        const darkViewElements = document.querySelectorAll('.dark-view');
        darkViewElements.forEach(element => {
            element.style.setProperty(cssVariable, darkColor);
        });
        
        // Also update the global dark theme rule if it exists
        this.updateGlobalDarkThemeRule(token, darkColor);
    }

    /**
     * Update global dark theme CSS rule
     */
    updateGlobalDarkThemeRule(token, color) {
        try {
            // Try to find existing dark mode rule
            for (let sheet of document.styleSheets) {
                try {
                    for (let rule of sheet.cssRules || sheet.rules) {
                        if (rule.selectorText === '[data-theme="dark"]') {
                            const cssVariable = `--md-sys-color-${token}`;
                            rule.style.setProperty(cssVariable, color);
                            return;
                        }
                    }
                } catch (e) {
                    // Cross-origin stylesheets may throw errors
                    continue;
                }
            }
        } catch (e) {
            console.warn('Could not update global dark theme rule:', e);
        }
    }

    /**
     * Get appropriate dark mode color based on the token
     */
    getDarkModeColor(token, lightColor) {
        // Define dark mode color mappings
        const darkModeMapping = {
            'primary': this.generateDarkPrimary(lightColor),
            'on-primary': this.generateDarkOnPrimary(lightColor),
            'primary-container': this.generateDarkPrimaryContainer(lightColor),
            'on-primary-container': this.generateDarkOnPrimaryContainer(lightColor),
            'secondary': this.generateDarkSecondary(lightColor),
            'on-secondary': this.generateDarkOnSecondary(lightColor),
            'secondary-container': this.generateDarkSecondaryContainer(lightColor),
            'on-secondary-container': this.generateDarkOnSecondaryContainer(lightColor),
            'tertiary': this.generateDarkTertiary(lightColor),
            'on-tertiary': this.generateDarkOnTertiary(lightColor),
            'tertiary-container': this.generateDarkTertiaryContainer(lightColor),
            'on-tertiary-container': this.generateDarkOnTertiaryContainer(lightColor),
            'error': '#FFB4AB',
            'on-error': '#690005',
            'error-container': '#93000A',
            'on-error-container': '#FFDAD6',
            'surface': '#000000',
            'on-surface': '#E6E1E5',
            'surface-variant': '#1A1A1A',
            'on-surface-variant': '#CAC4D0',
            'outline': '#938F99',
            'outline-variant': '#49454F',
            'background': '#000000',
            'on-background': '#E6E1E5'
        };
        
        return darkModeMapping[token] || lightColor;
    }

    /**
     * Generate dark mode primary color
     */
    generateDarkPrimary(lightColor) {
        return this.lightenColor(lightColor, 60);
    }

    /**
     * Generate dark mode on-primary color
     */
    generateDarkOnPrimary(lightColor) {
        return this.darkenColor(lightColor, 40);
    }

    /**
     * Generate dark mode primary container
     */
    generateDarkPrimaryContainer(lightColor) {
        return this.darkenColor(lightColor, 20);
    }

    /**
     * Generate dark mode on-primary container
     */
    generateDarkOnPrimaryContainer(lightColor) {
        return this.lightenColor(lightColor, 80);
    }

    /**
     * Generate dark mode secondary color
     */
    generateDarkSecondary(lightColor) {
        return this.lightenColor(lightColor, 40);
    }

    /**
     * Generate dark mode on-secondary color
     */
    generateDarkOnSecondary(lightColor) {
        return this.darkenColor(lightColor, 50);
    }

    /**
     * Generate dark mode secondary container
     */
    generateDarkSecondaryContainer(lightColor) {
        return this.darkenColor(lightColor, 30);
    }

    /**
     * Generate dark mode on-secondary container
     */
    generateDarkOnSecondaryContainer(lightColor) {
        return this.lightenColor(lightColor, 70);
    }

    /**
     * Generate dark mode tertiary color
     */
    generateDarkTertiary(lightColor) {
        return this.lightenColor(lightColor, 50);
    }

    /**
     * Generate dark mode on-tertiary color
     */
    generateDarkOnTertiary(lightColor) {
        return this.darkenColor(lightColor, 40);
    }

    /**
     * Generate dark mode tertiary container
     */
    generateDarkTertiaryContainer(lightColor) {
        return this.darkenColor(lightColor, 20);
    }

    /**
     * Generate dark mode on-tertiary container
     */
    generateDarkOnTertiaryContainer(lightColor) {
        return this.lightenColor(lightColor, 80);
    }

    /**
     * Lighten a color by a percentage
     */
    lightenColor(hex, percent) {
        const rgb = ColorUtils.hexToRgb(hex);
        if (!rgb) return hex;
        
        const factor = percent / 100;
        const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
        const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
        const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));
        
        return ColorUtils.rgbToHex(r, g, b);
    }

    /**
     * Darken a color by a percentage
     */
    darkenColor(hex, percent) {
        const rgb = ColorUtils.hexToRgb(hex);
        if (!rgb) return hex;
        
        const factor = percent / 100;
        const r = Math.max(0, Math.round(rgb.r * (1 - factor)));
        const g = Math.max(0, Math.round(rgb.g * (1 - factor)));
        const b = Math.max(0, Math.round(rgb.b * (1 - factor)));
        
        return ColorUtils.rgbToHex(r, g, b);
    }

    /**
     * Apply a preset theme
     */
    applyPreset(presetName) {
        const presets = {
            default: {
                'primary': '#6750A4',
                'on-primary': '#FFFFFF',
                'primary-container': '#EADDFF',
                'on-primary-container': '#21005D',
                'secondary': '#625B71',
                'on-secondary': '#FFFFFF',
                'secondary-container': '#E8DEF8',
                'on-secondary-container': '#1D192B',
                'tertiary': '#7D5260',
                'on-tertiary': '#FFFFFF',
                'tertiary-container': '#FFD8E4',
                'on-tertiary-container': '#31111D',
                'error': '#BA1A1A',
                'on-error': '#FFFFFF',
                'error-container': '#FFDAD6',
                'on-error-container': '#410002',
                'surface': '#FFFBFE',
                'on-surface': '#1C1B1F',
                'surface-variant': '#E7E0EC',
                'on-surface-variant': '#49454F',
                'background': '#FFFBFE',
                'on-background': '#1C1B1F',
                'outline': '#79747E'
            },
            blue: {
                'primary': '#1976D2',
                'on-primary': '#FFFFFF',
                'primary-container': '#D1E7FF',
                'on-primary-container': '#001F33',
                'secondary': '#536878',
                'on-secondary': '#FFFFFF',
                'secondary-container': '#D6E7F7',
                'on-secondary-container': '#0F1F2A',
                'tertiary': '#6B5B95',
                'on-tertiary': '#FFFFFF',
                'tertiary-container': '#E9DDFF',
                'on-tertiary-container': '#251431',
                'error': '#BA1A1A',
                'on-error': '#FFFFFF',
                'error-container': '#FFDAD6',
                'on-error-container': '#410002',
                'surface': '#F8FEFF',
                'on-surface': '#191C1E',
                'surface-variant': '#DEE3EA',
                'on-surface-variant': '#42474E',
                'background': '#F8FEFF',
                'on-background': '#191C1E',
                'outline': '#71787E'
            },
            green: {
                'primary': '#4CAF50',
                'on-primary': '#FFFFFF',
                'primary-container': '#D7F2D9',
                'on-primary-container': '#0A2E0E',
                'secondary': '#52634F',
                'on-secondary': '#FFFFFF',
                'secondary-container': '#D4E8CF',
                'on-secondary-container': '#0F1F0F',
                'tertiary': '#38656B',
                'on-tertiary': '#FFFFFF',
                'tertiary-container': '#BCEBF2',
                'on-tertiary-container': '#001F23',
                'error': '#BA1A1A',
                'on-error': '#FFFFFF',
                'error-container': '#FFDAD6',
                'on-error-container': '#410002',
                'surface': '#F7FDF7',
                'on-surface': '#191D19',
                'surface-variant': '#DFE4D7',
                'on-surface-variant': '#43483E',
                'background': '#F7FDF7',
                'on-background': '#191D19',
                'outline': '#717970'
            },
            orange: {
                'primary': '#FF9800',
                'on-primary': '#FFFFFF',
                'primary-container': '#FFE0B3',
                'on-primary-container': '#331F00',
                'secondary': '#6F5B40',
                'on-secondary': '#FFFFFF',
                'secondary-container': '#F8DFBC',
                'on-secondary-container': '#251A04',
                'tertiary': '#516440',
                'on-tertiary': '#FFFFFF',
                'tertiary-container': '#D3EABC',
                'on-tertiary-container': '#0F1F04',
                'error': '#BA1A1A',
                'on-error': '#FFFFFF',
                'error-container': '#FFDAD6',
                'on-error-container': '#410002',
                'surface': '#FFFBF7',
                'on-surface': '#201B16',
                'surface-variant': '#F0E0CF',
                'on-surface-variant': '#504539',
                'background': '#FFFBF7',
                'on-background': '#201B16',
                'outline': '#82786F'
            }
        };

        const preset = presets[presetName];
        if (preset) {
            Object.entries(preset).forEach(([token, color]) => {
                this.updateColorToken(token, color);
            });
            this.saveTheme();
        }
    }

    /**
     * Save the current theme to localStorage
     */
    saveTheme() {
        const theme = {};
        this.colorInputs.forEach(input => {
            theme[input.dataset.token] = input.value;
        });
        localStorage.setItem('materialTheme', JSON.stringify(theme));
    }

    /**
     * Load saved theme from localStorage
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('materialTheme');
        if (savedTheme) {
            try {
                const theme = JSON.parse(savedTheme);
                Object.entries(theme).forEach(([token, color]) => {
                    this.updateColorToken(token, color);
                });
            } catch (e) {
                console.warn('Failed to load saved theme:', e);
            }
        }
    }

    /**
     * Export current theme as JSON
     */
    exportTheme() {
        const theme = {};
        this.colorInputs.forEach(input => {
            theme[input.dataset.token] = input.value;
        });
        return JSON.stringify(theme, null, 2);
    }

    /**
     * Import theme from JSON
     */
    importTheme(themeJson) {
        try {
            const theme = JSON.parse(themeJson);
            Object.entries(theme).forEach(([token, color]) => {
                this.updateColorToken(token, color);
            });
            this.saveTheme();
            return true;
        } catch (e) {
            console.error('Failed to import theme:', e);
            return false;
        }
    }

    /**
     * Generate random theme colors
     */
    generateRandomTheme() {
        const getRandomColor = () => {
            return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        };

        const getContrastColor = (bgColor) => {
            // Simple contrast calculation
            const hex = bgColor.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return brightness > 128 ? '#000000' : '#FFFFFF';
        };

        const getLighterColor = (color, amount = 40) => {
            const hex = color.replace('#', '');
            const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + amount);
            const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + amount);
            const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + amount);
            return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        };

        const primary = getRandomColor();
        const secondary = getRandomColor();
        const tertiary = getRandomColor();

        const randomTheme = {
            'primary': primary,
            'on-primary': getContrastColor(primary),
            'primary-container': getLighterColor(primary),
            'on-primary-container': getContrastColor(getLighterColor(primary)),
            'secondary': secondary,
            'on-secondary': getContrastColor(secondary),
            'secondary-container': getLighterColor(secondary),
            'on-secondary-container': getContrastColor(getLighterColor(secondary)),
            'tertiary': tertiary,
            'on-tertiary': getContrastColor(tertiary),
            'tertiary-container': getLighterColor(tertiary),
            'on-tertiary-container': getContrastColor(getLighterColor(tertiary)),
            'error': '#BA1A1A',
            'on-error': '#FFFFFF',
            'error-container': '#FFDAD6',
            'on-error-container': '#410002',
            'surface': '#FFFBFE',
            'on-surface': '#1C1B1F',
            'surface-variant': '#E7E0EC',
            'on-surface-variant': '#49454F',
            'background': '#FFFBFE',
            'on-background': '#1C1B1F',
            'outline': '#79747E',
            'outline-variant': '#CAC4D0'
        };

        Object.entries(randomTheme).forEach(([token, color]) => {
            this.updateColorToken(token, color);
        });
        this.saveTheme();
    }

    /**
     * Reset to default theme
     */
    resetToDefault() {
        this.applyPreset('default');
    }

    /**
     * Reset dark mode to default values
     */
    resetDarkModeToDefault() {
        const defaultDarkColors = {
            'primary': '#D0BCFF',
            'on-primary': '#381E72',
            'primary-container': '#4F378B',
            'on-primary-container': '#EADDFF',
            'secondary': '#CCC2DC',
            'on-secondary': '#332D41',
            'secondary-container': '#4A4458',
            'on-secondary-container': '#E8DEF8',
            'tertiary': '#EFB8C8',
            'on-tertiary': '#492532',
            'tertiary-container': '#633B48',
            'on-tertiary-container': '#FFD8E4',
            'error': '#FFB4AB',
            'on-error': '#690005',
            'error-container': '#93000A',
            'on-error-container': '#FFDAD6',
            'surface': '#000000',
            'on-surface': '#E6E1E5',
            'surface-variant': '#1A1A1A',
            'on-surface-variant': '#CAC4D0',
            'background': '#000000',
            'on-background': '#E6E1E5',
            'outline': '#938F99',
            'outline-variant': '#49454F'
        };

        // Update dark view elements directly
        const darkViewElements = document.querySelectorAll('.dark-view');
        Object.entries(defaultDarkColors).forEach(([token, color]) => {
            const cssVariable = `--md-sys-color-${token}`;
            darkViewElements.forEach(element => {
                element.style.setProperty(cssVariable, color);
            });
            // Also update global rule
            this.updateGlobalDarkThemeRule(token, color);
        });
        
        // Reset the dark mode background color input
        const darkBgInput = document.getElementById('dark-bg-color');
        if (darkBgInput) {
            darkBgInput.value = '#000000';
        }
    }

    /**
     * Get current theme colors
     */
    getCurrentTheme() {
        const theme = {};
        this.colorInputs.forEach(input => {
            theme[input.dataset.token] = input.value;
        });
        return theme;
    }
}

// Color conversion utilities
class ColorUtils {
    /**
     * Convert hex to RGB
     */
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Convert RGB to hex
     */
    static rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }

    /**
     * Calculate relative luminance
     */
    static getLuminance(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return 0;

        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * Calculate contrast ratio between two colors
     */
    static getContrastRatio(color1, color2) {
        const lum1 = this.getLuminance(color1);
        const lum2 = this.getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    /**
     * Check if color combination meets WCAG accessibility standards
     */
    static isAccessible(bg, fg, level = 'AA') {
        const ratio = this.getContrastRatio(bg, fg);
        const thresholds = {
            'AA': 4.5,
            'AAA': 7,
            'AA-large': 3,
            'AAA-large': 4.5
        };
        return ratio >= (thresholds[level] || 4.5);
    }
}