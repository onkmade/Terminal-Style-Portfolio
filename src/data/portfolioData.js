// ============================================
// PORTFOLIO DATA
// All content lives here for easy maintenance
// ============================================

const PORTFOLIO_DATA = {
    user: {
        name: "Onkmade",
        handle: "@Onkmade",
        title: "Full-Stack Developer",
        tagline: "Building the future, one commit at a time.",
        location: "India, Maharashtra",
        email: "example@gmail.com",
        website: "https://onkmade.github.io/Terminal-Style-Portfolio/",
        resumeUrl: "#",
    },

    about: {
        ascii: `
    ___    ____  __  ___________  ____  _____
   /   |  / __ \/ / / / ____/   |/ __ \/ ___/
  / /| | / / / / / / / /   / /| / / / /\__ \ 
 / ___ |/ /_/ / /_/ / /___/ ___ / /_/ /___/ / 
/_/  |_/\____/\____/_____/_/  |_\____//____/  
        `,
        bio: [
            "Hello, world! I'm Onkmade — a developer who turns caffeine into code.",
            "",
            "I specialize in building scalable web applications, developer tools,",
            "and interactive experiences that live at the intersection of design",
            "and engineering.",
            "",
            "Currently hacking on distributed systems and open-source tooling.",
            "When I'm not coding, you'll find me exploring vintage hardware",
            "or contributing to the indie web.",
            "",
            "> Passionate about: Clean code, performance, accessibility, and",
            "  the art of the command line.",
        ],
        stats: {
            "Years Coding": "8+",
            "Coffee Consumed": "∞",
            "Bugs Created": "Countless",
            "Bugs Fixed": "Countless + 1",
            "Favorite Editor": "Neovim",
            "OS": "Arch Linux (btw)",
        }
    },

    skills: {
        languages: [
            { name: "JavaScript/TypeScript", level: 95 },
            { name: "Python", level: 88 },
            { name: "Rust", level: 75 },
            { name: "Go", level: 70 },
            { name: "C/C++", level: 65 },
            { name: "Bash", level: 90 },
        ],
        frontend: [
            { name: "React / Next.js", level: 95 },
            { name: "Vue / Nuxt", level: 80 },
            { name: "Tailwind CSS", level: 98 },
            { name: "GSAP / Framer", level: 85 },
            { name: "Three.js / WebGL", level: 70 },
        ],
        backend: [
            { name: "Node.js", level: 92 },
            { name: "PostgreSQL", level: 85 },
            { name: "Redis", level: 80 },
            { name: "Docker / K8s", level: 78 },
            { name: "AWS / GCP", level: 82 },
        ],
        tools: [
            "Git", "Neovim", "TMux", "Figma", "Postman",
            "Vercel", "GitHub Actions", "Linux", "Nginx"
        ]
    },

    projects: [
        {
            id: "nebula-db",
            title: "NebulaDB",
            stack: "Rust, Tokio, gRPC, Raft",
            description: "A distributed key-value store built from scratch with Raft consensus. Handles 50k+ req/s with sub-millisecond latency.",
            github: "https://github.com/onkmade/nebula-db",
            live: null,
            featured: true
        },
        {
            id: "term-ui",
            title: "TermUI",
            stack: "TypeScript, React, XTerm.js, WebSocket",
            description: "A browser-based terminal emulator with collaborative editing, supporting 100+ concurrent sessions.",
            github: "https://github.com/onkmade/term-ui",
            live: "https://term-ui.vercel.app",
            featured: true
        },
        {
            id: "rust-raytracer",
            title: "RayTracer.rs",
            stack: "Rust, WGSL, WebGPU",
            description: "Real-time ray tracer running in the browser via WebGPU. Features BVH acceleration and denoising.",
            github: "https://github.com/onkmade/raytracer-rs",
            live: "https://raytracer-rs.vercel.app",
            featured: false
        },
        {
            id: "cli-devtools",
            title: "DevCLI",
            stack: "Go, Cobra, Bubble Tea",
            description: "A swiss-army knife CLI for developers. Project scaffolding, git automation, and deployment pipelines.",
            github: "https://github.com/onkmade/devcli",
            live: null,
            featured: false
        },
        {
            id: "ai-code-reviewer",
            title: "CodeReviewer AI",
            stack: "Python, FastAPI, LangChain, OpenAI",
            description: "Automated code review bot that integrates with GitHub PRs. Catches bugs, suggests refactors, and enforces style.",
            github: "https://github.com/onkmade/code-reviewer",
            live: null,
            featured: true
        }
    ],

    experience: [
        {
            role: "Senior Software Engineer",
            company: "Vercel",
            period: "2023 — Present",
            location: "Remote",
            highlights: [
                "Leading the Edge Middleware team, serving 10M+ requests/day",
                "Reduced cold-start latency by 40% through WASM optimization",
                "Mentoring 3 junior engineers and driving technical RFCs"
            ]
        },
        {
            role: "Full-Stack Developer",
            company: "Stripe",
            period: "2021 — 2023",
            location: "San Francisco, CA",
            highlights: [
                "Built the new Dashboard Analytics pipeline (React + Go)",
                "Implemented real-time fraud detection UI with WebSockets",
                "Open-sourced 2 internal tools adopted by 500+ devs"
            ]
        },
        {
            role: "Software Engineer",
            company: "GitHub",
            period: "2019 — 2021",
            location: "Remote",
            highlights: [
                "Contributed to GitHub Actions runner architecture",
                "Shipped the Code Search v2 frontend (React, GraphQL)",
                "Improved accessibility score from 72 to 98 across core pages"
            ]
        },
        {
            role: "Junior Developer",
            company: "DigitalOcean",
            period: "2017 — 2019",
            location: "New York, NY",
            highlights: [
                "Built the Droplet creation wizard (Vue.js)",
                "Maintained the public API documentation platform",
                "First employee to ship a Rust microservice to production"
            ]
        }
    ],

    socials: {
        github: "https://github.com/onkmade",
        twitter: "https://twitter.com/madesear",
        linkedin: "https://linkedin.com/in/onkmade",
        devto: "https://dev.to/onkmade",
        discord: "@onkmade#1234",
        email: "onkmade@portfolio.dev"
    },

    contact: {
        email: "onkmade@portfolio.dev",
        availability: "Open to freelance & collaborations",
        responseTime: "< 24 hours",
        preferred: "Email or GitHub Issues",
        pgp: "0xA1B2C3D4E5F6G7H8"
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
