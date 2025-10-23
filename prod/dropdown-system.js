// Universal PlanetScale-style Table Dropdown System
// Usage: <div class="dropdown" data-name="position" data-default="Choose position"></div>

class TableDropdown {
    constructor() {
        this.dropdowns = new Map();
        this.init();
    }

    init() {
        // Initialize all dropdowns on page
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            this.createDropdown(dropdown);
        });

        // Global click handler to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });
    }

    createDropdown(container) {
        const name = container.getAttribute('data-name');
        const defaultText = container.getAttribute('data-default') || 'Choose option';
        const options = JSON.parse(container.getAttribute('data-options') || '[]');

        // Create dropdown HTML structure
        container.innerHTML = `
            <div class="dropdown-trigger" tabindex="0">
                <span>${defaultText}</span>
                <svg class="dropdown-arrow" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </div>
            <div class="dropdown-table">
                <table>
                    <tbody>
                        <tr class="dropdown-option ui-active" data-value="" data-text="${defaultText}">
                            <td>${defaultText}</td>
                            <td class="dropdown-checkmark">✓</td>
                        </tr>
                        ${options.map(option => `
                            <tr class="dropdown-option" data-value="${option.value}" data-text="${option.text}">
                                <td>${option.text}</td>
                                <td class="dropdown-checkmark">✓</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // Store dropdown data
        this.dropdowns.set(name, {
            container,
            trigger: container.querySelector('.dropdown-trigger'),
            table: container.querySelector('.dropdown-table'),
            value: '',
            text: defaultText,
            callback: null
        });

        // Attach event listeners
        this.attachEvents(name);
    }

    attachEvents(name) {
        const dropdown = this.dropdowns.get(name);
        if (!dropdown) return;

        // Trigger click handler
        dropdown.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle(name);
        });

        // Option click handlers
        dropdown.table.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                const text = option.getAttribute('data-text');
                this.select(name, value, text);
            });
        });
    }

    toggle(name) {
        const dropdown = this.dropdowns.get(name);
        if (!dropdown) return;

        if (dropdown.table.classList.contains('show')) {
            this.close(name);
        } else {
            this.closeAllDropdowns();
            this.open(name);
        }
    }

    open(name) {
        const dropdown = this.dropdowns.get(name);
        if (!dropdown) return;

        dropdown.table.classList.add('show');
        dropdown.trigger.classList.add('active');
    }

    close(name) {
        const dropdown = this.dropdowns.get(name);
        if (!dropdown) return;

        dropdown.table.classList.remove('show');
        dropdown.trigger.classList.remove('active');
    }

    closeAllDropdowns() {
        this.dropdowns.forEach((dropdown, name) => {
            this.close(name);
        });
    }

    select(name, value, text) {
        const dropdown = this.dropdowns.get(name);
        if (!dropdown) return;

        // Update trigger text
        dropdown.trigger.querySelector('span').textContent = text;

        // Update active state
        dropdown.table.querySelectorAll('.dropdown-option').forEach(option => {
            option.classList.remove('ui-active');
        });
        
        const selectedOption = dropdown.table.querySelector(`[data-value="${value}"]`);
        if (selectedOption) {
            selectedOption.classList.add('ui-active');
        }

        // Store values
        dropdown.value = value;
        dropdown.text = text;

        // Close dropdown
        this.close(name);

        // Trigger callback if exists
        if (dropdown.callback) {
            dropdown.callback(value, text);
        }

        // Dispatch custom event
        dropdown.container.dispatchEvent(new CustomEvent('dropdownChange', {
            detail: { name, value, text }
        }));
    }

    getValue(name) {
        const dropdown = this.dropdowns.get(name);
        return dropdown ? dropdown.value : null;
    }

    getText(name) {
        const dropdown = this.dropdowns.get(name);
        return dropdown ? dropdown.text : null;
    }

    setValue(name, value, text) {
        this.select(name, value, text);
    }

    onChange(name, callback) {
        const dropdown = this.dropdowns.get(name);
        if (dropdown) {
            dropdown.callback = callback;
        }
    }

    updateOptions(name, options) {
        const dropdown = this.dropdowns.get(name);
        if (!dropdown) return;

        const defaultText = dropdown.text;
        const tbody = dropdown.table.querySelector('tbody');
        
        tbody.innerHTML = `
            <tr class="dropdown-option ui-active" data-value="" data-text="${defaultText}">
                <td>${defaultText}</td>
                <td class="dropdown-checkmark">✓</td>
            </tr>
            ${options.map(option => `
                <tr class="dropdown-option" data-value="${option.value}" data-text="${option.text}">
                    <td>${option.text}</td>
                    <td class="dropdown-checkmark">✓</td>
                </tr>
            `).join('')}
        `;

        // Re-attach event listeners for new options
        dropdown.table.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                const text = option.getAttribute('data-text');
                this.select(name, value, text);
            });
        });
    }
}

// CSS for the dropdown system
const dropdownCSS = `
.dropdown {
    position: relative;
    width: 100%;
}

.dropdown-trigger {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-family: inherit;
    color: #333333;
    transition: all 0.2s ease;
}

.dropdown-trigger:hover {
    border-color: #9ca3af;
}

.dropdown-trigger:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dropdown-trigger.active {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dropdown-arrow {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    color: #6b7280;
}

.dropdown-trigger.active .dropdown-arrow {
    transform: rotate(180deg);
}

.dropdown-table {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 4px;
    display: none;
}

.dropdown-table.show {
    display: block;
}

.dropdown-table table {
    width: 100%;
    border-collapse: collapse;
}

.dropdown-option {
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.15s ease;
    cursor: pointer;
}

.dropdown-option:last-child {
    border-bottom: none;
}

.dropdown-option:hover {
    background: #f8fafc;
}

.dropdown-option.ui-active {
    background: #eff6ff;
    color: #1d4ed8;
}

.dropdown-option td {
    padding: 12px 16px;
    font-size: 14px;
    font-family: inherit;
    color: #333333;
}

.dropdown-option.ui-active td {
    color: #1d4ed8;
}

.dropdown-checkmark {
    opacity: 0;
    color: #1d4ed8;
    font-weight: bold;
    width: 16px;
    text-align: center;
}

.dropdown-option.ui-active .dropdown-checkmark {
    opacity: 1;
}
`;

// Inject CSS if not already present
if (!document.querySelector('#dropdown-system-css')) {
    const style = document.createElement('style');
    style.id = 'dropdown-system-css';
    style.textContent = dropdownCSS;
    document.head.appendChild(style);
}

// Initialize dropdown system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dropdownSystem = new TableDropdown();
    });
} else {
    window.dropdownSystem = new TableDropdown();
}