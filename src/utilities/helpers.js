// ============================================
// UTILITY FUNCTIONS
// Reusable helpers for the terminal
// ============================================

const Utils = {
    typeText: (element, text, duration = 0.8, delay = 0) => {
        return gsap.to(element, {
            duration,
            text: { value: text, delimiter: "" },
            ease: "none",
            delay
        });
    },

    createLine: (content = "", className = "") => {
        const line = document.createElement("div");
        line.className = `terminal-line ${className}`;
        if (content) line.innerHTML = content;
        return line;
    },

    createCommandLine: (command) => {
        const wrapper = document.createElement("div");
        wrapper.className = "command-line";
        wrapper.innerHTML = `
            <span class="command-prompt">user@portfolio:~$</span>
            <span class="command-text">${Utils.escapeHtml(command)}</span>
        `;
        return wrapper;
    },

    escapeHtml: (text) => {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    },

    formatDate: (date = new Date()) => {
        return date.toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });
    },

    random: (arr) => arr[Math.floor(Math.random() * arr.length)],

    randomRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    playTypingSound: () => {
        if (!window.soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = 800 + Math.random() * 200;
            gain.gain.value = 0.02;
            osc.start();
            osc.stop(audioCtx.currentTime + 0.03);
        } catch (e) {}
    },

    animateSkillBars: (container) => {
        const bars = container.querySelectorAll(".skill-fill");
        gsap.to(bars, {
            width: (i, target) => target.dataset.level + "%",
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.2
        });
    },

    staggerFadeIn: (container, delay = 0) => {
        const children = container.children;
        gsap.fromTo(children, 
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay }
        );
    },

    scrollToBottom: () => {
        const output = document.getElementById("terminal-output");
        if (output) {
            output.scrollTop = output.scrollHeight;
        }
    },

    generateId: () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
};

if (typeof window !== 'undefined') {
    window.Utils = Utils;
}
