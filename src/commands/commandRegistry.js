// ============================================
// COMMAND REGISTRY
// All portfolio commands defined here
// ============================================

const CommandRegistry = {
    commands: {},

    register: function(name, handler, description = "", aliases = []) {
        this.commands[name] = { handler, description, aliases };
        aliases.forEach(alias => {
            this.commands[alias] = { handler, description: `Alias for ${name}`, aliases: [], isAlias: true };
        });
    },

    execute: function(commandName, args, outputContainer) {
        const cmd = this.commands[commandName.toLowerCase()];
        if (cmd) {
            return cmd.handler(args, outputContainer);
        }
        return null;
    },

    getAll: function() {
        const list = [];
        for (const [name, cmd] of Object.entries(this.commands)) {
            if (!cmd.isAlias) {
                list.push({ name, description: cmd.description });
            }
        }
        return list.sort((a, b) => a.name.localeCompare(b.name));
    },

    getSuggestions: function(partial) {
        return Object.keys(this.commands)
            .filter(name => name.startsWith(partial.toLowerCase()) && !this.commands[name].isAlias)
            .sort();
    },

    init: function() {
        const data = window.PORTFOLIO_DATA;
        const effects = window.TerminalEffects;
        const utils = window.Utils;

        // ─── HELP ───
        this.register("help", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="section-header">AVAILABLE COMMANDS</div>
                <table class="help-table">
                    <thead>
                        <tr><th>COMMAND</th><th>DESCRIPTION</th></tr>
                    </thead>
                    <tbody>
                        ${CommandRegistry.getAll().map(cmd => `
                            <tr>
                                <td><span class="help-command">${cmd.name}</span></td>
                                <td>${cmd.description}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div class="mt-4 text-[#ff6b00]/60 text-sm">
                    Pro tip: Use TAB for autocomplete. Try hidden commands too.
                </div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll("tr"), 0.1);
            return true;
        }, "Display all available commands");

        // ─── ABOUT ───
        this.register("about", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="ascii-art">${data.about.ascii}</div>
                <div class="mt-4 space-y-1">
                    ${data.about.bio.map(line => `<div>${line || "&nbsp;"}</div>`).join("")}
                </div>
                <div class="mt-4 info-box">
                    <div class="section-header text-sm">SYSTEM STATS</div>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        ${Object.entries(data.about.stats).map(([k, v]) => `
                            <div><span class="highlight">${k}:</span> ${v}</div>
                        `).join("")}
                    </div>
                </div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll("div > div"), 0.03);
            return true;
        }, "Learn about the developer");

        // ─── SKILLS ───
        this.register("skills", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";

            const renderCategory = (title, items) => `
                <div class="section-header">${title}</div>
                <div class="space-y-2 mb-4">
                    ${items.map(skill => `
                        <div class="skill-bar-container">
                            <span class="skill-label">${skill.name}</span>
                            <div class="skill-bar">
                                <div class="skill-fill" data-level="${skill.level}"></div>
                            </div>
                            <span class="text-xs text-[#ff6b00]/60 w-8">${skill.level}%</span>
                        </div>
                    `).join("")}
                </div>
            `;

            block.innerHTML = `
                ${renderCategory("LANGUAGES", data.skills.languages)}
                ${renderCategory("FRONTEND", data.skills.frontend)}
                ${renderCategory("BACKEND & DEVOPS", data.skills.backend)}
                <div class="section-header">TOOLS & ENVIRONMENT</div>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${data.skills.tools.map(tool => `
                        <span class="px-2 py-1 bg-[#1a1a1a] border border-[#ff6b00]/20 rounded text-xs text-[#ffb347]">${tool}</span>
                    `).join("")}
                </div>
            `;
            out.appendChild(block);
            utils.animateSkillBars(block);
            effects.staggerLines(block.querySelectorAll(".skill-bar-container"), 0.08);
            return true;
        }, "View technical skills and proficiencies");

        // ─── PROJECTS ───
        this.register("projects", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const projects = args[0] ? data.projects.filter(p => p.id === args[0] || p.title.toLowerCase().includes(args.join(" ").toLowerCase())) : data.projects;

            block.innerHTML = `
                <div class="section-header">PROJECTS (${projects.length})</div>
                <div class="space-y-3">
                    ${projects.map(p => `
                        <div class="project-card">
                            <div class="flex items-center justify-between">
                                <span class="project-title">${p.title}</span>
                                ${p.featured ? '<span class="text-xs text-[#ff6b00] border border-[#ff6b00]/30 px-2 py-0.5 rounded">FEATURED</span>' : ''}
                            </div>
                            <div class="project-stack">> ${p.stack}</div>
                            <div class="project-desc">${p.description}</div>
                            <div class="project-links">
                                ${p.github ? `<a href="${p.github}" target="_blank">[GitHub]</a>` : ''}
                                ${p.live ? `<a href="${p.live}" target="_blank">[Live Demo]</a>` : ''}
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;
            out.appendChild(block);
            effects.animateProjects(block);
            return true;
        }, "List all projects (use: projects [name])");

        // ─── EXPERIENCE ───
        this.register("experience", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="section-header">WORK EXPERIENCE</div>
                <div class="space-y-4">
                    ${data.experience.map(exp => `
                        <div class="timeline-entry">
                            <div class="timeline-date">${exp.period}</div>
                            <div class="timeline-content">
                                <div class="timeline-role">${exp.role}</div>
                                <div class="timeline-company">@ ${exp.company} — ${exp.location}</div>
                                <ul class="mt-2 space-y-1 text-sm text-[#ffb347]/80">
                                    ${exp.highlights.map(h => `<li>• ${h}</li>`).join("")}
                                </ul>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;
            out.appendChild(block);
            effects.animateTimeline(block);
            return true;
        }, "View professional experience timeline");

        // ─── CONTACT ───
        this.register("contact", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="section-header">CONTACT</div>
                <div class="info-box space-y-2">
                    <div><span class="highlight">Email:</span> <a href="mailto:${data.contact.email}" class="text-[#ffb347] hover:text-[#ff6b00]">${data.contact.email}</a></div>
                    <div><span class="highlight">PGP Key:</span> ${data.contact.pgp}</div>
                    <div><span class="highlight">Status:</span> <span class="text-green-400">${data.contact.availability}</span></div>
                    <div><span class="highlight">Response:</span> ${data.contact.responseTime}</div>
                    <div><span class="highlight">Preferred:</span> ${data.contact.preferred}</div>
                </div>
                <div class="mt-4 text-sm text-[#ff6b00]/60">
                    Use <span class="highlight">socials</span> to find me elsewhere on the web.
                </div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll(".info-box > div"), 0.1);
            return true;
        }, "Get in touch");

        // ─── SOCIALS ───
        this.register("socials", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const socials = data.socials;
            block.innerHTML = `
                <div class="section-header">SOCIAL LINKS</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a href="${socials.github}" target="_blank" class="link-item">
                        <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        <span>GitHub</span>
                    </a>
                    <a href="${socials.twitter}" target="_blank" class="link-item">
                        <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        <span>X / Twitter</span>
                    </a>
                    <a href="${socials.linkedin}" target="_blank" class="link-item">
                        <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        <span>LinkedIn</span>
                    </a>
                    <a href="${socials.devto}" target="_blank" class="link-item">
                        <svg class="link-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.79-.26.18-.21.27-.52.27-.97 0-.48-.08-.8-.26-1.41zm8.09-3.68c-.54 0-.97.2-1.29.59-.32.39-.48.91-.48 1.55 0 .63.16 1.14.48 1.53.32.39.75.59 1.29.59.55 0 .98-.2 1.3-.59.32-.39.48-.9.48-1.53 0-.64-.16-1.16-.48-1.55-.32-.39-.75-.59-1.3-.59zM21 0H3C1.343 0 0 1.343 0 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3z"/></svg>
                        <span>Dev.to</span>
                    </a>
                    <div class="link-item cursor-default">
                        <svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                        <span>Discord: ${socials.discord}</span>
                    </div>
                </div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll(".link-item"), 0.08);
            return true;
        }, "Find me on the web");

        // ─── WHOAMI ───
        this.register("whoami", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-[#ff6b00] font-bold text-lg">${data.user.name}</div>
                <div class="text-[#ffb347]">${data.user.title}</div>
                <div class="text-sm text-[#ff6b00]/60 mt-1">${data.user.handle} | ${data.user.location}</div>
                <div class="mt-2 text-sm italic text-[#ffb347]/70">"${data.user.tagline}"</div>
            `;
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "Display current user info");

        // ─── CLEAR ───
        this.register("clear", (args, out) => {
            const output = document.getElementById("terminal-output");
            if (output) {
                gsap.to(output.children, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    stagger: 0.02,
                    onComplete: () => {
                        output.innerHTML = "";
                        if (window.TerminalRenderer) {
                            window.TerminalRenderer.showWelcome();
                        }
                    }
                });
            }
            return true;
        }, "Clear terminal screen", ["cls"]);

        // ─── RESUME ───
        this.register("resume", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="section-header">RESUME</div>
                <div class="info-box">
                    <p>Download my resume in your preferred format:</p>
                    <div class="flex gap-4 mt-3">
                        <a href="${data.user.resumeUrl}" target="_blank" class="px-4 py-2 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded hover:bg-[#ff6b00]/20 transition-colors text-sm">
                            [PDF Version]
                        </a>
                        <a href="${data.user.resumeUrl}" target="_blank" class="px-4 py-2 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded hover:bg-[#ff6b00]/20 transition-colors text-sm">
                            [Markdown]
                        </a>
                    </div>
                </div>
                <div class="mt-3 text-sm text-[#ff6b00]/60">
                    Last updated: ${new Date().toLocaleDateString()}
                </div>
            `;
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "Download resume");

        // ─── THEME ───
        this.register("theme", (args, out) => {
            const themes = {
                "default": { primary: "#ff6b00", secondary: "#ffb347", bg: "#0a0a0a" },
                "amber": { primary: "#ffb000", secondary: "#ffcc00", bg: "#0a0a0a" },
                "green": { primary: "#00ff41", secondary: "#00cc33", bg: "#0a0a0a" },
                "cyan": { primary: "#00ffff", secondary: "#00cccc", bg: "#0a0a0a" },
                "red": { primary: "#ff3333", secondary: "#ff6666", bg: "#0a0a0a" },
            };

            const requested = args[0]?.toLowerCase();

            if (requested && themes[requested]) {
                const t = themes[requested];
                document.documentElement.style.setProperty("--color-primary", t.primary);
                document.documentElement.style.setProperty("--color-secondary", t.secondary);
                document.body.style.setProperty("color", t.secondary);

                document.querySelectorAll(".text-[#ff6b00]").forEach(el => {
                    el.style.color = t.primary;
                });
                document.querySelectorAll(".text-[#ffb347]").forEach(el => {
                    el.style.color = t.secondary;
                });
                document.querySelectorAll(".bg-[#ff6b00]").forEach(el => {
                    el.style.backgroundColor = t.primary;
                });

                const block = document.createElement("div");
                block.className = "output-block success-msg";
                block.textContent = `Theme switched to: ${requested}`;
                out.appendChild(block);
                effects.fadeInLine(block);
                return true;
            }

            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="section-header">AVAILABLE THEMES</div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                    ${Object.keys(themes).map(t => `
                        <div class="p-2 border border-[#ff6b00]/20 rounded cursor-pointer hover:border-[#ff6b00] transition-colors" onclick="document.getElementById('terminal-input').value='theme ${t}'; document.getElementById('terminal-input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));">
                            <div class="text-sm font-bold capitalize">${t}</div>
                            <div class="text-xs text-[#ff6b00]/60">Click to preview</div>
                        </div>
                    `).join("")}
                </div>
                <div class="mt-3 text-sm">Usage: theme [name]</div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll(".grid > div"), 0.05);
            return true;
        }, "Switch terminal color theme");

        // ─── DATE ───
        this.register("date", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.innerHTML = `
                <div class="text-[#ffb347]">${Utils.formatDate()}</div>
                <div class="text-sm text-[#ff6b00]/60 mt-1">Unix timestamp: ${Math.floor(Date.now() / 1000)}</div>
            `;
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "Show current date and time");

        // ─── ECHO ───
        this.register("echo", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            block.textContent = args.join(" ") || "";
            out.appendChild(block);
            effects.fadeInLine(block);
            return true;
        }, "Print text to terminal");

        // ─── LS ───
        this.register("ls", (args, out) => {
            const block = document.createElement("div");
            block.className = "output-block";
            const dirs = ["about", "skills", "projects", "experience", "contact", "socials", "resume.pdf"];
            block.innerHTML = `
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    ${dirs.map(d => `
                        <div class="flex items-center gap-2 text-sm">
                            <span class="text-[#ff6b00]">${d.endsWith('.pdf') ? '📄' : '📁'}</span>
                            <span class="${d.endsWith('.pdf') ? 'text-[#ffb347]' : 'text-[#ff6b00]'}">${d}</span>
                        </div>
                    `).join("")}
                </div>
            `;
            out.appendChild(block);
            effects.staggerLines(block.querySelectorAll(".grid > div"), 0.03);
            return true;
        }, "List directory contents", ["dir"]);
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.CommandRegistry = CommandRegistry;
}
