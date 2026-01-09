/**
 * Particle Background Animation
 * A lightweight, performance-optimized particle system.
 * Features:
 * - Responsive canvas resizing
 * - Mouse interaction (particles flee or connect)
 * - Optimized rendering loop
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Configuration
    const config = {
        particleCount: window.innerWidth < 768 ? 40 : 80, // Fewer particles on mobile
        connectionDistance: 120,
        mouseDistance: 150,
        baseSpeed: 0.6,
        color: 'rgba(24, 210, 110, 0.8)', // Increased opacity for better visibility
        lineColor: 'rgba(24, 210, 110, 0.4)' // Increased opacity for lines
    };

    let mouse = {
        x: null,
        y: null
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * config.baseSpeed;
            this.vy = (Math.random() - 0.5) * config.baseSpeed;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (config.mouseDistance - distance) / config.mouseDistance;
                    const directionX = forceDirectionX * force * 3; // Push strength
                    const directionY = forceDirectionY * force * 3;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        draw() {
            ctx.fillStyle = config.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];

        // Adjust particle count based on screen size
        config.particleCount = window.innerWidth < 768 ? 40 : 80;

        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = config.lineColor;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener('resize', () => {
        init();
    });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Start
    init();
    animate();
});
