// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.12)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.recommend-card, .vibe-feature, .accommodation-card, .timeline-item, .pricing-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Apply button with date check
const applyButton = document.getElementById('apply-button');
const applyModal = document.getElementById('apply-modal');
const modalClose = document.querySelector('.modal-close');
const modalButton = document.querySelector('.modal-button');

// Check if applications are open (Dec 24, 2024 or later)
function isApplicationOpen() {
    const now = new Date();
    const openDate = new Date('2024-12-24T00:00:00');
    const closeDate = new Date('2024-12-31T00:00:00');
    return now >= openDate && now < closeDate;
}

// Show modal
function showModal() {
    if (applyModal) {
        applyModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Hide modal
function hideModal() {
    if (applyModal) {
        applyModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

if (applyButton) {
    applyButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (isApplicationOpen()) {
            // TODO: Replace with actual Google Form URL
            alert('Google Form으로 이동합니다.\n문의사항은 paul-lab@naver.com으로 연락해주세요.');
        } else {
            showModal();
        }
    });
}

// Modal close events
if (modalClose) {
    modalClose.addEventListener('click', hideModal);
}

if (modalButton) {
    modalButton.addEventListener('click', hideModal);
}

if (applyModal) {
    applyModal.addEventListener('click', (e) => {
        if (e.target === applyModal) {
            hideModal();
        }
    });
}

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideModal();
    }
});

// Bottom CTA hide when at apply section
const bottomCta = document.querySelector('.bottom-cta');
const applySection = document.getElementById('apply');

if (bottomCta && applySection) {
    const applySectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bottomCta.style.transform = 'translateY(100%)';
            } else {
                bottomCta.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    applySectionObserver.observe(applySection);
}

// Console welcome message
console.log('%c바이브 사계에 오신 것을 환영합니다!', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%c제주 사계에서 4박 5일, AI와 함께 나만의 서비스를 만들어보세요.', 'color: #2E6FF2; font-size: 14px;');

// Gallery Slider
(function() {
    const gallerySlider = document.querySelector('.gallery-slider');
    if (!gallerySlider) return;

    const tabs = gallerySlider.querySelectorAll('.gallery-tab');
    const allSlides = gallerySlider.querySelectorAll('.gallery-slides');
    const prevBtn = gallerySlider.querySelector('.gallery-prev');
    const nextBtn = gallerySlider.querySelector('.gallery-next');
    const dotsContainer = gallerySlider.querySelector('.gallery-dots');

    let currentCategory = 'exterior';
    let currentSlideIndex = 0;

    // Initialize dots for current category
    function initDots() {
        const activeSlides = gallerySlider.querySelector(`.gallery-slides[data-category="${currentCategory}"]`);
        const slides = activeSlides.querySelectorAll('.gallery-slide');

        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Update dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }

    // Show slide
    function showSlide(index) {
        const activeSlides = gallerySlider.querySelector(`.gallery-slides[data-category="${currentCategory}"]`);
        const slides = activeSlides.querySelectorAll('.gallery-slide');

        if (index >= slides.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlideIndex);
        });

        updateDots();
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    // Next slide
    function nextSlide() {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }

    // Previous slide
    function prevSlide() {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }

    // Tab click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show correct slides
            allSlides.forEach(slides => {
                if (slides.dataset.category === category) {
                    slides.style.display = 'block';
                } else {
                    slides.style.display = 'none';
                }
            });

            // Reset to first slide
            currentCategory = category;
            currentSlideIndex = 0;
            initDots();
            showSlide(0);
        });
    });

    // Arrow buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Initialize
    initDots();
})();
