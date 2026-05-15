// ============================================
// TERMINAL RENDERER
// Handles output rendering and welcome screen
// ============================================

const TerminalRenderer = {
    outputContainer: null,

    init: function() {
        this.outputContainer = document.getElementById("terminal-output");
        if (!this.outputContainer) return;

        this.showWelcome();
        this.startClock();
        this.updateLatency();
    },

    showWelcome: function() {
        if (!this.outputContainer) return;

        const data = window.PORTFOLIO_DATA;
        const effects = window.TerminalEffects;

        const welcomeBlock = document.createElement("div");
        welcomeBlock.className = "output-block mb-6";
        welcomeBlock.innerHTML = `
            <div class="ascii-art mb-4">
   ____  ____  ____  __________  ____  ________  __  _______  ____  _____
  / __ \/ __ \/ __ \/ ____/ __ \/ __ \/ ____/ / / / / __ \/ __ \/ ___/
 / /_/ / /_/ / / / / /   / / / / / / / __/ / /_/ / / / / / /_/ /\__ \\ 
/ ____/ _, _/ /_/ / /___/ /_/ / /_/ / /___/ __  / / /_/ / _, _/___/ / 
/_/   /_/ |_|\____/\____/\____/_____/_____/_/ /_/\____/_/ |_|/____/  
            </div>
            <div class="space-y-1 text-sm">
                <div class="text-[#ff6b00] font-bold">Portfolio OS v3.1.4 [stable] — Welcome, visitor!</div>
                <div class="text-[#ffb347]/80">Type <span class="highlight">help</span> to see available commands.</div>
                <div class="text-[#ff6b00]/40 text-xs mt-2">
                    Session ID: ${Utils.generateId()} | 
                    Node: portfolio-edge-${Math.floor(Math.random() * 99) + 1} | 
                    Latency: <span id="welcome-latency">12ms</span>
                </div>
            </div>
        `;

        this.outputContainer.appendChild(welcomeBlock);
        effects.staggerLines(welcomeBlock.querySelectorAll("div"), 0.08);
    },

    renderOutput: function(commandName, args) {
        if (!this.outputContainer) return;

        const registry = window.CommandRegistry;
        const effects = window.TerminalEffects;

        // Create command line display
        const cmdLine = Utils.createCommandLine(commandName + (args.length ? " " + args.join(" ") : ""));
        this.outputContainer.appendChild(cmdLine);
        effects.fadeInLine(cmdLine, 0);

        // Execute command
        const result = registry.execute(commandName, args, this.outputContainer);

        if (result === null) {
            // Invalid command
            const errorBlock = document.createElement("div");
            errorBlock.className = "output-block";
            const suggestions = registry.getSuggestions(commandName);
            errorBlock.innerHTML = `
                <div class="error-msg">Command not found: ${commandName}</div>
                ${suggestions.length > 0 ? `
                    <div class="text-sm text-[#ffb347]/70 mt-1">
                        Did you mean: ${suggestions.map(s => `<span class="highlight cursor-pointer" onclick="document.getElementById('terminal-input').value='${s}'; document.getElementById('terminal-input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));">${s}</span>`).join(", ")}?
                    </div>
                ` : ""}
            `;
            this.outputContainer.appendChild(errorBlock);
            effects.shake(errorBlock);
        }

        // Scroll to bottom
        Utils.scrollToBottom();
    },

    startClock: function() {
        const clockEl = document.getElementById("clock");
        if (!clockEl) return;

        const update = () => {
            clockEl.textContent = new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        };
        update();
        setInterval(update, 1000);
    },

    updateLatency: function() {
        const latencyEls = document.querySelectorAll("#latency, #welcome-latency");
        const update = () => {
            const lat = Utils.randomRange(8, 45);
            latencyEls.forEach(el => {
                if (el) el.textContent = lat + "ms";
            });
        };
        update();
        setInterval(update, 5000);
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.TerminalRenderer = TerminalRenderer;
}
