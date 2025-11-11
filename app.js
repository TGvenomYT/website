// Projects Data
const projectsData = [
  {
    "category": "AI/ML",
    "title": "Conversational AI with RAG",
    "description": "Developed a conversational AI system using Retrieval-Augmented Generation (RAG) to provide accurate and context-aware responses. Integrated with ChromaDB for efficient vector storage and retrieval.",
    "icon": "🤖",
    "stats": "Python, PyTorch, Transformers, ChromaDB",
    "examples": ["GitHub Repo", "Demo Video"]
  },
  {
    "category": "AI/ML",
    "title": "Image Classification with Transformers",
    "description": "Built and trained a vision transformer model for high-accuracy image classification. Utilized Hugging Face for pre-trained models and fine-tuning.",
    "icon": "🖼️",
    "stats": "Python, PyTorch, Hugging Face",
    "examples": ["GitHub Repo", "Dataset"]
  },
  {
    "category": "AI Automation",
    "title": "Automated Content Generation",
    "description": "Created an automated workflow with n8n to generate content using Ollama models. The system fetches data, processes it, and generates human-like text.",
    "icon": "⚙️",
    "stats": "n8n, Ollama, Python",
    "examples": ["Workflow Demo", "Generated Content"]
  },
  {
    "category": "Data Engineering",
    "title": "Data Pipeline for ML",
    "description": "Designed and implemented a data pipeline using SQL and Python to collect, clean, and prepare data for machine learning models.",
    "icon": "📊",
    "stats": "Python, SQL, Pandas",
    "examples": ["GitHub Repo", "Schema Diagram"]
  }
];

// Skills Data
const skillsData = [
  {
    "label": "Python",
    "value": "95",
    "unit": "%",
    "year": "PyTorch"
  },
  {
    "label": "SQL",
    "value": "90",
    "unit": "%",
    "year": "Database Management"
  },
  {
    "label": "Transformers",
    "value": "85",
    "unit": "%",
    "year": "Hugging Face"
  },
  {
    "label": "RAG",
    "value": "80",
    "unit": "%",
    "year": "ChromaDB"
  }
];

// Experience Data
const experienceData = [
  {
    "year": "Present",
    "title": "School Education",
    "description": "Currently pursuing school education with a strong focus on science and mathematics, building a solid foundation for future studies in technology."
  },
  {
    "year": "2021 - Present",
    "title": "AI/ML Enthusiast & Self-Learner",
    "description": "Actively engaged in self-learning and personal projects in AI/ML. Explored various frameworks like PyTorch, applied concepts of RAG and Transformers, and utilized tools like Hugging Face and Ollama."
  },
  {
    "year": "Prior to 2021",
    "title": "Foundational Studies",
    "description": "Completed foundational coursework in programming (Python), mathematics, and basic data science concepts, building a strong base for advanced studies."
  }
];

class PortfolioWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupCustomCursor();
    this.setupScrollProgress();
    this.setupSmoothScrolling();
    this.setupTypingAnimation();
    this.populateProjects();
    this.populateSkills();
    this.populateExperience();
    this.setupScrollAnimations();
    this.setupForms();
    this.setupParticles();
  }

  // Custom Cursor
  setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor || !cursorTrail) return;

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
      }, 100);
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('button, a, .demo-card, .application-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.2)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
      });
    });
  }

  // Scroll Progress Indicator
  setupScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      
      progressBar.style.transform = `scaleX(${scrollProgress / 100})`;
    });
  }

  // Smooth Scrolling Navigation
  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('[data-scroll]');
    
    [...navLinks, ...heroButtons].forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href') || `#${link.dataset.scroll}`;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Typing Animation
  setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const words = typingElement.dataset.words.split(',');
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
          setTimeout(typeWriter, 500);
          return;
        }
      } else {
        typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(typeWriter, 2000);
          return;
        }
      }
      
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    };

    typeWriter();
  }

  // Scroll Animations using Intersection Observer
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Special handling for different elements
          if (entry.target.classList.contains('application-card')) {
            this.animateApplicationCard(entry.target);
          }
          
          if (entry.target.classList.contains('stat-card')) {
            this.animateStatCard(entry.target);
          }
          
          if (entry.target.classList.contains('timeline-item')) {
            this.animateTimelineItem(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.application-card, .demo-card, .stat-card, .timeline-item');
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  animateApplicationCard(card) {
    const icon = card.querySelector('.app-icon');
    if (icon) {
      setTimeout(() => {
        icon.style.animation = 'bounce 0.6s ease';
      }, 200);
    }
  }

  animateStatCard(card) {
    const number = card.querySelector('.stat-number');
    if (number) {
      const target = parseInt(number.textContent);
      this.animateCounter(number, 0, target, 2000);
    }
    
    const progressRing = card.querySelector('.progress-ring');
    if (progressRing) {
      setTimeout(() => {
        this.animateProgressRing(progressRing);
      }, 200);
    }
  }

  animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    if (content) {
      setTimeout(() => {
        content.style.transform = 'scale(1.02)';
        setTimeout(() => {
          content.style.transform = 'scale(1)';
        }, 200);
      }, 300);
    }
  }

  // Counter Animation
  animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Progress Ring Animation
  animateProgressRing(ring) {
    const progressBar = ring.querySelector('.progress-bar');
    const percentage = ring.dataset.percentage;
    const circumference = 2 * Math.PI * 52; // radius is 52
    
    progressBar.style.strokeDasharray = circumference;
    progressBar.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
      const offset = circumference - (percentage / 100) * circumference;
      progressBar.style.strokeDashoffset = offset;
    }, 500);
  }

  // Populate Projects
  populateProjects() {
    const grid = document.getElementById('applicationsGrid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(app => `
      <div class="application-card">
        <div class="app-icon">${app.icon}</div>
        <h3 class="app-title">${app.title}</h3>
        <p class="app-description">${app.description}</p>
        <div class="app-stats">${app.stats}</div>
        <div class="app-examples">
          ${app.examples.map(example => `<span class="app-example">${example}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Populate Skills
  populateSkills() {
    const grid = document.getElementById('statsGrid');
    if (!grid) return;

    grid.innerHTML = skillsData.map(stat => `
      <div class="stat-card">
        <div class="progress-ring" data-percentage="${stat.value}">
          <svg>
            <circle class="progress-bg" cx="60" cy="60" r="52"></circle>
            <circle class="progress-bar" cx="60" cy="60" r="52"></circle>
          </svg>
        </div>
        <span class="stat-number">${stat.value}</span>
        <span class="stat-unit">${stat.unit}</span>
        <div class="stat-label">${stat.label}</div>
        <div class="stat-year">${stat.year}</div>
      </div>
    `).join('');
  }

  // Populate Experience
  populateExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = experienceData.map(item => `
      <div class="timeline-item">
        <div class="timeline-content">
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-description">${item.description}</p>
        </div>
        <div class="timeline-year">${item.year}</div>
      </div>
    `).join('');
  }

  // Setup Forms
  setupForms() {
    this.setupContactForm();
    this.setupNewsletterForm();
    this.setupFloatingLabels();
  }

  setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const button = form.querySelector('button[type="submit"]');
      const buttonText = button.querySelector('.btn-text');
      const buttonSpinner = button.querySelector('.btn-spinner');
      
      buttonText.classList.add('hidden');
      buttonSpinner.classList.remove('hidden');
      button.disabled = true;
      
      setTimeout(() => {
        buttonText.classList.remove('hidden');
        buttonSpinner.classList.add('hidden');
        button.disabled = false;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<span class="success-icon">✓</span><span>Message sent successfully!</span>';
        form.appendChild(successMessage);
        
        form.reset();
        
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }, 2000);
    });
  }

  setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const button = form.querySelector('button');
      const successMessage = form.parentElement.querySelector('.success-message');
      
      button.textContent = 'Subscribing...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Subscribe';
        button.disabled = false;
        form.reset();
        successMessage.classList.remove('hidden');
        
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 3000);
      }, 1500);
    });
  }

  setupFloatingLabels() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
      // Add placeholder attribute for CSS selector
      if (!input.placeholder) {
        input.placeholder = ' ';
      }
      
      input.addEventListener('focus', () => {
        const label = input.nextElementSibling;
        if (label && label.classList.contains('floating-label')) {
          label.style.color = '#00D4FF';
        }
      });
      
      input.addEventListener('blur', () => {
        const label = input.nextElementSibling;
        if (label && label.classList.contains('floating-label')) {
          label.style.color = '#94A3B8';
        }
      });
    });
  }

  // Setup Particles
  setupParticles() {
    this.createFloatingParticles();
  }

  createFloatingParticles() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // Create additional floating particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#00D4FF';
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${4 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 4 + 's';
      particle.style.boxShadow = '0 0 10px #00D4FF';
      
      const particles = heroSection.querySelector('.hero-particles');
      if (particles) {
        particles.appendChild(particle);
      }
    }
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioWebsite();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
      } else {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
      }
    });
  }

  // Add hover effects to social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const icon = link.querySelector('.social-icon');
      if (icon) {
        icon.style.animation = 'bounce 0.5s ease';
      }
    });
    
    link.addEventListener('mouseleave', () => {
      const icon = link.querySelector('.social-icon');
      if (icon) {
        icon.style.animation = 'none';
      }
    });
  });

  // Add parallax effect to hero visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      heroVisual.style.transform = `translateY(${parallax}px)`;
    });
  }

  // Add stagger animation to application cards
  const appCards = document.querySelectorAll('.application-card');
  appCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

