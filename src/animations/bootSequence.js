// ============================================
// BOOT SEQUENCE ANIMATION
// Simulates a realistic system startup
// ============================================

const BootSequence = {
    bootLogs: [
        { text: "BIOS DATE 01/15/2026 14:22:51 VER 2.4.1", type: "system", delay: 0 },
        { text: "CPU: AMD RYZEN 9 7950X @ 5.7GHz", type: "info", delay: 100 },
        { text: "Checking NVRAM... OK", type: "success", delay: 200 },
        { text: "Loading kernel modules...", type: "info", delay: 300 },
        { text: "[ OK ] Started kernel.", type: "success", delay: 400 },
        { text: "[ OK ] Mounted /dev/sda1.", type: "success", delay: 500 },
        { text: "[ OK ] Started File System Check on /dev/sda2.", type: "success", delay: 600 },
        { text: "[ OK ] Mounted /dev/sda2.", type: "success", delay: 700 },
        { text: "[ OK ] Started Remount Root and Kernel File Systems.", type: "success", delay: 800 },
        { text: "[ OK ] Started dhcpcd on all interfaces.", type: "success", delay: 900 },
        { text: "[ OK ] Reached target Network.", type: "success", delay: 1000 },
        { text: "[ OK ] Started OpenSSH server daemon.", type: "success", delay: 1100 },
        { text: "[ OK ] Started Portfolio Terminal Service.", type: "success", delay: 1200 },
        { text: "", type: "info", delay: 1300 },
        { text: "Initializing portfolio environment...", type: "system", delay: 1400 },
        { text: "Loading assets... [##########] 100%", type: "success", delay: 1500 },
        { text: "Loading modules... [##########] 100%", type: "success", delay: 1600 },
        { text: "Compiling styles... [##########] 100%", type: "success", delay: 1700 },
        { text: "Optimizing animations... [##########] 100%", type: "success", delay: 1800 },
        { text: "", type: "info", delay: 1900 },
        { text: "Portfolio OS v3.1.4 [stable]", type: "system", delay: 2000 },
        { text: "Type 'help' to see available commands.", type: "warn", delay: 2100 },
    ],

    init: async function() {
        const container = document.getElementById("boot-content");
        const bootScreen = document.getElementById("boot-sequence");
        const terminalInterface = document.getElementById("terminal-interface");

        if (!container || !bootScreen || !terminalInterface) return;

        container.innerHTML = "";

        for (const log of this.bootLogs) {
            await Utils.sleep(log.delay * 0.3);

            const line = document.createElement("div");
            line.className = `boot-line ${log.type}`;
            line.textContent = log.text;
            container.appendChild(line);

            gsap.to(line, {
                opacity: 1,
                duration: 0.1,
                ease: "none"
            });

            container.scrollTop = container.scrollHeight;

            if (Math.random() > 0.7) {
                Utils.playTypingSound();
            }
        }

        await Utils.sleep(600);

        const tl = gsap.timeline();

        tl.to(bootScreen, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
        })
        .set(bootScreen, { display: "none" })
        .to(terminalInterface, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2")
        .add(() => {
            if (window.TerminalRenderer) {
                window.TerminalRenderer.init();
            }
            if (window.InputHandler) {
                window.InputHandler.init();
            }
        });
    }
};

if (typeof window !== 'undefined') {
    window.BootSequence = BootSequence;
}
