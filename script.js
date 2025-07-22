// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initPortfolioFilter();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
    initModal();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .testimonial-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // Manual slide control
    window.currentSlide = function(index) {
        currentSlide = index - 1;
        showSlide(currentSlide);
    };
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Mohon lengkapi semua field!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid!');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Portfolio modal
function initModal() {
    const modal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');

    // Project data
    const projects = {
        project1: {
            title: 'Rebranding Kafe Lokal',
            category: 'Brand Identity',
            description: 'Mengembangkan identitas brand baru untuk kafe lokal yang ingin tampil lebih modern dan menarik bagi target market milenial. Project ini meliputi desain logo, color palette, typography, dan aplikasi brand pada berbagai media.',
            challenge: 'Kafe ini sebelumnya memiliki identitas yang kurang konsisten dan terkesan kuno. Tantangannya adalah menciptakan brand identity yang fresh namun tetap mempertahankan kehangatan dan kenyamanan yang menjadi ciri khas kafe lokal.',
            solution: 'Saya mengembangkan konsep "Modern Warmth" dengan menggunakan kombinasi warna earth tone dan accent color yang vibrant. Logo dirancang dengan pendekatan minimalis namun tetap friendly, menggunakan custom typography yang mencerminkan karakter modern namun approachable.',
            tools: 'Adobe Illustrator, Adobe Photoshop, Adobe InDesign'
        },
        project2: {
            title: 'Website E-commerce Fashion',
            category: 'Web Design',
            description: 'Merancang website e-commerce yang clean, modern, dan user-friendly untuk brand fashion lokal dengan fokus pada pengalaman berbelanja yang menyenangkan dan conversion rate yang optimal.',
            challenge: 'Brand fashion ini membutuhkan platform online yang dapat menampilkan produk dengan menarik, mudah dinavigasi, dan memberikan pengalaman berbelanja yang seamless dari browsing hingga checkout.',
            solution: 'Saya merancang interface yang clean dengan fokus pada product photography yang besar dan jelas. Implementasi filter yang intuitif, wishlist functionality, dan checkout process yang streamlined. Menggunakan grid system yang responsive untuk optimal viewing di semua device.',
            tools: 'Figma, Adobe XD, HTML/CSS, JavaScript'
        },
        project3: {
            title: 'Ilustrasi Buku Anak',
            category: 'Illustration',
            description: 'Menciptakan serangkaian ilustrasi digital yang colorful dan whimsical untuk buku cerita anak-anak tentang petualangan di hutan. Ilustrasi dirancang untuk menarik perhatian anak-anak dan mendukung narasi cerita.',
            challenge: 'Ilustrasi harus mampu menarik perhatian anak-anak usia 4-8 tahun, mudah dipahami, dan konsisten dalam style visual sepanjang buku. Selain itu, ilustrasi harus mendukung pembelajaran nilai-nilai positif dalam cerita.',
            solution: 'Saya menggunakan style ilustrasi yang friendly dengan karakter-karakter yang expressive dan environment yang rich in detail. Color palette yang bright dan cheerful, dengan komposisi yang dynamic untuk setiap scene. Setiap ilustrasi dirancang untuk storytelling yang kuat.',
            tools: 'Adobe Illustrator, Procreate, Adobe Photoshop'
        },
        project4: {
            title: 'Campaign Visual Media Sosial',
            category: 'Graphic Design',
            description: 'Mengembangkan konsep visual yang konsisten untuk campaign media sosial startup teknologi, termasuk post design, story templates, dan banner ads yang engaging dan on-brand.',
            challenge: 'Startup teknologi ini membutuhkan visual identity yang dapat mengkomunikasikan inovasi dan trustworthiness secara bersamaan. Campaign harus dapat menarik perhatian di feed yang crowded namun tetap professional.',
            solution: 'Saya mengembangkan visual system dengan geometric elements dan modern typography. Menggunakan consistent color scheme dan iconography yang tech-forward. Template dirancang modular sehingga mudah di-adapt untuk berbagai jenis content.',
            tools: 'Adobe Illustrator, Adobe Photoshop, Figma'
        },
        project5: {
            title: 'Logo & Brand Guidelines',
            category: 'Brand Identity',
            description: 'Merancang logo dan brand guidelines lengkap untuk perusahaan konsultan bisnis yang ingin tampil profesional dan terpercaya. Guidelines mencakup penggunaan logo, color palette, typography, dan aplikasi brand.',
            challenge: 'Perusahaan konsultan membutuhkan brand identity yang dapat membangun trust dan credibility. Logo harus versatile untuk berbagai aplikasi dari business card hingga presentation materials.',
            solution: 'Saya merancang logo dengan approach yang clean dan sophisticated, menggunakan typography yang strong dan symbol yang mencerminkan growth dan stability. Brand guidelines dirancang comprehensive dengan clear rules untuk maintain consistency.',
            tools: 'Adobe Illustrator, Adobe InDesign, Adobe Photoshop'
        },
        project6: {
            title: 'Website Portfolio Fotografer',
            category: 'Web Design',
            description: 'Membuat website portfolio yang elegant dan minimalis untuk fotografer wedding dengan fokus pada showcase karya-karya terbaiknya. Design mengutamakan visual impact dan user experience yang smooth.',
            challenge: 'Portfolio fotografer membutuhkan design yang tidak mengalihkan perhatian dari karya foto itu sendiri. Website harus loading dengan cepat meskipun banyak high-resolution images, dan mudah dinavigasi untuk potential clients.',
            solution: 'Saya merancang layout yang minimalis dengan plenty of white space, menggunakan grid system yang flexible untuk showcase foto. Implementasi lazy loading dan image optimization untuk performance. Navigation yang subtle namun intuitive.',
            tools: 'Figma, HTML/CSS, JavaScript, WordPress'
        }
    };

    // Open modal function
    window.openModal = function(projectId) {
        const project = projects[projectId];
        if (project) {
            modalContent.innerHTML = `
                <h2>${project.title}</h2>
                <p class="project-category"><strong>Kategori:</strong> ${project.category}</p>
                <div class="project-image-placeholder">
                    <i class="fas fa-image"></i>
                    <p>Project Image Placeholder</p>
                </div>
                <div class="project-details">
                    <h3>Deskripsi Project</h3>
                    <p>${project.description}</p>
                    
                    <h3>Challenge</h3>
                    <p>${project.challenge}</p>
                    
                    <h3>Solution</h3>
                    <p>${project.solution}</p>
                    
                    <h3>Tools Used</h3>
                    <p>${project.tools}</p>
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

