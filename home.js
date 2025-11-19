// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

// Create overlay for mobile nav
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

// Search toggle
searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('active');
});

// Handle search on mobile
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');

searchBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        searchContainer.querySelector('input').style.display = 'block';
        searchContainer.style.width = '100%';
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('nav-open');
});

// Close mobile menu when clicking overlay
overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('nav-open');
});

// Handle mobile dropdown menus
const dropdownLinks = document.querySelectorAll('.nav-link');

dropdownLinks.forEach(link => {
    if (link.querySelector('i')) { // Only for links with dropdowns
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = link.nextElementSibling;
                const isExpanded = dropdown.style.maxHeight;
                
                // Close all other dropdowns first
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== link && otherLink.nextElementSibling) {
                        otherLink.nextElementSibling.style.maxHeight = null;
                        otherLink.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                link.classList.toggle('active');
                dropdown.style.maxHeight = isExpanded ? null : `${dropdown.scrollHeight}px`;
            }
        });
    }
});

// Reset mobile menu state on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('nav-open');
        
        // Reset all dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.style.maxHeight = null;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }
});

// Hero Slider functionality
const slider = {
  container: document.querySelector('.redirect-list'),
  items: document.querySelectorAll('.redirect-item'),
  dotsContainer: document.querySelector('.redirect-dots'),
  prevBtn: document.querySelector('.prev-btn'),
  nextBtn: document.querySelector('.next-btn'),
  currentIndex: 0,
  totalItems: document.querySelectorAll('.redirect-item').length,
  autoPlayInterval: null,
  autoPlayDelay: 5000, // 5 seconds
};

// Initialize dots
slider.items.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  slider.dotsContainer.appendChild(dot);
});

function updateDots(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function goToSlide(index) {
  slider.currentIndex = index;
  const offset = -index * 100;
  slider.container.style.transform = `translateX(${offset}%)`;
  updateDots(index);
}

function nextSlide() {
  slider.currentIndex = (slider.currentIndex + 1) % slider.totalItems;
  goToSlide(slider.currentIndex);
}

function prevSlide() {
  slider.currentIndex = (slider.currentIndex - 1 + slider.totalItems) % slider.totalItems;
  goToSlide(slider.currentIndex);
}

// Event listeners for buttons
slider.nextBtn.addEventListener('click', nextSlide);
slider.prevBtn.addEventListener('click', prevSlide);

// Auto play functionality
function startAutoPlay() {
  if (slider.autoPlayInterval) return;
  slider.autoPlayInterval = setInterval(nextSlide, slider.autoPlayDelay);
}

function stopAutoPlay() {
  if (slider.autoPlayInterval) {
    clearInterval(slider.autoPlayInterval);
    slider.autoPlayInterval = null;
  }
}

// Start/Stop autoplay on hover
const sliderWrapper = document.querySelector('.redirect-wrapper');
sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
sliderWrapper.addEventListener('mouseleave', startAutoPlay);

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.container.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  stopAutoPlay();
}, { passive: true });

slider.container.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

slider.container.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  const difference = touchStartX - touchEndX;
  
  if (Math.abs(difference) > 50) { // Minimum swipe distance
    if (difference > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
  
  startAutoPlay();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Initialize autoplay
startAutoPlay();


