document.addEventListener('DOMContentLoaded', () => {
    // Welcome Screen
    const enterButton = document.getElementById('enter-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    
    enterButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.toggleAttribute('data-theme');
        themeToggle.textContent = document.documentElement.hasAttribute('data-theme') ? '☀️' : '🌙';
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

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Message sent successfully!');
        contactForm.reset();
    });

    // Initial activation
    activateTab('about');
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

// Skills radar chart
const initSkillsChart = () => {
    const ctx = document.getElementById('skills-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['React', 'Node.js', 'UI/UX', 'AWS', 'Python'],
            datasets: [{
                label: 'Technical Skills',
                data: [95, 85, 90, 75, 80],
                backgroundColor: 'rgba(78, 205, 196, 0.2)'
            }]
        }
    });
};
// Service Worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('SW registration failed'));
}

// Form submission with Fetch API
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            body: formData,
            headers: {'Accept': 'application/json'}
        });
        
        if (response.ok) {
            showToast('Message sent successfully!');
            contactForm.reset();
        }
    } catch (error) {
        showToast('Error sending message. Please try again.');
    }
});
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

// Initialize in DOMContentLoaded:
typeWriter('dynamic-text', ['Web Developer', 'UI Specialist', 'Full Stack Engineer']);