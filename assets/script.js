// QuickStay Hotel Booking Website - Main JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    initializeDarkMode();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeAnimations();
    initializeCarousel();
    initializeLiveClock();
    initializeScrollToTop();
    initializeCouponCopy();
    initializeChatbot();
    initializeLanguageSupport();
    initializeAccessibility();
    initializeCurrencyConverter();
    initializePersonalizedGreeting();
    initializeCounters();
    initializeNewsletter();
    updateLastUpdate();
}

// Dark Mode Toggle Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon(currentTheme);
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeIcon(newTheme);
            
            // Add animation effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

// Update dark mode icon
function updateDarkModeIcon(theme) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Validation and Submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                showContactSuccess();
                contactForm.reset();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Check if field is required
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number.';
        }
    }
    
    // PIN Code validation
    if (field.id === 'pinCode' && value) {
        const pinRegex = /^[1-9][0-9]{5}$/;
        if (!pinRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid 6-digit PIN code.';
        }
    }
    
    // Apply validation result
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error message
function showFieldError(field, message) {
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Validate entire contact form
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show contact form success message
function showContactSuccess() {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert alert before the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .testimonials-section .card, .accordion-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize carousel functionality
function initializeCarousel() {
    // Auto-play carousel with pause on hover
    const carousel = document.querySelector('#roomCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover'
        });
        
        // Add custom indicators
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                carouselInstance.to(index);
            });
        });
    }
}

// Update last update time
function updateLastUpdate() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        lastUpdateElement.textContent = `Last updated: ${timeString}`;
    }
}

// Utility Functions

// Format currency in Indian Rupees
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format date in Indian format
function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle window resize events
window.addEventListener('resize', throttle(function() {
    // Recalculate any layout-dependent elements
    updateResponsiveElements();
}, 250));

// Update responsive elements
function updateResponsiveElements() {
    // Add any responsive layout updates here
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.innerWidth < 768) {
            navbar.classList.add('navbar-compact');
        } else {
            navbar.classList.remove('navbar-compact');
        }
    }
}

// Handle scroll events for navbar effects
window.addEventListener('scroll', throttle(function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
}, 100));

// Live Clock Functionality
function initializeLiveClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        const indianTime = now.toLocaleString('en-IN', options);
        clockElement.textContent = indianTime;
    }
}

// Scroll to Top Functionality
function initializeScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        // Show button when scrolling down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });

        // Smooth scroll to top when clicked
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Coupon Copy Functionality
function initializeCouponCopy() {
    // This will be called by onclick handlers in HTML
    window.copyCoupon = function(couponCode) {
        navigator.clipboard.writeText(couponCode).then(function() {
            showToast(`Coupon code "${couponCode}" copied to clipboard!`, 'success');
        }).catch(function() {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = couponCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast(`Coupon code "${couponCode}" copied to clipboard!`, 'success');
        });
    };
}

// AI Chatbot Functionality
function initializeChatbot() {
    const chatbotButton = document.getElementById('chatbotButton');
    if (chatbotButton) {
        chatbotButton.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('chatbotModal'));
            modal.show();
            initializeChatMessages();
        });
    }
}

function initializeChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length === 0) {
        addChatMessage('bot', 'Hello! I\'m your QuickStay Assistant. How can I help you today? You can ask me about booking, availability, hotel facilities, or anything else!');
    }
}

function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-3 ${sender === 'user' ? 'text-end' : ''}`;
    
    const messageBubble = document.createElement('div');
    messageBubble.className = `d-inline-block p-3 rounded ${sender === 'user' ? 'bg-primary text-white' : 'bg-light'}`;
    messageBubble.style.maxWidth = '80%';
    messageBubble.textContent = message;
    
    messageDiv.appendChild(messageBubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

window.sendChatMessage = function() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        addChatMessage('user', message);
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addChatMessage('bot', botResponse);
        }, 1000);
    }
};

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const responses = {
        'booking': 'To make a booking, please visit our booking page or click the "Book Now" button. You can select your preferred dates, room type, and location.',
        'availability': 'You can check room availability on our availability page. We update our inventory in real-time across all Indian cities.',
        'price': 'Our room prices start from ₹5,000 per night for standard rooms. Premium suites range from ₹12,000 to ₹25,000 per night.',
        'facilities': 'All our hotels feature WiFi, air conditioning, room service, and modern amenities. Premium rooms include breakfast and city views.',
        'cancellation': 'You can cancel your booking up to 24 hours before check-in for a full refund. Please contact our support team for assistance.',
        'payment': 'We accept all major credit cards, debit cards, and digital wallets. Payment is processed securely at the time of booking.',
        'location': 'We have hotels in major Indian cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Jaipur, Kochi, and Goa.',
        'check-in': 'Check-in time is 2:00 PM and check-out is 12:00 PM. Early check-in and late check-out can be arranged based on availability.',
        'breakfast': 'Complimentary breakfast is included with Deluxe rooms and above. Standard rooms can add breakfast for ₹500 per person.',
        'spa': 'Spa services are available at select locations. You can book spa treatments during your stay or add them to your booking.',
        'airport': 'Airport pickup service is available for ₹1,200. Please provide your flight details at least 24 hours in advance.',
        'wifi': 'Free high-speed WiFi is available in all rooms and public areas. No password required for guests.',
        'parking': 'Complimentary parking is available at all our properties. Valet parking service is also available.',
        'restaurant': 'All our hotels feature in-house restaurants serving Indian and international cuisine. Room service is available 24/7.',
        'gym': 'Fitness centers are available at all our properties. Equipment includes treadmills, weights, and yoga mats.',
        'pool': 'Swimming pools are available at select properties. Pool timings are 6:00 AM to 10:00 PM.',
        'rooms': 'We offer 5 types of rooms: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'room types': 'We offer 5 types of rooms: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'accommodation': 'We offer 5 types of rooms: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'stay': 'We offer comfortable stays across India with 5 room types ranging from Standard to Presidential Suite. All rooms include modern amenities and excellent service.',
        'lodging': 'We offer comfortable lodging across India with 5 room types ranging from Standard to Presidential Suite. All rooms include modern amenities and excellent service.',
        'hotel rooms': 'We offer 5 types of hotel rooms: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'types of rooms': 'We offer 5 types of rooms: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'room categories': 'We offer 5 room categories: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'accommodation options': 'We offer 5 accommodation options: Standard (₹5,000), Deluxe (₹8,500), Premium Suite (₹12,000), Executive Suite (₹15,000), and Presidential Suite (₹25,000). All rooms include WiFi, AC, TV, and room service.',
        'help': 'I\'m here to help! You can ask me about booking, availability, hotel facilities, pricing, room types, or any other questions about QuickStay.',
        'hello': 'Hello! Welcome to QuickStay. How can I assist you today?',
        'hi': 'Hi there! I\'m your QuickStay Assistant. What would you like to know?',
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Feel free to ask if you need any more assistance.'
    };
    
    for (const [key, response] of Object.entries(responses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    
    return 'Thank you for your question! I can help you with booking, room types, availability, pricing, facilities, and more. For specific inquiries, please contact our support team at support@quickstay.com or call us at +91-9876543210.';
}

// Language Support Functionality
function initializeLanguageSupport() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('quickstay_language') || 'en';
    changeLanguage(savedLanguage);
}

window.changeLanguage = function(lang) {
    const translations = {
        en: {
            greeting: 'Welcome to QuickStay!',
            bookNow: 'Book Now',
            checkAvailability: 'Check Availability',
            compareRooms: 'Compare Rooms',
            deals: 'Deals & Discounts',
            gallery: 'Our Luxury Rooms',
            testimonials: 'What Our Guests Say',
            faq: 'Frequently Asked Questions',
            contact: 'Contact Us',
            newsletter: 'Stay Updated',
            subscribe: 'Subscribe'
        },
        hi: {
            greeting: 'QuickStay में आपका स्वागत है!',
            bookNow: 'अभी बुक करें',
            checkAvailability: 'उपलब्धता जांचें',
            compareRooms: 'कमरे तुलना करें',
            deals: 'ऑफर और छूट',
            gallery: 'हमारे लक्जरी कमरे',
            testimonials: 'हमारे मेहमान क्या कहते हैं',
            faq: 'अक्सर पूछे जाने वाले प्रश्न',
            contact: 'संपर्क करें',
            newsletter: 'अपडेट रहें',
            subscribe: 'सदस्यता लें'
        },
        ta: {
            greeting: 'QuickStay-க்கு வரவேற்கிறோம்!',
            bookNow: 'இப்போது முன்பதிவு செய்யுங்கள்',
            checkAvailability: 'கிடைக்கும் இடத்தை சரிபார்க்கவும்',
            compareRooms: 'அறைகளை ஒப்பிடுங்கள்',
            deals: 'சலுகைகள் மற்றும் தள்ளுபடிகள்',
            gallery: 'எங்கள் ஆடம்பர அறைகள்',
            testimonials: 'எங்கள் விருந்தினர்கள் என்ன சொல்கிறார்கள்',
            faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
            contact: 'எங்களை தொடர்பு கொள்ளுங்கள்',
            newsletter: 'புதுப்பிப்புகளுடன் இருங்கள்',
            subscribe: 'சந்தா செலுத்துங்கள்'
        },
        te: {
            greeting: 'QuickStay-కి స్వాగతం!',
            bookNow: 'ఇప్పుడు బుక్ చేయండి',
            checkAvailability: 'అందుబాటులో ఉన్నది తనిఖీ చేయండి',
            compareRooms: 'గదులను పోల్చండి',
            deals: 'ఆఫర్లు మరియు తగ్గింపులు',
            gallery: 'మా లగ్జరీ గదులు',
            testimonials: 'మా అతిథులు ఏమి చెబుతున్నారు',
            faq: 'తరచుగా అడిగే ప్రశ్నలు',
            contact: 'మమ్మల్ని సంప్రదించండి',
            newsletter: 'నవీకరణలతో ఉండండి',
            subscribe: 'చందా చెల్లించండి'
        }
    };
    
    const currentLang = translations[lang];
    if (currentLang) {
        // Update navigation
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentLang[key]) {
                element.textContent = currentLang[key];
            }
        });
        
        // Update greeting
        const greetingElement = document.getElementById('personalizedGreeting');
        if (greetingElement) {
            greetingElement.textContent = currentLang.greeting;
        }
        
        // Update language display
        const languageDisplay = document.getElementById('currentLanguage');
        if (languageDisplay) {
            const languageNames = {
                'en': 'English',
                'hi': 'हिंदी',
                'ta': 'தமிழ்',
                'te': 'తెలుగు'
            };
            languageDisplay.textContent = languageNames[lang] || 'English';
        }
        
        // Save preference
        localStorage.setItem('quickstay_language', lang);
    }
};

// Accessibility Functionality
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) modalInstance.hide();
            });
        }
    });
}

window.increaseFontSize = function() {
    const currentSize = parseInt(localStorage.getItem('quickstay_fontSize') || '16');
    const newSize = Math.min(currentSize + 2, 24);
    document.documentElement.style.fontSize = newSize + 'px';
    localStorage.setItem('quickstay_fontSize', newSize);
    showToast('Font size increased', 'info');
};

window.decreaseFontSize = function() {
    const currentSize = parseInt(localStorage.getItem('quickstay_fontSize') || '16');
    const newSize = Math.max(currentSize - 2, 12);
    document.documentElement.style.fontSize = newSize + 'px';
    localStorage.setItem('quickstay_fontSize', newSize);
    showToast('Font size decreased', 'info');
};

window.toggleHighContrast = function() {
    const body = document.body;
    const isHighContrast = body.classList.toggle('high-contrast');
    localStorage.setItem('quickstay_highContrast', isHighContrast);
    showToast(isHighContrast ? 'High contrast enabled' : 'High contrast disabled', 'info');
};

// Currency Converter Functionality
function initializeCurrencyConverter() {
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('quickstay_currency') || 'INR';
    changeCurrency(savedCurrency);
}

window.changeCurrency = function(currency) {
    const exchangeRate = 83; // 1 USD = 83 INR
    const currencySymbols = { 'INR': '₹', 'USD': '$' };
    
    // Update currency display
    const currencyDisplay = document.getElementById('currentCurrency');
    if (currencyDisplay) {
        currencyDisplay.textContent = currencySymbols[currency];
    }
    
    // Update all price displays
    const priceElements = document.querySelectorAll('[data-price-inr]');
    priceElements.forEach(element => {
        const inrPrice = parseFloat(element.getAttribute('data-price-inr'));
        if (currency === 'USD') {
            const usdPrice = (inrPrice / exchangeRate).toFixed(2);
            element.textContent = `$${usdPrice}`;
        } else {
            element.textContent = `₹${inrPrice.toLocaleString()}`;
        }
    });
    
    // Save preference
    localStorage.setItem('quickstay_currency', currency);
    showToast(`Currency changed to ${currency}`, 'info');
};

// Personalized Greeting Functionality
function initializePersonalizedGreeting() {
    const greetingElement = document.getElementById('personalizedGreeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'Welcome to QuickStay!';
        
        if (hour < 12) {
            greeting = 'Good Morning! Welcome to QuickStay!';
        } else if (hour < 17) {
            greeting = 'Good Afternoon! Welcome to QuickStay!';
        } else {
            greeting = 'Good Evening! Welcome to QuickStay!';
        }
        
        greetingElement.textContent = greeting;
    }
}

// Animated Counters Functionality
function initializeCounters() {
    const counters = [
        { id: 'roomsBooked', target: 15420, duration: 2000 },
        { id: 'happyGuests', target: 12500, duration: 2000 },
        { id: 'citiesServed', target: 8, duration: 1000 },
        { id: 'averageRating', target: 4.8, duration: 1500 }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.id === entry.target.id);
                if (counter && !entry.target.classList.contains('animated')) {
                    animateCounter(entry.target, counter.target, counter.duration);
                    entry.target.classList.add('animated');
                }
            }
        });
    });
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            observer.observe(element);
        }
    });
}

function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.id === 'averageRating') {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Newsletter Functionality
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            
            if (email) {
                // Save to localStorage (simulating subscription)
                const subscriptions = JSON.parse(localStorage.getItem('quickstay_newsletter') || '[]');
                if (!subscriptions.includes(email)) {
                    subscriptions.push(email);
                    localStorage.setItem('quickstay_newsletter', JSON.stringify(subscriptions));
                }
                
                showToast('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
            }
        });
    }
}

// Export functions for use in other scripts
window.QuickStay = {
    formatCurrency,
    formatDate,
    showToast,
    debounce,
    throttle,
    copyCoupon,
    changeLanguage,
    changeCurrency,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    sendChatMessage
}; 