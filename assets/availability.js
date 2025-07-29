// QuickStay Hotel Booking - Availability Page JavaScript

// Sample availability data for Indian cities
const AVAILABILITY_DATA = [
    {
        id: 1,
        hotelName: "QuickStay Mumbai Central",
        city: "mumbai",
        location: "Mumbai, Maharashtra",
        roomType: "standard",
        roomTypeDisplay: "Standard Room",
        price: 5000,
        availability: "available",
        availableRooms: 15,
        totalRooms: 20,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        description: "Comfortable standard room with modern amenities in the heart of Mumbai.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar"]
    },
    {
        id: 2,
        hotelName: "QuickStay Mumbai Central",
        city: "mumbai",
        location: "Mumbai, Maharashtra",
        roomType: "deluxe",
        roomTypeDisplay: "Deluxe Room",
        price: 8500,
        availability: "limited",
        availableRooms: 3,
        totalRooms: 10,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        description: "Spacious deluxe room with city view and premium amenities.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "City View", "Balcony"]
    },
    {
        id: 3,
        hotelName: "QuickStay Delhi Connaught Place",
        city: "delhi",
        location: "Delhi, NCR",
        roomType: "premium",
        roomTypeDisplay: "Premium Suite",
        price: 12000,
        availability: "available",
        availableRooms: 8,
        totalRooms: 12,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        description: "Luxurious premium suite with separate living area and business facilities.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Living Room", "Work Desk", "Coffee Maker"]
    },
    {
        id: 4,
        hotelName: "QuickStay Bengaluru Tech Park",
        city: "bangalore",
        location: "Bengaluru, Karnataka",
        roomType: "executive",
        roomTypeDisplay: "Executive Suite",
        price: 15000,
        availability: "limited",
        availableRooms: 2,
        totalRooms: 8,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        description: "Executive suite perfect for business travelers with conference facilities.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Conference Room", "Business Center", "Gym Access"]
    },
    {
        id: 5,
        hotelName: "QuickStay Chennai Marina",
        city: "chennai",
        location: "Chennai, Tamil Nadu",
        roomType: "standard",
        roomTypeDisplay: "Standard Room",
        price: 5000,
        availability: "booked",
        availableRooms: 0,
        totalRooms: 15,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        description: "Comfortable standard room near Marina Beach with sea breeze.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Beach Access"]
    },
    {
        id: 6,
        hotelName: "QuickStay Hyderabad Hitech City",
        city: "hyderabad",
        location: "Hyderabad, Telangana",
        roomType: "deluxe",
        roomTypeDisplay: "Deluxe Room",
        price: 8500,
        availability: "available",
        availableRooms: 12,
        totalRooms: 18,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        description: "Deluxe room with modern amenities in the IT hub of Hyderabad.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Tech Support"]
    },
    {
        id: 7,
        hotelName: "QuickStay Jaipur Heritage",
        city: "jaipur",
        location: "Jaipur, Rajasthan",
        roomType: "premium",
        roomTypeDisplay: "Premium Suite",
        price: 12000,
        availability: "available",
        availableRooms: 6,
        totalRooms: 10,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        description: "Heritage-style premium suite with traditional Rajasthani decor.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Heritage View", "Cultural Tours"]
    },
    {
        id: 8,
        hotelName: "QuickStay Kochi Backwaters",
        city: "kochi",
        location: "Kochi, Kerala",
        roomType: "presidential",
        roomTypeDisplay: "Presidential Suite",
        price: 25000,
        availability: "limited",
        availableRooms: 1,
        totalRooms: 3,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        description: "Ultimate luxury presidential suite with backwater views and private pool.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Private Pool", "Butler Service", "Helicopter Pad"]
    },
    {
        id: 9,
        hotelName: "QuickStay Goa Beach Resort",
        city: "goa",
        location: "Goa",
        roomType: "deluxe",
        roomTypeDisplay: "Deluxe Room",
        price: 8500,
        availability: "available",
        availableRooms: 20,
        totalRooms: 25,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        description: "Beachfront deluxe room with Portuguese-inspired architecture.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Beach Access", "Water Sports"]
    },
    {
        id: 10,
        hotelName: "QuickStay Goa Beach Resort",
        city: "goa",
        location: "Goa",
        roomType: "premium",
        roomTypeDisplay: "Premium Suite",
        price: 12000,
        availability: "booked",
        availableRooms: 0,
        totalRooms: 8,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        description: "Premium suite with private beach access and ocean views.",
        amenities: ["Wi-Fi", "AC", "TV", "Room Service", "Mini Bar", "Private Beach", "Ocean View", "Spa Access"]
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAvailabilityPage();
    initializeDarkMode(); // Add dark mode functionality
});

// Initialize availability page functionality
function initializeAvailabilityPage() {
    initializeFilters();
    loadAvailabilityData();
    initializeRealTimeUpdates();
    initializeQuickBooking();
    initializeHeatmap();
    initializeScrollToTop();
    initializeCharts();
    updateLastUpdateTime();
}

// Initialize filter functionality
function initializeFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const roomTypeFilter = document.getElementById('roomTypeFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    
    // Add event listeners to filters
    [cityFilter, roomTypeFilter, availabilityFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                filterAvailabilityData();
            });
        }
    });
}

// Load and display availability data
function loadAvailabilityData() {
    const grid = document.getElementById('availabilityGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    
    // Simulate loading delay
    setTimeout(() => {
        displayAvailabilityCards(AVAILABILITY_DATA);
        
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }, 1000);
}

// Display availability cards
function displayAvailabilityCards(data) {
    const grid = document.getElementById('availabilityGrid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (data.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No rooms available matching your criteria. Please try different filters.
                </div>
            </div>
        `;
        return;
    }
    
    data.forEach(room => {
        const card = createAvailabilityCard(room);
        grid.appendChild(card);
    });
    
    // Update heatmap after displaying cards
    updateHeatmap(data);
}

// Create individual availability card
function createAvailabilityCard(room) {
    const col = document.createElement('div');
    col.className = 'col-lg-6 col-xl-4 mb-4';
    
    const availabilityStatus = getAvailabilityStatus(room.availability);
    const statusClass = getStatusClass(room.availability);
    
    col.innerHTML = `
        <div class="card availability-card hover-lift h-100">
            <img src="${room.image}" class="card-img-top" alt="${room.roomTypeDisplay}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${room.hotelName}</h6>
                    <span class="availability-status ${statusClass}">${availabilityStatus}</span>
                </div>
                <p class="text-muted small mb-2">
                    <i class="fas fa-map-marker-alt me-1"></i>${room.location}
                </p>
                <h6 class="text-primary mb-2">${room.roomTypeDisplay}</h6>
                <p class="card-text small mb-3">${room.description}</p>
                
                <div class="row mb-3">
                    <div class="col-6">
                        <strong>Price:</strong><br>
                        <span class="price-display">${formatCurrency(room.price)}/night</span>
                    </div>
                    <div class="col-6">
                        <strong>Available:</strong><br>
                        <span class="text-${room.availability === 'booked' ? 'danger' : 'success'}">
                            ${room.availableRooms}/${room.totalRooms} rooms
                        </span>
                    </div>
                </div>
                
                <div class="mb-3">
                    <strong>Amenities:</strong>
                    <div class="mt-1">
                        ${room.amenities.slice(0, 3).map(amenity => 
                            `<span class="badge bg-light text-dark me-1">${amenity}</span>`
                        ).join('')}
                        ${room.amenities.length > 3 ? 
                            `<span class="badge bg-light text-dark">+${room.amenities.length - 3} more</span>` : 
                            ''
                        }
                    </div>
                </div>
                
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary btn-sm" onclick="showQuickBooking(${room.id})">
                        <i class="fas fa-eye me-1"></i>View Details
                    </button>
                    ${room.availability !== 'booked' ? 
                        `<a href="booking.html" class="btn btn-primary btn-sm">
                            <i class="fas fa-calendar-check me-1"></i>Book Now
                        </a>` : 
                        `<button class="btn btn-secondary btn-sm" disabled>
                            <i class="fas fa-times me-1"></i>Fully Booked
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Get availability status text
function getAvailabilityStatus(availability) {
    const statusMap = {
        'available': 'Available',
        'limited': 'Limited',
        'booked': 'Fully Booked'
    };
    return statusMap[availability] || availability;
}

// Get status CSS class
function getStatusClass(availability) {
    const classMap = {
        'available': 'status-available',
        'limited': 'status-limited',
        'booked': 'status-booked'
    };
    return classMap[availability] || 'status-available';
}

// Filter availability data based on selected filters
function filterAvailabilityData() {
    const cityFilter = document.getElementById('cityFilter').value;
    const roomTypeFilter = document.getElementById('roomTypeFilter').value;
    const availabilityFilter = document.getElementById('availabilityFilter').value;
    
    let filteredData = AVAILABILITY_DATA;
    
    // Apply city filter
    if (cityFilter) {
        filteredData = filteredData.filter(room => room.city === cityFilter);
    }
    
    // Apply room type filter
    if (roomTypeFilter) {
        filteredData = filteredData.filter(room => room.roomType === roomTypeFilter);
    }
    
    // Apply availability filter
    if (availabilityFilter) {
        filteredData = filteredData.filter(room => room.availability === availabilityFilter);
    }
    
    displayAvailabilityCards(filteredData);
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
    // Update availability data every 30 seconds
    setInterval(() => {
        updateAvailabilityData();
        updateLastUpdateTime();
    }, 30000);
}

// Update availability data (simulate real-time changes)
function updateAvailabilityData() {
    // Randomly update some room availability
    AVAILABILITY_DATA.forEach(room => {
        if (Math.random() < 0.1) { // 10% chance of change
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            room.availableRooms = Math.max(0, Math.min(room.totalRooms, room.availableRooms + change));
            
            // Update availability status
            if (room.availableRooms === 0) {
                room.availability = 'booked';
            } else if (room.availableRooms <= 3) {
                room.availability = 'limited';
            } else {
                room.availability = 'available';
            }
        }
    });
    
    // Re-apply current filters
    filterAvailabilityData();
}

// Update last update time
function updateLastUpdateTime() {
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

// Initialize quick booking modal
function initializeQuickBooking() {
    // Make showQuickBooking function globally available
    window.showQuickBooking = function(roomId) {
        const room = AVAILABILITY_DATA.find(r => r.id === roomId);
        if (room) {
            updateQuickBookingModal(room);
            const modal = new bootstrap.Modal(document.getElementById('quickBookingModal'));
            modal.show();
        }
    };
}

// Update quick booking modal with room details
function updateQuickBookingModal(room) {
    const availabilityStatus = getAvailabilityStatus(room.availability);
    const statusClass = getStatusClass(room.availability);
    
    document.getElementById('modalHotelName').textContent = room.hotelName;
    document.getElementById('modalRoomImage').src = room.image;
    document.getElementById('modalRoomType').textContent = room.roomTypeDisplay;
    document.getElementById('modalRoomDescription').textContent = room.description;
    document.getElementById('modalPrice').textContent = formatCurrency(room.price);
    document.getElementById('modalAvailability').innerHTML = `
        <span class="availability-status ${statusClass}">${availabilityStatus}</span>
        (${room.availableRooms}/${room.totalRooms} rooms)
    `;
    document.getElementById('modalLocation').textContent = room.location;
    
    // Update amenities list
    const amenitiesList = document.getElementById('modalAmenities');
    amenitiesList.innerHTML = room.amenities.map(amenity => 
        `<li><i class="fas fa-check text-success me-2"></i>${amenity}</li>`
    ).join('');
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

// Search functionality
function searchRooms(query) {
    if (!query.trim()) {
        filterAvailabilityData();
        return;
    }
    
    const filteredData = AVAILABILITY_DATA.filter(room => 
        room.hotelName.toLowerCase().includes(query.toLowerCase()) ||
        room.location.toLowerCase().includes(query.toLowerCase()) ||
        room.roomTypeDisplay.toLowerCase().includes(query.toLowerCase()) ||
        room.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displayAvailabilityCards(filteredData);
}

// Sort functionality
function sortRooms(criteria) {
    let sortedData = [...AVAILABILITY_DATA];
    
    switch (criteria) {
        case 'price-low':
            sortedData.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedData.sort((a, b) => b.price - a.price);
            break;
        case 'availability':
            sortedData.sort((a, b) => {
                const availabilityOrder = { 'available': 0, 'limited': 1, 'booked': 2 };
                return availabilityOrder[a.availability] - availabilityOrder[b.availability];
            });
            break;
        case 'name':
            sortedData.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
            break;
    }
    
    displayAvailabilityCards(sortedData);
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

// Heatmap Functionality
function initializeHeatmap() {
    // Initial heatmap will be created when data is loaded
}

function updateHeatmap(data) {
    const heatmapContainer = document.getElementById('availabilityHeatmap');
    if (!heatmapContainer) return;
    
    // Group data by city and room type
    const heatmapData = {};
    data.forEach(room => {
        if (!heatmapData[room.city]) {
            heatmapData[room.city] = {};
        }
        if (!heatmapData[room.city][room.roomType]) {
            heatmapData[room.city][room.roomType] = {
                available: 0,
                limited: 0,
                booked: 0,
                total: 0
            };
        }
        
        const status = heatmapData[room.city][room.roomType];
        status.total += room.totalRooms;
        
        if (room.availability === 'available') {
            status.available += room.availableRooms;
        } else if (room.availability === 'limited') {
            status.limited += room.availableRooms;
        } else {
            status.booked += room.totalRooms;
        }
    });
    
    // Generate heatmap HTML
    let heatmapHTML = '';
    const cities = Object.keys(heatmapData);
    const roomTypes = ['standard', 'deluxe', 'premium', 'executive', 'presidential'];
    
    cities.forEach(city => {
        heatmapHTML += `
            <div class="col-12 mb-3">
                <h6 class="text-primary">${getCityDisplayName(city)}</h6>
                <div class="row">
        `;
        
        roomTypes.forEach(roomType => {
            const data = heatmapData[city][roomType];
            if (data) {
                const availabilityPercentage = (data.available / data.total) * 100;
                let colorClass = 'bg-danger';
                let tooltipText = 'Fully Booked';
                
                if (availabilityPercentage > 50) {
                    colorClass = 'bg-success';
                    tooltipText = `${data.available} rooms available`;
                } else if (availabilityPercentage > 10) {
                    colorClass = 'bg-warning';
                    tooltipText = `Only ${data.available} rooms left`;
                }
                
                heatmapHTML += `
                    <div class="col mb-2">
                        <div class="heatmap-cell ${colorClass} text-white text-center p-2 rounded" 
                             data-bs-toggle="tooltip" 
                             data-bs-placement="top" 
                             title="${tooltipText}">
                            <small>${getRoomTypeDisplayName(roomType)}</small>
                            <br>
                            <strong>${data.available}/${data.total}</strong>
                        </div>
                    </div>
                `;
            }
        });
        
        heatmapHTML += `
                </div>
            </div>
        `;
    });
    
    heatmapContainer.innerHTML = heatmapHTML;
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function getCityDisplayName(city) {
    const cityNames = {
        'mumbai': 'Mumbai',
        'delhi': 'Delhi',
        'bangalore': 'Bengaluru',
        'chennai': 'Chennai',
        'hyderabad': 'Hyderabad',
        'jaipur': 'Jaipur',
        'kochi': 'Kochi',
        'goa': 'Goa'
    };
    return cityNames[city] || city;
}

// Scroll to Top Functionality for Availability Page
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

function getRoomTypeDisplayName(roomType) {
    const displayNames = {
        'standard': 'Standard',
        'deluxe': 'Deluxe',
        'premium': 'Premium',
        'executive': 'Executive',
        'presidential': 'Presidential'
    };
    return displayNames[roomType] || roomType;
}

// Initialize Charts Functionality
function initializeCharts() {
    createWeeklyChart();
    createRoomTypeChart();
}

function createWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Bookings',
            data: [45, 52, 38, 61, 78, 89, 67],
            borderColor: '#FF6B35',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: weeklyData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createRoomTypeChart() {
    const ctx = document.getElementById('roomTypeChart');
    if (!ctx) return;
    
    const roomTypeData = {
        labels: ['Standard', 'Deluxe', 'Premium', 'Executive', 'Presidential'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                '#FF6B35',
                '#4ECDC4',
                '#45B7D1',
                '#96CEB4',
                '#FFEAA7'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: roomTypeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Export functions for use in other scripts
window.QuickStayAvailability = {
    searchRooms,
    sortRooms,
    filterAvailabilityData,
    formatCurrency,
    updateHeatmap,
    initializeScrollToTop
}; 