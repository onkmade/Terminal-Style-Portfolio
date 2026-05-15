// ============================================
// MAIN ENTRY POINT
// Initializes all systems
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    // Initialize sound toggle
    window.soundEnabled = false;
    const soundToggle = document.getElementById("sound-toggle");
    const soundOn = document.getElementById("sound-icon-on");
    const soundOff = document.getElementById("sound-icon-off");

    if (soundToggle) {
        soundToggle.addEventListener("click", () => {
            window.soundEnabled = !window.soundEnabled;
            soundOn.classList.toggle("hidden", !window.soundEnabled);
            soundOff.classList.toggle("hidden", window.soundEnabled);
        });
    }

    // Initialize GSAP plugins
    if (window.TerminalEffects) {
        TerminalEffects.init();
    }

    // Initialize command registry
    if (window.CommandRegistry) {
        CommandRegistry.init();
    }

    // Initialize easter eggs
    if (window.EasterEggs) {
        EasterEggs.init();
    }

    // Initialize matrix rain (subtle background)
    if (window.MatrixRain) {
        MatrixRain.init();
    }

    // Start boot sequence
    if (window.BootSequence) {
        BootSequence.init();
    }

    // Handle window resize for cursor
    window.addEventListener("resize", () => {
        if (window.InputHandler) {
            InputHandler.updateCursorPosition();
        }
    });
});
