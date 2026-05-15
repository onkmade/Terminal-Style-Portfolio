# Terminal Portfolio

### Core Concept

The portfolio should behave like a command-line terminal where users can type commands to navigate through sections.

When the page first loads:

* Show a boot/startup animation
* Then display a terminal interface
* Include a visible command list/help menu
* Animate text like a real terminal typing effect
* Add a blinking cursor
* Use smooth GSAP transitions for all interactions

---

# Theme & Visual Style

Use a **minimal cyber-terminal aesthetic** with:

* Hot orange (#ff6b00)
* Yellowish orange (#ffb347)
* Deep black / charcoal backgrounds
* Soft glow effects
* Subtle gradients
* Thin borders
* Glassmorphism kept VERY minimal
* Retro CRT + futuristic dev vibe

Typography:

* Use monospace fonts
* Sharp clean spacing
* Minimal clutter
* Terminal-like line heights

The UI should feel inspired by:

* Linux terminal
* Hacker dashboards
* Retro command-line systems
* Minimal futuristic operating systems

---

# Tech Stack

Use:

* HTML
* Tailwind CSS
* Vanilla JavaScript
* GSAP (important for animations)

Animations should include:

* Terminal typing
* Smooth page transitions
* Command output fade-ins
* Cursor blinking
* Boot sequence
* Command history appearance
* Smooth section rendering
* Optional scanline/CRT effect

---

# Portfolio Behavior

Users should navigate the portfolio by typing commands.

Example commands:

* help
* about
* skills
* projects
* experience
* contact
* socials
* clear
* resume
* theme
* whoami

Typing a command should dynamically render terminal output with animations.

---

# Features to Include

## Terminal Features

* Real blinking cursor
* Auto-scroll terminal output
* Command history
* Keyboard-focused interaction
* Fake terminal prompt
* Typing sound effect (optional)
* Tab/autocomplete suggestion system (optional)
* Invalid command response animation

---

# Sections

## About

Short developer introduction with animated typing.

## Skills

Display skills in:

* categorized lists
* progress bars
* terminal stats format

## Projects

Projects should appear like terminal cards/log outputs:

* project title
* stack used
* short description
* GitHub/live link

Animate project cards using GSAP stagger effects.

## Experience

Timeline or log-style entries.

## Contact

Interactive terminal contact info.

## Socials

Clickable terminal links.

---

# Folder Structure

I already created the base Tailwind setup.

Generate the remaining clean scalable folder structure for:

* components
* commands
* animations
* utilities
* data
* assets
* styles

Keep the architecture modular and maintainable.

---

# Important UX Details

* Everything should stay inside the terminal aesthetic
* Avoid traditional portfolio layouts/cards
* Keep it immersive
* Smooth transitions only
* Responsive on desktop/mobile
* Mobile should still feel like a terminal
* Use subtle sound/visual feedback
* Add hidden easter egg commands if possible

Example:

* sudo
* matrix
* hack
* coffee

---

# Bonus Ideas

* Fake system boot logs
* ASCII art intro
* Dynamic date/time
* Terminal status bar
* Matrix rain background (very subtle)
* Theme switch command
* Fake filesystem navigation
* Terminal loading states
* Interactive command suggestions

---

# Deliverables

Provide:

1. Complete folder structure
2. Component architecture
3. Tailwind organization
4. GSAP animation structure
5. Command system architecture
6. Responsive strategy
7. Suggested reusable utility functions
8. Clean scalable code organization

## Features

- **Real Terminal Experience**: Type commands to navigate the portfolio
- **Boot Sequence**: Realistic system startup animation
- **GSAP Animations**: Smooth typing effects, staggered reveals, and transitions
- **Command System**: Modular architecture with 15+ commands
- **Easter Eggs**: Hidden commands like `matrix`, `hack`, `coffee`, `sudo`
- **Autocomplete**: Tab completion for commands
- **Command History**: Arrow up/down navigation
- **Matrix Rain**: Subtle background effect
- **CRT Effects**: Scanlines, flicker, and vignette
- **Responsive**: Works on desktop and mobile
- **Sound Effects**: Optional typing sounds (toggleable)

## Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Developer introduction |
| `skills` | Technical skills with animated bars |
| `projects` | Project showcase |
| `experience` | Work history timeline |
| `contact` | Contact information |
| `socials` | Social media links |
| `whoami` | Current user info |
| `resume` | Download resume |
| `theme` | Switch color themes |
| `date` | Current date/time |
| `clear` | Clear terminal |
| `ls` | List directory |

### Easter Eggs

| Command | Description |
|---------|-------------|
| `sudo` | Attempt root access |
| `matrix` | Enter the Matrix |
| `hack` | Fake hack sequence |
| `coffee` | Virtual coffee |
| `fortune` | Random dev fortune |
| `cowsay` | ASCII cow |
| `neofetch` | System info |
| `rickroll` | You know... |
| `42` | The answer |
| `reboot` | Reload page |

## Tech Stack

- **HTML5** — Semantic structure
- **Tailwind CSS** — Utility-first styling (via CDN)
- **Vanilla JavaScript** — No framework dependency
- **GSAP** — Professional-grade animations
- **Canvas API** — Matrix rain effect

## File Structure

```
terminal-portfolio/
├── index.html                  # Main entry point
├── tailwind.config.js          # Tailwind configuration (optional)
├── src/
│   ├── components/
│   │   ├── terminalRenderer.js # Output rendering engine
│   │   └── inputHandler.js     # Keyboard input & autocomplete
│   ├── commands/
│   │   ├── commandRegistry.js  # Core command definitions
│   │   └── easterEggs.js       # Hidden fun commands
│   ├── animations/
│   │   ├── bootSequence.js     # Startup animation
│   │   ├── terminalEffects.js  # GSAP animation utilities
│   │   └── matrixRain.js       # Background canvas effect
│   ├── utilities/
│   │   └── helpers.js          # Reusable utility functions
│   ├── data/
│   │   └── portfolioData.js    # All content data
│   └── styles/
│       └── main.css            # Custom CSS & CRT effects
├── assets/
│   ├── images/                 # Portfolio images
│   ├── fonts/                  # Custom fonts (optional)
│   └── sounds/                 # Audio files (optional)
└── README.md
```

## Architecture

### Component System
- **TerminalRenderer**: Manages output area, renders command results, handles welcome screen
- **InputHandler**: Captures keyboard input, manages autocomplete, command history, cursor positioning

### Command System
- **CommandRegistry**: Central command dispatcher with auto-registration
- Each command is a self-contained function that receives args and output container
- Commands return boolean to indicate success/failure

### Animation System
- **BootSequence**: Timeline-based startup simulation
- **TerminalEffects**: Reusable GSAP animations (typewriter, stagger, shake, glitch)
- **MatrixRain**: Canvas-based background animation

### Data Layer
- **portfolioData.js**: Single source of truth for all content
- Easy to customize without touching logic code

## Customization

1. Edit `src/data/portfolioData.js` to add your information
2. Modify colors in `src/styles/main.css` CSS variables
3. Add new commands in `src/commands/commandRegistry.js`
4. Add easter eggs in `src/commands/easterEggs.js`


## Responsive Strategy

- **Desktop**: Full terminal experience with side-by-side layouts
- **Tablet**: Adjusted spacing, smaller ASCII art
- **Mobile**: 
  - Simplified ASCII art
  - Stacked layouts
  - Touch-friendly input (auto-focus maintained)
  - Reduced animation complexity

## Performance

- GSAP animations are GPU-accelerated
- Matrix rain uses requestAnimationFrame
- Sound effects use Web Audio API (no external files)
- Minimal DOM manipulation with efficient selectors

## License

MIT — Feel free to use as a template. A small credit is appreciated!
