// ============================================
// MATRIX RAIN BACKGROUND
// Very subtle, low-opacity canvas effect
// ============================================

const MatrixRain = {
    canvas: null,
    ctx: null,
    columns: 0,
    drops: [],
    fontSize: 14,
    chars: "01アイウエオカキクケコサシスセソタチツテトナニヌネノ",
    isActive: true,

    init: function() {
        this.canvas = document.getElementById("matrix-canvas");
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.resize();

        window.addEventListener("resize", () => this.resize());
        this.animate();
    },

    resize: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    },

    animate: function() {
        if (!this.isActive || !this.ctx) return;

        this.ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "rgba(255, 107, 0, 0.15)";
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    },

    toggle: function() {
        this.isActive = !this.isActive;
        if (this.isActive) this.animate();
    }
};

if (typeof window !== 'undefined') {
    window.MatrixRain = MatrixRain;
}
