document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Glow Effect
    const glow = document.querySelector('.mouse-glow');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow for the glow
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // 2. Navigation Scrolled State
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger earlier

        reveals.forEach(element => {
            const windowTop = element.getBoundingClientRect().top;
            
            if (windowTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Initial check
    reveal();
    window.addEventListener('scroll', reveal);

    // 4. Subtle Particles Canvas
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height, particles;

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        particles = [];
        const numParticles = Math.min(Math.floor(width * height / 15000), 100);
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }

    initCanvas();
    animateParticles();

    window.addEventListener('resize', () => {
        initCanvas();
    });

    // 5. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
