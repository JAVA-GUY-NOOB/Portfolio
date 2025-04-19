try {
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
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill all fields', 'error');
                return;
            }

            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                showToast('Please enter a valid email', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await axios.post('https://formspree.io/f/your-real-form-id', {
                    name,
                    email,
                    message
                });

                if (response.status === 200) {
                    showToast('Message sent successfully!');
                    contactForm.reset();
                } else {
                    showToast('Error sending message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('Error sending message. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });

        // Real-time validation with visual feedback
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() === '') {
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                    if (input.type === 'email' && !input.checkValidity()) {
                        input.classList.add('invalid');
                    }
                }
            });
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

        // GSAP animations for welcome content
        gsap.from('.welcome-content h1', { 
            duration: 1, 
            y: -50, 
            opacity: 0, 
            ease: 'power2.out' 
        });

        gsap.from('.welcome-content p', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.5 
        });

        gsap.from('.cta-pulse', { 
            duration: 1, 
            scale: 0.8, 
            opacity: 0, 
            ease: 'elastic.out(1, 0.3)', 
            delay: 1 
        });

        // Show dialog
        const dialog = document.querySelector('sl-dialog');
        dialog.show();

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Toggle mobile menu
        document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Scroll Progress Indicator
        const scrollProgress = document.querySelector('.scroll-progress');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;

            if (scrollPercent === 100) {
                scrollProgress.style.background = 'green';
            } else {
                scrollProgress.style.background = 'var(--accent-color)';
            }
        });

        // Enhanced particles.js configuration
        particlesJS('particles', {
            particles: {
                number: {
                    value: 80, // Number of particles
                    density: {
                        enable: true,
                        value_area: 800 // Density area
                    }
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'], // Shapes of particles
                    polygon: { nb_sides: 6 } // Number of sides for polygons
                },
                color: { value: '#4eccc4' }, // Particle color
                opacity: {
                    value: 0.5, // Opacity of particles
                    random: false
                },
                size: {
                    value: 5, // Size of particles
                    random: true // Randomize particle size
                },
                links: {
                    enable: true, // Enable links between particles
                    distance: 150, // Distance for linking
                    color: '#4eccc4', // Link color
                    opacity: 0.4, // Link opacity
                    width: 1 // Link width
                },
                move: {
                    enable: true, // Enable particle movement
                    speed: 2, // Speed of movement
                    direction: 'none', // Movement direction
                    random: false, // Randomize movement
                    straight: false, // Straight movement
                    out_mode: 'out', // Behavior when particles leave the canvas
                    bounce: false // Disable bouncing
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true, // Enable interaction on hover
                        mode: 'repulse' // Repulse particles on hover
                    },
                    onclick: {
                        enable: true, // Enable interaction on click
                        mode: 'push' // Add particles on click
                    }
                },
                modes: {
                    repulse: {
                        distance: 100, // Distance for repulsion
                        duration: 0.4 // Duration of repulsion
                    },
                    push: {
                        particles_nb: 4 // Number of particles added on click
                    }
                }
            },
            retina_detect: true // Enable retina display support
        });
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

    // Dynamic project filtering
    const filterProjects = (tech) => {
        document.querySelectorAll('.project-card').forEach(card => {
            const matches = card.textContent.toLowerCase().includes(tech.toLowerCase()) || tech === 'all';
            card.style.display = matches ? 'block' : 'none';
        });

        // Update active filter button
        document.querySelectorAll('.project-filters button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.project-filters button[onclick="filterProjects('${tech}')"]`).classList.add('active');
    };

    // Improved smooth scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100; // Adjust this value based on your header height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Smooth scroll for navigation links and bubbles
    document.querySelectorAll('[data-tab], .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-tab') || link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            const headerOffset = 100; // Adjust this value based on your header height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
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

    // Animate skill progress bars
    const skillsContainer = document.querySelector('.skills-container');
    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            gsap.to(bar, { 
                width: bar.getAttribute('data-width'), 
                duration: 1.5, 
                ease: 'power2.out' 
            });
        });
    };

    const skillBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillBarsObserver.unobserve(skillsContainer); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    skillBarsObserver.observe(skillsContainer);

    // Animate skill bubbles
    const skillBubbles = document.querySelectorAll('.skill-bubble');

    gsap.set(skillBubbles, { opacity: 0, y: 50 });

    const animateSkills = () => {
        gsap.to(skillBubbles, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.disconnect(); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    skillsObserver.observe(document.querySelector('.skills-cloud'));

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

    // Enhanced typewriter effect
    const typeWriter = (elementId, texts, speed = 100) => {
        let currentText = 0;
        let charIndex = 0;
        const element = document.getElementById(elementId);
        let isDeleting = false;
        
        const type = () => {
            const currentString = texts[currentText];
            
            if (!isDeleting && charIndex <= currentString.length) {
                element.textContent = currentString.substring(0, charIndex);
                charIndex++;
                setTimeout(type, speed);
            } else if (isDeleting && charIndex >= 0) {
                element.textContent = currentString.substring(0, charIndex);
                charIndex--;
                setTimeout(erase, speed/2);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) currentText = (currentText + 1) % texts.length;
                setTimeout(type, isDeleting ? 1000 : 500);
            }
        };
        
        type();
    };

    // Initialize typing animation for the welcome screen
    typeWriter('dynamic-text', [
        'Full Stack Developer', 
        'Java Specialist', 
        'Spring Boot Expert', 
        'Cloud Enthusiast'
    ]);

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

    // Improved lazy loading
    const lazyLoad = (targets) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Replace data-src with actual src
                    img.classList.add('fade-in'); // Add fade-in animation
                    observer.unobserve(img); // Stop observing once loaded
                }
            });
        }, { threshold: 0.1, rootMargin: '200px' });

        targets.forEach(target => io.observe(target));
    };

    // Usage: Change <img src="..."> to <img data-src="..." class="lazy">
    lazyLoad(document.querySelectorAll('img.lazy'));

    function createModal(projectData) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${projectData.image}" alt="${projectData.title}">
                <h3>${projectData.title}</h3>
                <p>${projectData.description}</p>
                <div class="modal-links">
                    ${projectData.demoLink ? `<a href="${projectData.demoLink}" target="_blank">Live Demo</a>` : ''}
                    ${projectData.codeLink ? `<a href="${projectData.codeLink}" target="_blank">View Code</a>` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);

        // Close modal on clicking the close button
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());

        // Close modal on clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectData = {
                title: card.querySelector('h3').textContent,
                image: card.querySelector('img')?.src || '',
                description: card.querySelector('p').textContent,
                demoLink: card.querySelector('.demo-link')?.href || '',
                codeLink: card.querySelector('.code-link')?.href || ''
            };
            createModal(projectData);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Add focus styles when Tab is pressed
            document.documentElement.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        // Remove focus styles when using the mouse
        document.documentElement.classList.remove('keyboard-nav');
    });

    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');

    gsap.set(projectCards, { opacity: 0, y: 50 });

    const animateProjectCards = () => {
        gsap.to(projectCards, { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: 'power2.out' 
        });
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                projectObserver.disconnect(); // Stop observing after animation
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => projectObserver.observe(card));

    // Animate contact form on scroll
    const contactFormElement = document.querySelector('.contact-form');

    gsap.set(contactFormElement, { opacity: 0, y: 50 });

    const animateContactForm = () => {
        gsap.to(contactFormElement, { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power2.out' 
        });
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactForm();
                contactObserver.disconnect(); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    contactObserver.observe(contactFormElement);

    // GSAP ScrollToPlugin for smooth scrolling
    gsap.registerPlugin(ScrollToPlugin);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            gsap.to(window, { duration: 1, scrollTo: targetId, ease: 'power2.out' });
        });
    });

    // Fetch and display projects dynamically
    const projectGrid = document.querySelector('.project-grid');
    const loader = document.getElementById('loader');
    
    const fetchProjects = async () => {
        loader.style.display = 'block'; // Show loader before request

        try {
            const response = await axios.get('https://api.example.com/projects');
            const projects = response.data;

            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="lazy">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.demoLink}" class="demo-link" target="_blank" aria-label="Live demo of ${project.title}">Live Demo</a>
                    <a href="${project.codeLink}" class="code-link" target="_blank" aria-label="View source code of ${project.title}">Source Code</a>
                `;
                projectGrid.appendChild(projectCard);
            });

            // Reinitialize lazy loading for dynamically added images
            lazyLoad(document.querySelectorAll('img.lazy'));
        } catch (error) {
            console.error('Error fetching projects:', error);
            showToast('Failed to load projects. Please try again later.', 'error');
        } finally {
            loader.style.display = 'none'; // Hide loader after request
        }
    };

    // Call the function to fetch projects
    fetchProjects();

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
} catch (error) {
    console.error('Portfolio error:', error);
    showToast('Something went wrong. Please refresh.', 'error');

    // Fallback content
    document.getElementById('main-content').classList.remove('hidden');
}