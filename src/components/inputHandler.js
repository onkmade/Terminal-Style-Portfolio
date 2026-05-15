// ============================================
// INPUT HANDLER
// Manages keyboard input, autocomplete, cursor
// ============================================

const InputHandler = {
    input: null,
    cursor: null,
    autocomplete: null,
    history: [],
    historyIndex: -1,
    suggestions: [],
    suggestionIndex: -1,

    init: function() {
        this.input = document.getElementById("terminal-input");
        this.cursor = document.getElementById("input-cursor");
        this.autocomplete = document.getElementById("autocomplete");

        if (!this.input) return;

        this.input.focus();
        this.setupEventListeners();
        this.updateCursorPosition();

        // Keep focus
        document.addEventListener("click", () => {
            this.input.focus();
        });
    },

    setupEventListeners: function() {
        this.input.addEventListener("input", () => this.handleInput());
        this.input.addEventListener("keydown", (e) => this.handleKeydown(e));
        this.input.addEventListener("keyup", () => this.updateCursorPosition());
        this.input.addEventListener("click", () => this.updateCursorPosition());

        // Mobile handling
        this.input.addEventListener("blur", () => {
            setTimeout(() => this.input.focus(), 10);
        });
    },

    handleInput: function() {
        this.updateCursorPosition();
        this.showAutocomplete();
    },

    handleKeydown: function(e) {
        // Play typing sound
        if (e.key.length === 1) {
            Utils.playTypingSound();
        }

        switch(e.key) {
            case "Enter":
                e.preventDefault();
                this.executeCommand();
                break;

            case "Tab":
                e.preventDefault();
                this.handleTab();
                break;

            case "ArrowUp":
                e.preventDefault();
                this.navigateHistory(-1);
                break;

            case "ArrowDown":
                e.preventDefault();
                this.navigateHistory(1);
                break;

            case "ArrowLeft":
            case "ArrowRight":
                setTimeout(() => this.updateCursorPosition(), 0);
                break;

            case "Escape":
                this.hideAutocomplete();
                break;

            case "c":
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.input.value = "";
                    this.updateCursorPosition();
                    this.hideAutocomplete();
                }
                break;

            case "l":
                if (e.ctrlKey) {
                    e.preventDefault();
                    window.CommandRegistry.execute("clear", [], document.getElementById("terminal-output"));
                }
                break;
        }
    },

    executeCommand: function() {
        const value = this.input.value.trim();
        if (!value) return;

        this.hideAutocomplete();

        // Add to history
        this.history.push(value);
        this.historyIndex = this.history.length;

        // Parse command
        const parts = value.split(/\s+/);
        const commandName = parts[0];
        const args = parts.slice(1);

        // Render output
        if (window.TerminalRenderer) {
            window.TerminalRenderer.renderOutput(commandName, args);
        }

        // Clear input
        this.input.value = "";
        this.updateCursorPosition();
    },

    handleTab: function() {
        const value = this.input.value.trim().toLowerCase();
        if (!value) return;

        const parts = value.split(/\s+/);
        const current = parts[parts.length - 1];

        const suggestions = window.CommandRegistry.getSuggestions(current);

        if (suggestions.length === 1) {
            // Auto-complete
            if (parts.length === 1) {
                this.input.value = suggestions[0];
            } else {
                parts[parts.length - 1] = suggestions[0];
                this.input.value = parts.join(" ");
            }
            this.updateCursorPosition();
        } else if (suggestions.length > 1) {
            // Show all suggestions in output
            const out = document.getElementById("terminal-output");
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-sm text-[#ff6b00]/60">Suggestions: ${suggestions.join(", ")}</div>
            `;
            out.appendChild(block);
            Utils.scrollToBottom();
        }
    },

    showAutocomplete: function() {
        const value = this.input.value.trim().toLowerCase();
        if (!value || value.includes(" ")) {
            this.hideAutocomplete();
            return;
        }

        this.suggestions = window.CommandRegistry.getSuggestions(value);

        if (this.suggestions.length === 0 || (this.suggestions.length === 1 && this.suggestions[0] === value)) {
            this.hideAutocomplete();
            return;
        }

        this.autocomplete.innerHTML = this.suggestions.map((s, i) => `
            <div class="autocomplete-item ${i === 0 ? 'active' : ''}" data-index="${i}">
                <span class="text-[#ff6b00]">${s.substring(0, value.length)}</span>${s.substring(value.length)}
            </div>
        `).join("");

        this.autocomplete.classList.remove("hidden");
        this.suggestionIndex = 0;

        // Click handlers
        this.autocomplete.querySelectorAll(".autocomplete-item").forEach(item => {
            item.addEventListener("click", () => {
                this.input.value = this.suggestions[parseInt(item.dataset.index)];
                this.hideAutocomplete();
                this.input.focus();
                this.updateCursorPosition();
            });
        });
    },

    hideAutocomplete: function() {
        if (this.autocomplete) {
            this.autocomplete.classList.add("hidden");
            this.autocomplete.innerHTML = "";
        }
        this.suggestions = [];
        this.suggestionIndex = -1;
    },

    navigateHistory: function(direction) {
        if (this.history.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            this.input.value = "";
            this.updateCursorPosition();
            return;
        }

        this.input.value = this.history[this.historyIndex];
        this.updateCursorPosition();
    },

    updateCursorPosition: function() {
        if (!this.input || !this.cursor) return;

        const text = this.input.value;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = getComputedStyle(this.input).font;

        const textWidth = ctx.measureText(text.substring(0, this.input.selectionStart)).width;

        this.cursor.style.left = textWidth + "px";
        this.cursor.style.display = "block";
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.InputHandler = InputHandler;
}
