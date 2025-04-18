document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enter-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    // Handle "View Portfolio" button click
    enterButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Add event listener to toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme); // Save the theme preference
    });

    // Tab Functionality
    const tabs = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const activateTab = (tabId) => {
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        document.getElementById('live-region').textContent = `Now viewing ${tabId} section`;
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.dataset.tab;
            activateTab(tabId);
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formspree.io/f/your-real-form-id', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showToast('Message sent successfully!');
                contactForm.reset();
            } else {
                showToast('Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Error sending message. Please try again.', 'error');
        }
    });

    // Initial activation
    activateTab('about');

    // Initialize the skills radar chart
    initSkillsChart();

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialize typing animation for the welcome screen
    typeWriter('dynamic-text', ['Full Stack Developer', 'Web Enthusiast', 'Problem Solver']);
});
// Handle bubble navigation
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
        const targetId = bubble.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Handle section button clicks
document.querySelectorAll('.section-btn').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Add ripple effect to bubbles
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        // Position ripple
        const rect = bubble.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        // Add to bubble
        this.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 10}deg) rotateY(${-(x - rect.width / 2) / 10}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});
// Animated scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Smooth scroll for navigation links and bubbles
document.querySelectorAll('[data-tab], .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-tab') || link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Skills radar chart
const initSkillsChart = () => {
    const ctx = document.getElementById('skills-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['React', 'Node.js', 'UI/UX', 'AWS', 'Python', 'SQL', 'Docker'],
            datasets: [{
                label: 'Technical Skills',
                data: [95, 85, 90, 75, 80, 70, 65],
                backgroundColor: 'rgba(78, 205, 196, 0.2)',
                borderColor: 'rgba(78, 205, 196, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(78, 205, 196, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    ticks: { display: false }
                }
            }
        }
    });
};
// Service Worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => {
            console.error('Service Worker registration failed:', err);
            showToast('Offline support is unavailable. Please check your connection.', 'error');
        });
}

// Toast notification
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// Real-time typing animation
const typeWriter = (elementId, texts, speed = 100) => {
    let currentText = 0;
    let charIndex = 0;
    const element = document.getElementById(elementId);
    
    const type = () => {
        if (charIndex < texts[currentText].length) {
            element.innerHTML += texts[currentText].charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        } else {
            setTimeout(erase, 2000);
        }
    };
    
    const erase = () => {
        if (charIndex > 0) {
            element.innerHTML = texts[currentText].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, speed/2);
        } else {
            currentText = (currentText+1) % texts.length;
            setTimeout(type, 500);
        }
    };
    
    type();
};

// Initialize typing animation for the welcome screen
typeWriter('dynamic-text', ['Web Developer', 'UI Specialist', 'Full Stack Engineer']);

// Hide loader after page load
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// Lazy loading for sections
const lazySections = document.querySelectorAll('.tab-content');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

lazySections.forEach(section => observer.observe(section));