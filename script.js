/* ============================================
   PORTFOLIO WEBSITE - Linux Terminal Theme
   JavaScript - Terminal-style Interactive Features
   ============================================ */

// GitHub Configuration
const GITHUB_USERNAME = 'PiRATEO1';

// Terminal Command Line
const terminalCommands = {
    'help': 'Available commands: help, skills, projects, contact, clear',
    'skills': 'Navigate to #skills section to view my technical skills',
    'projects': 'Navigate to #projects section to view my GitHub projects',
    'contact': 'Email: example@email.com | GitHub: PiRATEO1',
    'clear': 'Clearing terminal...',
    'whoami': 'Saurabh Raj - App Developer | Open Source Enthusiast | Problem Solver',
    'ls': 'sections: Home Skills Experience Projects Training Certifications Achievements Education',
    'uname': 'Linux portfolio 1.0.0 #1 SMP x86_64 GNU/Linux',
};

// ============================================
// TERMINAL BOOT SEQUENCE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c Portfolio System Initialized ', 'background: #00ff41; color: #0a0a0a; font-size: 14px; padding: 5px;');
    console.log('%c Welcome to Saurabh Raj Portfolio ', 'color: #00d4ff;');
});

// ============================================
// NAVIGATION - Terminal Style
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
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

// ============================================
// TYPING EFFECT - Terminal Style
// ============================================

const typedText = document.querySelector('.typed-text');
const phrases = [
    'Software Developer',
    'CyberSecurity Enthusiast',
    'Problem Solver',
    'Tech Explorer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', typeEffect);

// ============================================
// SCROLL ANIMATIONS
// ============================================

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add reveal class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
});

// Trigger initial reveal
setTimeout(reveal, 500);

// ============================================
// SKILL CARDS HOVER ANIMATION
// ============================================

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const progress = card.querySelector('.skill-progress');
        if (progress) {
            progress.style.animation = 'none';
            progress.offsetHeight; // Trigger reflow
            progress.style.animation = 'loadProgress 2s ease forwards';
        }
    });
});

// ============================================
// GITHUB API INTEGRATION
// ============================================

async function fetchGitHubData() {
    const projectsGrid = document.getElementById('projects-grid');
    const repoCount = document.getElementById('repo-count');
    const starCount = document.getElementById('star-count');
    const forkCount = document.getElementById('fork-count');
    
    try {
        // Fetch user repos
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
        
        if (!reposResponse.ok) {
            throw new Error('Failed to fetch GitHub data');
        }
        
        const repos = await reposResponse.json();
        
        // Calculate stats
        let totalStars = 0;
        let totalForks = 0;
        
        repos.forEach(repo => {
            totalStars += repo.stargazers_count || 0;
            totalForks += repo.forks_count || 0;
        });
        
        // Update stats with animation
        animateCounter(repoCount, repos.length);
        animateCounter(starCount, totalStars);
        animateCounter(forkCount, totalForks);
        
        // Display repositories
        if (repos.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <p>> No public repositories found.</p>
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn btn-primary">
                        Visit GitHub Profile
                    </a>
                </div>
            `;
            return;
        }
        
        // Clear loading state
        projectsGrid.innerHTML = '';
        
        // Display each repo
        repos.forEach((repo, index) => {
            const projectCard = createProjectCard(repo, index);
            projectsGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p>> Unable to load projects from GitHub.</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn btn-primary">
                    View GitHub Profile
                </a>
            </div>
        `;
    }
}

function createProjectCard(repo, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Get primary language
    const language = repo.language || 'Code';
    const languageColors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'C': '#555555',
        'C#': '#178600',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45'
    };
    
    const langColor = languageColors[language] || '#858585';
    
    // Get repo description
    const description = repo.description || 'No description available';
    
    // Format date
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
    });
    
    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${description}</p>
        <div class="project-stats">
            <span><i class="fas fa-star"></i> ${repo.stargazers_count || 0}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count || 0}</span>
            <span><i class="fas fa-clock"></i> ${updatedDate}</span>
        </div>
        <div class="project-tags">
            <span style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="width: 10px; height: 10px; background: ${langColor}; border-radius: 0;"></span>
                ${language}
            </span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="project-link">
            View Project <i class="fas fa-arrow-right"></i>
        </a>
    `;
    
    // Add click animation
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-link')) {
            window.open(repo.html_url, '_blank');
        }
    });
    
    return card;
}

function animateCounter(element, target) {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// ============================================
// TIMELINE ANIMATION
// ============================================

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ============================================
// CERTIFICATE VERIFICATION TOAST
// ============================================

const verifyButtons = document.querySelectorAll('.verify-btn');
verifyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        // Only show "coming soon" if href is "#" or empty
        if (href === '#' || !href) {
            e.preventDefault();
            showToast('Certificate verification feature coming soon!');
        }
        // Otherwise, let the link work normally (open in new tab if target="_blank")
    });
});

function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--terminal-bg-light);
        color: var(--terminal-green);
        padding: 1rem 2rem;
        border: 1px solid var(--terminal-green);
        border-radius: 0;
        z-index: 10000;
        font-family: var(--font-terminal);
        animation: slideUp 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    `;
    toast.textContent = '> ' + message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ACHIEVEMENT CARDS ANIMATION
// ============================================

const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// ============================================
// LOAD GITHUB DATA
// ============================================

// Don't auto-fetch GitHub data - use static HTML projects
// document.addEventListener('DOMContentLoaded', () => {
//     fetchGitHubData();
// });

// ============================================
// KEYBOARD NAVIGATION - Terminal Style
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Terminal keyboard shortcuts
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // Focus search or show command palette
        console.log('%c Command Palette ', 'background: #00ff41; color: #0a0a0a');
    }
});

// ============================================
// PERFORMANCE: LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console ASCII Art on load
console.log(`
  ____                  _   
 |  _ \\  _____   __     | |  
 | | | |/ _ \\ \\ / /_____| |___
 | |_| |  __/\\ V /_____| '_ \\
 |____/ \\___| \\_/      | (_) |
                        
  Portfolio v1.0
  Type 'help' for available commands
`);

// ============================================
// INTERACTIVE ANIMATIONS - Scroll Reveal
// ============================================

// Intersection Observer for section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Observe section headers
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header').forEach(header => {
    headerObserver.observe(header);
});

// Observe skill cards
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    skillObserver.observe(card);
});

// Observe timeline items
const timelineScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    timelineScrollObserver.observe(item);
});

// Observe project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotate(0deg)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animationDelay = `${index * 0.1}s`;
    projectObserver.observe(card);
});

// Observe stat cards
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.3 });


document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.5)';
    card.style.animationDelay = `${index * 0.15}s`;
    statObserver.observe(card);
});

// Observe training cards
const trainingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });


document.querySelectorAll('.training-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    trainingObserver.observe(card);
});

// Observe certification cards
const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.certification-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    certObserver.observe(card);
});

// Observe achievement cards
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animationDelay = `${index * 0.15}s`;
    achievementObserver.observe(card);
});

// Observe education cards
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    educationObserver.observe(card);
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ============================================
// KEYBOARD SHORTCUT ANIMATIONS
// ============================================

document.addEventListener('keydown', (e) => {
    const sectionMap = {
        '1': '#home',
        '2': '#skills',
        '3': '#experience',
        '4': '#projects',
        '5': '#training',
        '6': '#certifications',
        '7': '#achievements',
        '8': '#education'
    };
    
    if (!e.ctrlKey && !e.altKey && !e.metaKey && sectionMap[e.key]) {
        e.preventDefault();
        document.querySelector(sectionMap[e.key]).scrollIntoView({ behavior: 'smooth' });
    }
    
    if (e.key === 't' || e.key === 'T') {
        document.body.classList.toggle('terminal-mode');
    }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:var(--terminal-green);width:0%;z-index:10000;box-shadow:0 0 10px var(--terminal-glow);';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:var(--terminal-bg-light);border:2px solid var(--terminal-green);color:var(--terminal-green);font-size:1.2rem;cursor:pointer;opacity:0;transform:translateY(50px);transition:all 0.3s ease;z-index:9999;border-radius:0;font-family:var(--font-terminal);';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(50px)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = 'var(--terminal-green)';
    scrollTopBtn.style.color = 'var(--terminal-bg)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = 'var(--terminal-bg-light)';
    scrollTopBtn.style.color = 'var(--terminal-green)';
});

// ============================================
// INTERACTIVE BUTTON RIPPLE EFFECTS
// ============================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
    
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.style.cssText = 'position:absolute;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);animation:rippleEffect 0.6s linear;pointer-events:none;';
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleEffect { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(rippleStyle);
