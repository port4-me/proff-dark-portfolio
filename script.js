// Set current year automatically
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Terminal Theme System
const terminalThemes = {
    matrix: {
        primary: '#00FF41',
        secondary: '#00CC33',
        accent: '#00FF00',
        bg: '#000000',
        name: 'Matrix Green'
    },
    cyber: {
        primary: '#00FFFF',
        secondary: '#0080FF',
        accent: '#00CCCC',
        bg: '#0A0A0A',
        name: 'Cyber Blue'
    },
    retro: {
        primary: '#FFB000',
        secondary: '#FF8C00',
        accent: '#FFD700',
        bg: '#1A1A00',
        name: 'Retro Amber'
    },
    neon: {
        primary: '#FF00FF',
        secondary: '#CC00CC',
        accent: '#FF0080',
        bg: '#1A001A',
        name: 'Neon Purple'
    }
};

// Terminal Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Terminal
function initTerminal() {
    const terminalCommands = document.querySelectorAll('.terminal-command');
    const terminalOutputs = document.querySelectorAll('.terminal-output');
    
    // Add typewriter effect to commands
    terminalCommands.forEach((cmd, index) => {
        const originalText = cmd.textContent;
        cmd.textContent = '';
        setTimeout(() => {
            typeWriter(cmd, originalText, 100);
        }, index * 1000);
    });
    
    // Add typewriter effect to outputs
    terminalOutputs.forEach((output, index) => {
        const originalText = output.textContent;
        output.textContent = '';
        setTimeout(() => {
            typeWriter(output, originalText, 50);
        }, (index * 1000) + 500);
    });
}

// Terminal Controls
function initTerminalControls() {
    const terminalToggle = document.getElementById('terminalToggle');
    const neonToggle = document.getElementById('neonToggle');
    const minimalToggle = document.getElementById('minimalToggle');
    const terminalIntro = document.querySelector('.terminal-intro');
    
    if (terminalToggle) {
        terminalToggle.addEventListener('click', () => {
            setActiveToggle(terminalToggle);
            if (terminalIntro) terminalIntro.style.display = 'block';
            document.body.classList.remove('neon-mode', 'minimal-mode');
            document.body.classList.add('terminal-mode');
        });
    }
    
    if (neonToggle) {
        neonToggle.addEventListener('click', () => {
            setActiveToggle(neonToggle);
            if (terminalIntro) terminalIntro.style.display = 'none';
            document.body.classList.remove('terminal-mode', 'minimal-mode');
            document.body.classList.add('neon-mode');
        });
    }
    
    if (minimalToggle) {
        minimalToggle.addEventListener('click', () => {
            setActiveToggle(minimalToggle);
            if (terminalIntro) terminalIntro.style.display = 'none';
            document.body.classList.remove('terminal-mode', 'neon-mode');
            document.body.classList.add('minimal-mode');
        });
    }
}

function setActiveToggle(activeToggle) {
    document.querySelectorAll('.terminal-toggle').forEach(toggle => {
        toggle.classList.remove('active');
    });
    activeToggle.classList.add('active');
}

// Customization Panel
function initCustomizationPanel() {
    const panel = document.getElementById('customizationPanel');
    const panelToggle = document.getElementById('panelToggle');
    const panelOpenBtn = document.getElementById('panelOpenBtn');
    const terminalTheme = document.getElementById('terminalTheme');
    const neonIntensity = document.getElementById('neonIntensity');
    const typewriterSpeed = document.getElementById('typewriterSpeed');
    const primaryColor = document.getElementById('primaryColor');
    const accentColor = document.getElementById('accentColor');
    const resetBtn = document.getElementById('resetTerminal');
    
    // Panel toggle
    if (panelOpenBtn) {
        panelOpenBtn.addEventListener('click', () => {
            panel.classList.add('open');
            panelOpenBtn.classList.add('hidden');
        });
    }
    
    if (panelToggle) {
        panelToggle.addEventListener('click', () => {
            panel.classList.remove('open');
            panelOpenBtn.classList.remove('hidden');
        });
    }
    
    // Theme selection
    if (terminalTheme) {
        terminalTheme.addEventListener('change', (e) => {
            const theme = terminalThemes[e.target.value];
            applyTerminalTheme(theme);
            localStorage.setItem('terminal-theme', e.target.value);
        });
    }
    
    // Neon intensity
    if (neonIntensity) {
        neonIntensity.addEventListener('input', (e) => {
            const intensity = e.target.value;
            document.documentElement.style.setProperty('--neon-intensity', intensity);
            e.target.nextElementSibling.textContent = `${intensity}%`;
            localStorage.setItem('neon-intensity', intensity);
        });
    }
    
    // Typewriter speed
    if (typewriterSpeed) {
        typewriterSpeed.addEventListener('input', (e) => {
            const speed = e.target.value;
            e.target.nextElementSibling.textContent = `${speed}ms`;
            localStorage.setItem('typewriter-speed', speed);
        });
    }
    
    // Color customization
    if (primaryColor) {
        primaryColor.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--terminal-green', e.target.value);
            localStorage.setItem('terminal-primary-color', e.target.value);
        });
    }
    
    if (accentColor) {
        accentColor.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--terminal-cyan', e.target.value);
            localStorage.setItem('terminal-accent-color', e.target.value);
        });
    }
    
    // Reset functionality
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset to default theme
            applyTerminalTheme(terminalThemes.matrix);
            terminalTheme.value = 'matrix';
            
            // Reset neon intensity
            neonIntensity.value = 50;
            neonIntensity.nextElementSibling.textContent = '50%';
            document.documentElement.style.setProperty('--neon-intensity', '50');
            
            // Reset typewriter speed
            typewriterSpeed.value = 100;
            typewriterSpeed.nextElementSibling.textContent = '100ms';
            
            // Reset colors
            document.documentElement.style.setProperty('--terminal-green', '#00FF41');
            document.documentElement.style.setProperty('--terminal-cyan', '#00FFFF');
            primaryColor.value = '#00FF41';
            accentColor.value = '#00FFFF';
            
            // Clear localStorage
            localStorage.removeItem('terminal-theme');
            localStorage.removeItem('neon-intensity');
            localStorage.removeItem('typewriter-speed');
            localStorage.removeItem('terminal-primary-color');
            localStorage.removeItem('terminal-accent-color');
        });
    }
    
    // Load saved settings
    loadTerminalSettings();
}

function applyTerminalTheme(theme) {
    document.documentElement.style.setProperty('--terminal-green', theme.primary);
    document.documentElement.style.setProperty('--terminal-cyan', theme.secondary);
    document.documentElement.style.setProperty('--terminal-amber', theme.accent);
    document.documentElement.style.setProperty('--bg-terminal', theme.bg);
    
    // Update color pickers
    const primaryColor = document.getElementById('primaryColor');
    const accentColor = document.getElementById('accentColor');
    if (primaryColor) primaryColor.value = theme.primary;
    if (accentColor) accentColor.value = theme.secondary;
}

function loadTerminalSettings() {
    // Load saved theme
    const savedTheme = localStorage.getItem('terminal-theme');
    if (savedTheme && terminalThemes[savedTheme]) {
        const theme = terminalThemes[savedTheme];
        applyTerminalTheme(theme);
        const terminalTheme = document.getElementById('terminalTheme');
        if (terminalTheme) terminalTheme.value = savedTheme;
    }
    
    // Load saved neon intensity
    const savedIntensity = localStorage.getItem('neon-intensity');
    if (savedIntensity) {
        document.documentElement.style.setProperty('--neon-intensity', savedIntensity);
        const neonIntensity = document.getElementById('neonIntensity');
        if (neonIntensity) {
            neonIntensity.value = savedIntensity;
            neonIntensity.nextElementSibling.textContent = `${savedIntensity}%`;
        }
    }
    
    // Load saved colors
    const savedPrimaryColor = localStorage.getItem('terminal-primary-color');
    if (savedPrimaryColor) {
        document.documentElement.style.setProperty('--terminal-green', savedPrimaryColor);
        const primaryColor = document.getElementById('primaryColor');
        if (primaryColor) primaryColor.value = savedPrimaryColor;
    }
    
    const savedAccentColor = localStorage.getItem('terminal-accent-color');
    if (savedAccentColor) {
        document.documentElement.style.setProperty('--terminal-cyan', savedAccentColor);
        const accentColor = document.getElementById('accentColor');
        if (accentColor) accentColor.value = savedAccentColor;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                let width = 0;
                switch(level) {
                    case 'Beginner': width = 25; break;
                    case 'Intermediate': width = 50; break;
                    case 'Advanced': width = 75; break;
                    case 'Expert': width = 100; break;
                }
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Fade in animations
const fadeElements = document.querySelectorAll('.section');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Add typing effect to tagline (optional)
const tagline = document.querySelector('.sidebar-tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
}
