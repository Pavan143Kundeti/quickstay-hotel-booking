// QuickStay Hotel Booking - Booking Page JavaScript

// Room rates in Indian Rupees
const ROOM_RATES = {
    standard: 5000,
    deluxe: 8500,
    premium: 12000,
    executive: 15000,
    presidential: 25000
};

// GST rate (18%)
const GST_RATE = 0.18;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingPage();
    initializeDarkMode(); // Add dark mode functionality
});

// Initialize booking page functionality
function initializeBookingPage() {
    initializeDatePickers();
    initializeRateCalculation();
    initializeFormValidation();
    initializeBookingSubmission();
    initializeProgressBar();
    initializeScrollToTop();
    initializeServiceAddons();
    initializeAutoFillSuggestions();
    initializeBookingHistory();
    setMinimumDates();
}

// Set minimum dates for check-in and check-out
function setMinimumDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) {
        checkInInput.min = today.toISOString().split('T')[0];
    }
    
    if (checkOutInput) {
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
    }
}

// Initialize date pickers with validation
function initializeDatePickers() {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        // Set check-out minimum date based on check-in selection
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const minCheckOut = new Date(checkInDate);
            minCheckOut.setDate(minCheckOut.getDate() + 1);
            
            checkOutInput.min = minCheckOut.toISOString().split('T')[0];
            
            // If current check-out date is before new minimum, reset it
            if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
                checkOutInput.value = minCheckOut.toISOString().split('T')[0];
            }
            
            calculateRate();
        });
        
        // Recalculate rate when check-out date changes
        checkOutInput.addEventListener('change', function() {
            calculateRate();
        });
    }
}

// Initialize real-time rate calculation
function initializeRateCalculation() {
    const roomTypeSelect = document.getElementById('roomType');
    const guestsSelect = document.getElementById('guests');
    const childrenSelect = document.getElementById('children');
    
    // Add event listeners for rate calculation
    [roomTypeSelect, guestsSelect, childrenSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', calculateRate);
        }
    });
    
    // Initial calculation
    calculateRate();
}

// Calculate and display rate estimation
function calculateRate() {
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = parseInt(document.getElementById('guests').value) || 0;
    const children = parseInt(document.getElementById('children').value) || 0;
    
    // Get room rate
    const roomRate = ROOM_RATES[roomType] || 0;
    
    // Calculate number of nights
    let nights = 0;
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    
    // Calculate base amount
    const baseAmount = roomRate * nights;
    
    // Calculate add-ons cost
    const addonCosts = {
        'breakfast': 500,
        'airport': 1200,
        'spa': 2000
    };
    
    let addonsTotal = 0;
    const selectedAddons = window.selectedAddons || new Set();
    selectedAddons.forEach(addon => {
        addonsTotal += addonCosts[addon] || 0;
    });
    
    // Calculate GST on base amount + add-ons
    const gstAmount = (baseAmount + addonsTotal) * GST_RATE;
    
    // Calculate total
    const totalAmount = baseAmount + addonsTotal + gstAmount;
    
    // Update display
    updateRateDisplay(roomRate, nights, gstAmount, totalAmount, addonsTotal);
    
    // Store calculated values for form submission
    window.bookingData = {
        roomRate,
        nights,
        baseAmount,
        addonsTotal,
        gstAmount,
        totalAmount,
        roomType,
        checkIn,
        checkOut,
        guests,
        children,
        selectedAddons: Array.from(selectedAddons)
    };
}

// Update rate display elements
function updateRateDisplay(roomRate, nights, gstAmount, totalAmount, addonsTotal = 0) {
    const roomRateElement = document.getElementById('roomRate');
    const nightsElement = document.getElementById('nights');
    const gstElement = document.getElementById('gst');
    const totalElement = document.getElementById('totalAmount');
    const addonsElement = document.getElementById('addons');
    
    if (roomRateElement) {
        roomRateElement.textContent = formatCurrency(roomRate);
    }
    
    if (nightsElement) {
        nightsElement.textContent = nights;
    }
    
    if (addonsElement && addonsTotal > 0) {
        addonsElement.textContent = formatCurrency(addonsTotal);
        addonsElement.parentElement.style.display = 'block';
    } else if (addonsElement) {
        addonsElement.parentElement.style.display = 'none';
    }
    
    if (gstElement) {
        gstElement.textContent = formatCurrency(gstAmount);
    }
    
    if (totalElement) {
        totalElement.textContent = formatCurrency(totalAmount);
    }
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        // Add validation to all required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateBookingField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateBookingField(this);
                }
            });
        });
        
        // Special validation for dates
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');
        
        if (checkInInput) {
            checkInInput.addEventListener('change', function() {
                validateDateRange();
            });
        }
        
        if (checkOutInput) {
            checkOutInput.addEventListener('change', function() {
                validateDateRange();
            });
        }
    }
}

// Validate individual booking field
function validateBookingField(field) {
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
    
    // Specific validations
    switch (field.id) {
        case 'guests':
            if (value && (parseInt(value) < 1 || parseInt(value) > 10)) {
                isValid = false;
                errorMessage = 'Number of guests must be between 1 and 10.';
            }
            break;
            
        case 'children':
            if (value && parseInt(value) > 5) {
                isValid = false;
                errorMessage = 'Maximum 5 children allowed.';
            }
            break;
            
        case 'location':
            if (value && value === '') {
                isValid = false;
                errorMessage = 'Please select a location.';
            }
            break;
            
        case 'roomType':
            if (value && value === '') {
                isValid = false;
                errorMessage = 'Please select a room type.';
            }
            break;
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

// Validate date range
function validateDateRange() {
    const checkIn = document.getElementById('checkIn');
    const checkOut = document.getElementById('checkOut');
    
    if (checkIn.value && checkOut.value) {
        const checkInDate = new Date(checkIn.value);
        const checkOutDate = new Date(checkOut.value);
        
        if (checkOutDate <= checkInDate) {
            checkOut.classList.add('is-invalid');
            showFieldError(checkOut, 'Check-out date must be after check-in date.');
            return false;
        } else {
            checkOut.classList.remove('is-invalid');
            checkOut.classList.add('is-valid');
            removeFieldError(checkOut);
        }
        
        // Check if booking is within reasonable range (max 30 days)
        const daysDiff = Math.ceil((checkOutDate - checkInDate) / (1000 * 3600 * 24));
        if (daysDiff > 30) {
            checkOut.classList.add('is-invalid');
            showFieldError(checkOut, 'Maximum booking duration is 30 days.');
            return false;
        }
    }
    
    return true;
}

// Show field error message
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Remove field error message
function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// Initialize booking submission
function initializeBookingSubmission() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateBookingForm()) {
                showBookingConfirmation();
            } else {
                showFormErrors();
            }
        });
    }
}

// Validate entire booking form
function validateBookingForm() {
    const form = document.getElementById('bookingForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Validate all required fields
    requiredFields.forEach(field => {
        if (!validateBookingField(field)) {
            isValid = false;
        }
    });
    
    // Validate date range
    if (!validateDateRange()) {
        isValid = false;
    }
    
    // Check if rate calculation is available
    if (!window.bookingData || window.bookingData.totalAmount <= 0) {
        isValid = false;
        showToast('Please select valid dates and room type.', 'warning');
    }
    
    return isValid;
}

// Show form errors
function showFormErrors() {
    showToast('Please correct the errors in the form before submitting.', 'warning');
    
    // Scroll to first error
    const firstError = document.querySelector('.is-invalid');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
    }
}

// Show booking confirmation modal
function showBookingConfirmation() {
    const bookingData = window.bookingData;
    
    if (!bookingData) {
        showToast('Booking data not available. Please try again.', 'error');
        return;
    }
    
    // Update modal content
    updateBookingModal(bookingData);
    
    // Save booking to localStorage
    saveBookingToHistory(bookingData);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
    
    // Reset form after successful booking
    setTimeout(() => {
        document.getElementById('bookingForm').reset();
        
        // Reset add-ons
        window.selectedAddons = new Set();
        document.querySelectorAll('.addon-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Reset progress bar
        updateProgress();
    }, 1000);
}

function saveBookingToHistory(bookingData) {
    const bookings = JSON.parse(localStorage.getItem('quickstay_bookings') || '[]');
    
    const locationSelect = document.getElementById('location');
    const locationText = locationSelect.options[locationSelect.selectedIndex].text;
    
    const bookingRecord = {
        id: Date.now(),
        location: locationText,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        roomType: getRoomTypeDisplayName(bookingData.roomType),
        guests: bookingData.guests,
        children: bookingData.children,
        totalAmount: formatCurrency(bookingData.totalAmount),
        addons: bookingData.selectedAddons || [],
        bookingDate: new Date().toLocaleDateString('en-IN'),
        status: 'Confirmed'
    };
    
    bookings.unshift(bookingRecord); // Add to beginning of array
    localStorage.setItem('quickstay_bookings', JSON.stringify(bookings));
}

// Update booking modal with booking details
function updateBookingModal(bookingData) {
    const locationSelect = document.getElementById('location');
    const roomTypeSelect = document.getElementById('roomType');
    
    // Get selected location and room type text
    const locationText = locationSelect.options[locationSelect.selectedIndex].text;
    const roomTypeText = roomTypeSelect.options[roomTypeSelect.selectedIndex].text.split(' - ')[0];
    
    // Update modal elements
    document.getElementById('modalLocation').textContent = locationText;
    document.getElementById('modalCheckIn').textContent = formatDate(new Date(bookingData.checkIn));
    document.getElementById('modalCheckOut').textContent = formatDate(new Date(bookingData.checkOut));
    document.getElementById('modalRoomType').textContent = roomTypeText;
    document.getElementById('modalTotal').textContent = formatCurrency(bookingData.totalAmount);
}

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
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
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
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

// Utility function to get room type display name
function getRoomTypeDisplayName(roomType) {
    const displayNames = {
        standard: 'Standard Room',
        deluxe: 'Deluxe Room',
        premium: 'Premium Suite',
        executive: 'Executive Suite',
        presidential: 'Presidential Suite'
    };
    
    return displayNames[roomType] || roomType;
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

// Progress Bar Functionality
function initializeProgressBar() {
    const form = document.getElementById('bookingForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('change', updateProgress);
        input.addEventListener('input', updateProgress);
    });
}

function updateProgress() {
    const form = document.getElementById('bookingForm');
    const requiredFields = form.querySelectorAll('[required]');
    const filledFields = Array.from(requiredFields).filter(field => field.value.trim() !== '');
    const progress = (filledFields.length / requiredFields.length) * 100;
    
    const progressBar = document.getElementById('progressBar');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // Update step indicators
    if (progress <= 33) {
        step1.classList.add('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
    } else if (progress <= 66) {
        step1.classList.remove('active');
        step2.classList.add('active');
        step3.classList.remove('active');
    } else {
        step1.classList.remove('active');
        step2.classList.remove('active');
        step3.classList.add('active');
    }
}

// Coupon Application Functionality
window.applyCoupon = function() {
    const couponCode = document.getElementById('couponCode').value.trim().toUpperCase();
    const validCoupons = {
        'JAIPUR10': { discount: 0.10, description: '10% off for Jaipur bookings' },
        'GOABREAKFAST': { discount: 0.05, description: '5% off + free breakfast in Goa' },
        'BUSINESS15': { discount: 0.15, description: '15% off for business travelers' }
    };
    
    if (validCoupons[couponCode]) {
        const discount = validCoupons[couponCode].discount;
        const baseAmount = window.bookingData ? window.bookingData.baseAmount : 0;
        const discountAmount = baseAmount * discount;
        
        // Update display
        document.getElementById('discountRow').style.display = 'block';
        document.getElementById('discountAmount').textContent = `-${formatCurrency(discountAmount)}`;
        
        // Update total
        const totalAmount = window.bookingData.totalAmount - discountAmount;
        document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
        
        showToast(`Coupon applied! ${validCoupons[couponCode].description}`, 'success');
        
        // Store discount info
        window.bookingData.discountAmount = discountAmount;
        window.bookingData.finalTotal = totalAmount;
    } else {
        showToast('Invalid coupon code. Please try again.', 'warning');
        document.getElementById('discountRow').style.display = 'none';
    }
};

// Travel Guide Functionality
window.showTravelGuide = function() {
    const location = document.getElementById('location').value;
    const travelGuides = {
        'mumbai': {
            title: 'Mumbai Travel Guide',
            content: `
                <h6><i class="fas fa-map-marker-alt text-primary me-2"></i>Best Places to Visit:</h6>
                <ul>
                    <li>Gateway of India</li>
                    <li>Marine Drive</li>
                    <li>Juhu Beach</li>
                    <li>Elephanta Caves</li>
                    <li>Colaba Causeway</li>
                </ul>
                <h6><i class="fas fa-utensils text-primary me-2"></i>Must-Try Food:</h6>
                <ul>
                    <li>Vada Pav</li>
                    <li>Pav Bhaji</li>
                    <li>Bombay Duck Curry</li>
                    <li>Kulfi</li>
                </ul>
                <h6><i class="fas fa-info-circle text-primary me-2"></i>Best Time to Visit:</h6>
                <p>October to March (pleasant weather)</p>
            `
        },
        'delhi': {
            title: 'Delhi Travel Guide',
            content: `
                <h6><i class="fas fa-map-marker-alt text-primary me-2"></i>Best Places to Visit:</h6>
                <ul>
                    <li>Red Fort</li>
                    <li>Qutub Minar</li>
                    <li>India Gate</li>
                    <li>Humayun's Tomb</li>
                    <li>Chandni Chowk</li>
                </ul>
                <h6><i class="fas fa-utensils text-primary me-2"></i>Must-Try Food:</h6>
                <ul>
                    <li>Butter Chicken</li>
                    <li>Chole Bhature</li>
                    <li>Kebabs</li>
                    <li>Dahi Bhalla</li>
                </ul>
                <h6><i class="fas fa-info-circle text-primary me-2"></i>Best Time to Visit:</h6>
                <p>February to April and October to November</p>
            `
        },
        'goa': {
            title: 'Goa Travel Guide',
            content: `
                <h6><i class="fas fa-map-marker-alt text-primary me-2"></i>Best Places to Visit:</h6>
                <ul>
                    <li>Calangute Beach</li>
                    <li>Basilica of Bom Jesus</li>
                    <li>Fort Aguada</li>
                    <li>Dudhsagar Falls</li>
                    <li>Anjuna Flea Market</li>
                </ul>
                <h6><i class="fas fa-utensils text-primary me-2"></i>Must-Try Food:</h6>
                <ul>
                    <li>Fish Curry Rice</li>
                    <li>Prawn Balchao</li>
                    <li>Bebinca</li>
                    <li>Feni (local liquor)</li>
                </ul>
                <h6><i class="fas fa-info-circle text-primary me-2"></i>Best Time to Visit:</h6>
                <p>November to March (peak season)</p>
            `
        }
    };
    
    if (travelGuides[location]) {
        const guide = travelGuides[location];
        document.getElementById('travelGuideContent').innerHTML = `
            <h5 class="text-primary mb-3">${guide.title}</h5>
            ${guide.content}
        `;
        const modal = new bootstrap.Modal(document.getElementById('travelGuideModal'));
        modal.show();
    } else {
        showToast('Please select a city first to view travel guide.', 'info');
    }
};

// Print Receipt Functionality
window.printReceipt = function() {
    const bookingData = window.bookingData;
    if (!bookingData) {
        showToast('No booking data available for printing.', 'warning');
        return;
    }
    
    const receiptWindow = window.open('', '_blank');
    const receiptContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>QuickStay Booking Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .receipt { max-width: 600px; margin: 0 auto; border: 2px solid #333; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
                .details { margin-bottom: 20px; }
                .total { border-top: 2px solid #333; padding-top: 20px; font-weight: bold; }
                .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">
                    <h1>QuickStay Hotels</h1>
                    <p>Booking Confirmation Receipt</p>
                    <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div class="details">
                    <h3>Booking Details:</h3>
                    <p><strong>Location:</strong> ${document.getElementById('modalLocation').textContent}</p>
                    <p><strong>Check-in:</strong> ${document.getElementById('modalCheckIn').textContent}</p>
                    <p><strong>Check-out:</strong> ${document.getElementById('modalCheckOut').textContent}</p>
                    <p><strong>Room Type:</strong> ${document.getElementById('modalRoomType').textContent}</p>
                    <p><strong>Number of Nights:</strong> ${bookingData.nights}</p>
                </div>
                <div class="total">
                    <h3>Payment Summary:</h3>
                    <p>Room Rate: ${formatCurrency(bookingData.roomRate)} × ${bookingData.nights} nights</p>
                    <p>Subtotal: ${formatCurrency(bookingData.baseAmount)}</p>
                    <p>GST (18%): ${formatCurrency(bookingData.gstAmount)}</p>
                    ${bookingData.discountAmount ? `<p>Discount: -${formatCurrency(bookingData.discountAmount)}</p>` : ''}
                    <h4>Total Amount: ${formatCurrency(bookingData.finalTotal || bookingData.totalAmount)}</h4>
                </div>
                <div class="footer">
                    <p>Thank you for choosing QuickStay!</p>
                    <p>For any queries, please contact us at support@quickstay.com</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
};

// Service Add-ons Functionality
function initializeServiceAddons() {
    // Initialize add-ons state
    window.selectedAddons = new Set();
}

window.toggleAddon = function(addonType) {
    const addonElement = event.currentTarget;
    const isSelected = addonElement.classList.contains('selected');
    
    if (isSelected) {
        addonElement.classList.remove('selected');
        window.selectedAddons.delete(addonType);
    } else {
        addonElement.classList.add('selected');
        window.selectedAddons.add(addonType);
    }
    
    // Update rate calculation
    calculateRate();
};

// Auto-fill Suggestions Functionality
function initializeAutoFillSuggestions() {
    const cityInput = document.getElementById('contactCity');
    if (cityInput) {
        cityInput.addEventListener('input', function() {
            showCitySuggestions(this.value);
        });
        
        cityInput.addEventListener('blur', function() {
            setTimeout(() => {
                hideCitySuggestions();
            }, 200);
        });
    }
}

function showCitySuggestions(query) {
    const suggestionsContainer = document.getElementById('citySuggestions');
    if (!suggestionsContainer) return;
    
    const cities = [
        'Mumbai, Maharashtra',
        'Delhi, NCR',
        'Bengaluru, Karnataka',
        'Chennai, Tamil Nadu',
        'Hyderabad, Telangana',
        'Jaipur, Rajasthan',
        'Kochi, Kerala',
        'Goa',
        'Pune, Maharashtra',
        'Ahmedabad, Gujarat',
        'Kolkata, West Bengal',
        'Varanasi, Uttar Pradesh',
        'Amritsar, Punjab',
        'Udaipur, Rajasthan',
        'Jodhpur, Rajasthan'
    ];
    
    const filteredCities = cities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredCities.length > 0 && query.length > 0) {
        suggestionsContainer.innerHTML = '';
        filteredCities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = city;
            item.addEventListener('click', function() {
                document.getElementById('contactCity').value = city;
                hideCitySuggestions();
            });
            suggestionsContainer.appendChild(item);
        });
        suggestionsContainer.style.display = 'block';
    } else {
        hideCitySuggestions();
    }
}

function hideCitySuggestions() {
    const suggestionsContainer = document.getElementById('citySuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Booking History Functionality
function initializeBookingHistory() {
    loadBookingHistory();
}

function loadBookingHistory() {
    const container = document.getElementById('bookingHistoryContainer');
    if (!container) return;
    
    const bookings = JSON.parse(localStorage.getItem('quickstay_bookings') || '[]');
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="text-center">
                <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No bookings found</h5>
                <p class="text-muted">Your booking history will appear here after you make your first reservation.</p>
            </div>
        `;
        return;
    }
    
    let historyHTML = '';
    bookings.forEach((booking, index) => {
        historyHTML += `
            <div class="booking-history-item card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <h5 class="card-title">${booking.location}</h5>
                            <p class="card-text">
                                <strong>Check-in:</strong> ${booking.checkIn} | 
                                <strong>Check-out:</strong> ${booking.checkOut}<br>
                                <strong>Room Type:</strong> ${booking.roomType} | 
                                <strong>Guests:</strong> ${booking.guests}<br>
                                <strong>Total Amount:</strong> ${booking.totalAmount}
                            </p>
                        </div>
                        <div class="col-md-4 text-md-end">
                            <span class="badge bg-success mb-2">Confirmed</span>
                            <br>
                            <small class="text-muted">Booked on ${booking.bookingDate}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = historyHTML;
}

// Scroll to Top Functionality for Booking Page
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

// Export functions for use in other scripts
window.QuickStayBooking = {
    calculateRate,
    formatCurrency,
    formatDate,
    showToast,
    getRoomTypeDisplayName,
    applyCoupon,
    showTravelGuide,
    printReceipt,
    initializeScrollToTop,
    toggleAddon,
    initializeServiceAddons,
    initializeAutoFillSuggestions,
    initializeBookingHistory
}; 