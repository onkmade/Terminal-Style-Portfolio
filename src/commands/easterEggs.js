// ============================================
// EASTER EGG COMMANDS
// Hidden fun commands for the terminal
// ============================================

const EasterEggs = {
    init: function() {
        const registry = window.CommandRegistry;
        const effects = window.TerminalEffects;
        const utils = window.Utils;

        // SUDO
        registry.register("sudo", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const responses = [
                "Nice try. This is a portfolio, not a server.",
                "User is not in the sudoers file. This incident will be reported.",
                "alex is not in the sudoers file. This incident will be reported to /dev/null.",
                "Permission denied. Have you tried turning it off and on again?",
                "sudo: unable to execute /bin/flex: Permission denied"
            ];
            block.innerHTML = `
                <div class="error-msg">${utils.random(responses)}</div>
                <div class="text-sm text-[#ff6b00]/40 mt-2">(But seriously, thanks for trying)</div>
            `;
            out.appendChild(block);
            effects.shake(block);
            return true;
        }, "Attempt to gain root access (won't work)");

        // MATRIX
        registry.register("matrix", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-[#00ff41] font-bold">Wake up, Neo...</div>
                <div class="text-[#00ff41]/80 text-sm mt-1">The Matrix has you.</div>
                <div class="text-[#00ff41]/60 text-xs mt-2">Follow the white rabbit.</div>
            `;
            out.appendChild(block);

            const canvas = document.getElementById("matrix-canvas");
            if (canvas) {
                gsap.to(canvas, { opacity: 0.15, duration: 0.5 });
                setTimeout(() => {
                    gsap.to(canvas, { opacity: 0.03, duration: 2 });
                }, 3000);
            }

            effects.fadeInLine(block);
            return true;
        }, "Enter the Matrix");

        // HACK
        registry.register("hack", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const steps = [
                "Initializing hack sequence...",
                "Bypassing firewall... [OK]",
                "Cracking SHA-256 encryption... 14%",
                "Cracking SHA-256 encryption... 38%",
                "Cracking SHA-256 encryption... 67%",
                "Cracking SHA-256 encryption... 89%",
                "Cracking SHA-256 encryption... 100% [FAILED]",
                "Switching to social engineering...",
                "Sending phishing email to admin...",
                "Admin clicked the link!",
                "Downloading database... [##########] 100%",
                "Wait, this is just a portfolio.",
                "Hack successful! You now have access to... my resume.",
                "Don't actually hack people. It's rude."
            ];

            block.innerHTML = `<div class="space-y-1 text-sm"></div>`;
            out.appendChild(block);

            const container = block.querySelector("div");
            steps.forEach((step, i) => {
                setTimeout(() => {
                    const line = document.createElement("div");
                    line.textContent = `> ${step}`;
                    line.style.opacity = "0";
                    container.appendChild(line);
                    gsap.to(line, { opacity: 1, duration: 0.2 });
                    utils.scrollToBottom();
                    if (i % 2 === 0) utils.playTypingSound();
                }, i * 400);
            });

            return true;
        }, "Initiate fake hack sequence");

        // COFFEE
        registry.register("coffee", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const ascii = `
      ( (
       ) )
    ........
    |      |]
    \\      /
     \\____/
            `;
            block.innerHTML = `
                <pre class="ascii-art text-[#ffb347]">${ascii}</pre>
                <div class="mt-2 text-[#ff6b00]">Here's your coffee!</div>
                <div class="text-sm text-[#ffb347]/70 mt-1">Caffeine level: ${Math.floor(Math.random() * 100)}%</div>
                <div class="text-xs text-[#ff6b00]/40 mt-2">Fun fact: This portfolio was built with ${Math.floor(Math.random() * 50 + 50)} cups of coffee.</div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll("div"), 0.1);
            return true;
        }, "Brew a virtual coffee");

        // RICKROLL
        registry.register("rickroll", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-[#ff6b00] font-bold">Never gonna give you up...</div>
                <div class="text-sm text-[#ffb347]/70 mt-1">Never gonna let you down...</div>
                <div class="text-xs text-[#ff6b00]/40 mt-2">(You knew this was coming)</div>
            `;
            out.appendChild(block);
            effects.fadeInLine(block);

            setTimeout(() => {
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
            }, 1500);

            return true;
        }, "You know what this is");

        // FORTUNE
        registry.register("fortune", (args, out) => {
            const fortunes = [
                "A bug in the hand is better than two in production.",
                "Your code will compile on the second try.",
                "The cloud is just someone else's computer.",
                "There is no place like 127.0.0.1",
                "rm -rf / is not a valid stress relief technique.",
                "It works on my machine",
                "JavaScript is both the problem and the solution.",
                "The answer is 42. The question is still loading...",
                "Your next PR will be approved without changes. (Probably not)",
                "May your tests always pass and your deploys never fail.",
                "There are 10 types of people: those who understand binary and those who don't.",
                "Keep calm and git commit -m 'fix stuff'"
            ];

            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="border-l-2 border-[#ff6b00] pl-4 py-2">
                    <div class="text-[#ffb347] italic">"${utils.random(fortunes)}"</div>
                    <div class="text-xs text-[#ff6b00]/40 mt-2">— /dev/random</div>
                </div>
            `;
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "Get a random developer fortune");

        // COWSAY
        registry.register("cowsay", (args, out) => {
            const text = args.join(" ") || "Moo! I'm a portfolio cow.";
            const cow = `
    ${"_".repeat(text.length + 2)}
   < ${text} >
    ${"-".repeat(text.length + 2)}
           \\   ^__^
            \\  (oo)\\_______
               (__)\\       )\\/\\
                   ||----w |
                   ||     ||
            `;

            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `<pre class="ascii-art text-[#ffb347]">${cow}</pre>`;
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "Make a cow say things");

        // REBOOT
        registry.register("reboot", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-[#ff6b00]">System reboot initiated...</div>
                <div class="text-sm text-[#ffb347]/70 mt-1">Restarting portfolio OS...</div>
            `;
            out.appendChild(block);

            setTimeout(() => {
                location.reload();
            }, 2000);

            return true;
        }, "Reboot the portfolio system");

        // NEOFETCH
        registry.register("neofetch", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const ascii = `
       ___
      (.. |
      (<> |
     / __  \\
    ( /  \\ /|
   _/\\ __)/_)
   \\/-____\\/
            `;
            block.innerHTML = `
                <div class="flex gap-4 items-start">
                    <pre class="ascii-art text-[#ff6b00]">${ascii}</pre>
                    <div class="space-y-1 text-sm">
                        <div><span class="highlight">OS:</span> Portfolio OS 3.1.4</div>
                        <div><span class="highlight">Host:</span> ${data.user.name}</div>
                        <div><span class="highlight">Kernel:</span> Full-Stack Developer</div>
                        <div><span class="highlight">Uptime:</span> 8+ years</div>
                        <div><span class="highlight">Shell:</span> zsh 5.9</div>
                        <div><span class="highlight">Resolution:</span> ${window.innerWidth}x${window.innerHeight}</div>
                        <div><span class="highlight">DE:</span> Terminal</div>
                        <div><span class="highlight">WM:</span> GSAP</div>
                        <div><span class="highlight">Theme:</span> Cyber-Orange [GTK2/3]</div>
                        <div><span class="highlight">Icons:</span> Nerd Fonts</div>
                        <div><span class="highlight">Terminal:</span> portfolio-term</div>
                        <div><span class="highlight">CPU:</span> Brain @ 100% load</div>
                        <div><span class="highlight">Memory:</span> 8472MB / infinity</div>
                    </div>
                </div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll(".space-y-1 > div"), 0.05);
            return true;
        }, "Display system information");

        // 42
        registry.register("42", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-4xl font-bold text-[#ff6b00] text-glow">42</div>
                <div class="text-sm text-[#ffb347]/70 mt-2">The answer to life, the universe, and everything.</div>
                <div class="text-xs text-[#ff6b00]/40 mt-1">Now, what's the question?</div>
            `;
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "The answer");
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.EasterEggs = EasterEggs;
}
