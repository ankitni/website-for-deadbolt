// Deadbolt 5 - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initHeroAnimations();
    initStatCounters();
    initThreatScanner();
    initStructureAnimations();
    initDashboard();
    initScrollAnimations();
    initParallaxEffects();
    
    // Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 3000);
    }
    
    // Navigation
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Toggle mobile menu
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Smooth scroll navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
        
        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        const navbar = document.querySelector('.cyber-nav');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Hero Animations
    function initHeroAnimations() {
        const heroContent = document.querySelector('.hero-content');
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        
        // Animate hero content on load
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 3500);
        }
        
        // CTA button interactions
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Stat Counters Animation
    function initStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;
        
        function animateCounters() {
            if (animated) return;
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (target < 1) {
                        stat.textContent = current.toFixed(3);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 20);
            });
        }
        
        // Trigger when hero section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 1000);
                }
            });
        });
        
        const heroSection = document.getElementById('home');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }
    
    // Threat Scanner Animation
    function initThreatScanner() {
        const threatLog = document.querySelector('.threat-log');
        const logEntries = [
            { time: getCurrentTime(), status: 'SYSTEM SECURE', type: 'safe' },
            { time: getCurrentTime(-1), status: 'THREAT BLOCKED', type: 'blocked' },
            { time: getCurrentTime(-2), status: 'ANOMALY DETECTED', type: 'detected' },
            { time: getCurrentTime(-5), status: 'SCAN COMPLETE', type: 'safe' },
            { time: getCurrentTime(-8), status: 'MALWARE BLOCKED', type: 'blocked' },
        ];
        
        function getCurrentTime(offset = 0) {
            const now = new Date();
            now.setSeconds(now.getSeconds() + offset);
            return now.toLocaleTimeString('en-US', { hour12: false });
        }
        
        function addLogEntry(entry) {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <span class="timestamp">[${entry.time}]</span>
                <span class="status ${entry.type}">${entry.status}</span>
            `;
            
            if (threatLog) {
                threatLog.insertBefore(logEntry, threatLog.firstChild);
                
                // Remove oldest entry if more than 5
                const entries = threatLog.children;
                if (entries.length > 5) {
                    threatLog.removeChild(entries[entries.length - 1]);
                }
            }
        }
        
        // Add new log entries periodically
        setInterval(() => {
            const randomStatuses = [
                { status: 'SYSTEM SECURE', type: 'safe' },
                { status: 'THREAT BLOCKED', type: 'blocked' },
                { status: 'FILE PROTECTED', type: 'safe' },
                { status: 'SCAN COMPLETE', type: 'safe' }
            ];
            
            const randomEntry = randomStatuses[Math.floor(Math.random() * randomStatuses.length)];
            randomEntry.time = getCurrentTime();
            addLogEntry(randomEntry);
        }, 5000);
    }
    
    // Structure Animations
    function initStructureAnimations() {
        const treeItems = document.querySelectorAll('.tree-item, .tree-file');
        const benefitCards = document.querySelectorAll('.benefit-card');
        
        // Animate tree items on scroll
        const treeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 50);
                }
            });
        }, {
            threshold: 0.1
        });
        
        treeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            treeObserver.observe(item);
        });
        
        // Add hover effects to tree items
        treeItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(0, 255, 255, 0.1)';
                item.style.borderRadius = '4px';
                item.style.padding = '0.2rem';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
                item.style.padding = '0';
            });
        });
        
        // Animate benefit cards
        benefitCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });
            
            cardObserver.observe(card);
        });
    }
    
    // Dashboard Animation
    function initDashboard() {
        const dashboardTime = document.getElementById('dashboard-time');
        const statValues = document.querySelectorAll('#threats-blocked, #events-detected, #processes-terminated');
        
        // Update dashboard time
        function updateTime() {
            if (dashboardTime) {
                const now = new Date();
                dashboardTime.textContent = now.toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            }
        }
        
        // Update stat values periodically
        function updateStats() {
            statValues.forEach((stat, index) => {
                const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
                let newValue;
                
                switch(index) {
                    case 0: // threats-blocked
                        newValue = currentValue + Math.floor(Math.random() * 3);
                        break;
                    case 1: // events-detected  
                        newValue = currentValue + Math.floor(Math.random() * 10) + 5;
                        break;
                    case 2: // processes-terminated
                        newValue = currentValue + (Math.random() < 0.3 ? 1 : 0);
                        break;
                    default:
                        newValue = currentValue;
                }
                
                stat.textContent = newValue.toLocaleString();
            });
        }
        
        updateTime();
        setInterval(updateTime, 1000);
        setInterval(updateStats, 3000);
        
        // Simple chart simulation
        const canvas = document.getElementById('threat-chart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let dataPoints = Array.from({length: 20}, () => Math.floor(Math.random() * 50) + 10);
            
            function drawChart() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Grid
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                
                for (let i = 0; i <= 10; i++) {
                    const y = (canvas.height / 10) * i;
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();
                }
                
                for (let i = 0; i <= 20; i++) {
                    const x = (canvas.width / 20) * i;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();
                }
                
                // Line chart
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                dataPoints.forEach((point, index) => {
                    const x = (canvas.width / (dataPoints.length - 1)) * index;
                    const y = canvas.height - (point / 60 * canvas.height);
                    
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                
                ctx.stroke();
                
                // Glow effect
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 10;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
            
            function updateChart() {
                dataPoints.shift();
                dataPoints.push(Math.floor(Math.random() * 50) + 10);
                drawChart();
            }
            
            drawChart();
            setInterval(updateChart, 2000);
        }
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .arch-layer, .doc-card, .benefit-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Parallax Effects
    function initParallaxEffects() {
        const matrixRain = document.querySelector('.matrix-rain');
        const cyberGrid = document.querySelector('.cyber-grid');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (matrixRain) {
                matrixRain.style.transform = `translateY(${rate}px)`;
            }
            
            if (cyberGrid) {
                cyberGrid.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }
    
    // Feature Card Hover Effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
            card.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.2)';
        });
    });
    
    // Architecture Layer Animations
    const archLayers = document.querySelectorAll('.arch-layer');
    archLayers.forEach((layer, index) => {
        layer.addEventListener('mouseenter', () => {
            layer.style.transform = `scale(1.02) translateZ(10px)`;
            layer.style.boxShadow = '0 0 50px rgba(0, 255, 255, 0.4)';
            
            // Animate components
            const components = layer.querySelectorAll('.component');
            components.forEach((component, compIndex) => {
                setTimeout(() => {
                    component.style.transform = 'translateY(-5px) scale(1.05)';
                }, compIndex * 100);
            });
        });
        
        layer.addEventListener('mouseleave', () => {
            layer.style.transform = 'scale(1) translateZ(0px)';
            layer.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.2)';
            
            const components = layer.querySelectorAll('.component');
            components.forEach(component => {
                component.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
    
    // Cyber Cursor Effect
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);
    
    // Add cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .cyber-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        .cursor-dot {
            width: 100%;
            height: 100%;
            border: 2px solid #00ffff;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        .cyber-cursor.hover {
            transform: scale(2);
        }
        body * {
            cursor: none !important;
        }
    `;
    document.head.appendChild(cursorStyles);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .arch-layer');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Add CSS animations for ripple effect
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            frameCount = 0;
            lastTime = currentTime;
            
            // Adjust animations based on performance
            if (fps < 30) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    requestAnimationFrame(measureFPS);
    
    // Add reduced motion styles
    const motionStyles = document.createElement('style');
    motionStyles.textContent = `
        .reduced-motion * {
            animation-duration: 0.01s !important;
            transition-duration: 0.01s !important;
        }
    `;
    document.head.appendChild(motionStyles);
});

// Console Art
console.log(`
    ██████╗ ███████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗  ████████╗    ███████╗
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║  ╚══██╔══╝    ██╔════╝
    ██║  ██║█████╗  ███████║██║  ██║██████╔╝██║   ██║██║     ██║       ███████╗
    ██║  ██║██╔══╝  ██╔══██║██║  ██║██╔══██╗██║   ██║██║     ██║       ╚════██║
    ██████╔╝███████╗██║  ██║██████╔╝██████╔╝╚██████╔╝███████╗██║       ███████║
    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝       ╚══════╝
                                                                                  
    🛡️  ADVANCED RANSOMWARE PROTECTION SYSTEM
    🔒  SECURITY STATUS: ACTIVE
    ⚡  REAL-TIME MONITORING: ENABLED
    
    Welcome to Deadbolt 5 - Your Ultimate Cybersecurity Shield
`);