// ============================================
// TERMINAL EFFECTS & GSAP ANIMATIONS
// Core animation system for the terminal
// ============================================

const TerminalEffects = {
    init: function() {
        gsap.registerPlugin(TextPlugin);
    },

    typewriter: (element, text, speed = 0.02) => {
        return gsap.to(element, {
            text: { value: text, delimiter: "" },
            duration: text.length * speed,
            ease: "none"
        });
    },

    fadeInLine: (element, delay = 0) => {
        return gsap.fromTo(element, 
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay }
        );
    },

    staggerLines: (elements, delay = 0) => {
        return gsap.fromTo(elements,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power2.out", delay }
        );
    },

    animateProjects: (container) => {
        const cards = container.querySelectorAll(".project-card");
        return gsap.fromTo(cards,
            { opacity: 0, y: 20, scale: 0.98 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.5, 
                stagger: 0.1, 
                ease: "power2.out",
                delay: 0.1
            }
        );
    },

    animateTimeline: (container) => {
        const entries = container.querySelectorAll(".timeline-entry");
        return gsap.fromTo(entries,
            { opacity: 0, x: -12 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" }
        );
    },

    shake: (element) => {
        return gsap.to(element, {
            x: "+=6",
            duration: 0.05,
            repeat: 5,
            yoyo: true,
            ease: "power1.inOut",
            onComplete: () => gsap.set(element, { x: 0 })
        });
    },

    glitch: (element, originalText, duration = 0.5) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        let iterations = 0;
        const maxIterations = originalText.length;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split("")
                .map((char, index) => {
                    if (index < iterations) return originalText[index];
                    if (char === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            iterations += 1/2;
            if (iterations >= maxIterations) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, duration * 1000 / maxIterations);
    },

    pulseGlow: (element) => {
        return gsap.to(element, {
            boxShadow: "0 0 20px rgba(255,107,0,0.4), 0 0 40px rgba(255,107,0,0.2)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    },

    matrixDecode: (element, finalText, duration = 1) => {
        const chars = "01";
        const steps = 10;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            element.textContent = finalText.split("").map((char, i) => {
                if (char === " ") return " ";
                if (i < finalText.length * progress) return finalText[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");

            if (currentStep >= steps) {
                clearInterval(interval);
                element.textContent = finalText;
            }
        }, stepDuration * 1000);
    },

    scrollReveal: (element) => {
        return gsap.fromTo(element,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    }
};

if (typeof window !== 'undefined') {
    window.TerminalEffects = TerminalEffects;
}
