// script.js
// Sample data based on the e-waste solution presentation [file:1]
const recyclingCenters = [
    {
        name: "EcoTech Recycling Pvt Ltd",
        location: "Jaipur, Rajasthan",
        distance: "2.5 km",
        accepted: ["Mobiles", "Laptops", "Batteries"],
        hours: "Mon-Sat 10AM-6PM",
        rating: 4.8
    },
    {
        name: "Green Circuit Solutions",
        location: "Delhi NCR",
        distance: "15 km",
        accepted: ["All E-Waste", "Large Appliances"],
        hours: "Daily 9AM-7PM",
        rating: 4.5
    },
    {
        name: "Sustainable Tech Recovery",
        location: "Mumbai",
        distance: "8.2 km",
        accepted: ["Computers", "Peripherals"],
        hours: "Mon-Fri 11AM-5PM",
        rating: 4.9
    }
];

let userPoints = 250;
let streak = 7;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Page switching
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Switch pages
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Load initial centers
    loadCenters();
    updatePointsDisplay();
});

// Search functionality for centers
function searchCenters() {
    const query = document.getElementById('centerSearch').value.toLowerCase();
    const centersGrid = document.getElementById('centersGrid');
    
    const filteredCenters = recyclingCenters.filter(center => 
        center.location.toLowerCase().includes(query) || 
        center.name.toLowerCase().includes(query)
    );
    
    displayCenters(filteredCenters, centersGrid);
}

function loadCenters() {
    const centersGrid = document.getElementById('centersGrid');
    displayCenters(recyclingCenters, centersGrid);
}

function displayCenters(centers, container) {
    container.innerHTML = '';
    
    centers.forEach(center => {
        const centerCard = document.createElement('div');
        centerCard.className = 'center-card';
        centerCard.innerHTML = `
            <h3>${center.name}</h3>
            <p><strong>Location:</strong> ${center.location} (${center.distance})</p>
            <p><strong>Accepts:</strong> ${center.accepted.join(', ')}</p>
            <p><strong>Hours:</strong> ${center.hours}</p>
            <div class="rating">
                <span>⭐ ${center.rating}</span>
                <button class="btn btn-primary" onclick="navigateToCenter('${center.name}')">Get Directions</button>
            </div>
        `;
        container.appendChild(centerCard);
    });
}

function navigateToCenter(centerName) {
    alert(`Opening directions to ${centerName}... (Integration with Google Maps/Mapbox would go here)`);
}

// Rewards functionality
function redeemVoucher() {
    const selectedValue = parseInt(document.getElementById('voucherSelect').value);
    if (userPoints >= selectedValue) {
        userPoints -= selectedValue;
        updatePointsDisplay();
        alert(`Voucher redeemed successfully! ${selectedValue} points deducted.`);
    } else {
        alert('Not enough points! Keep recycling to earn more.');
    }
}

function updatePointsDisplay() {
    document.getElementById('userPoints').textContent = userPoints;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetPage = this.getAttribute('href').substring(1);
        if (targetPage && document.getElementById(targetPage)) {
            e.preventDefault();
            document.querySelector(`[data-page="${targetPage}"]`).click();
        }
    });
});

// Animate stats on scroll (for hero stats)
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        stat.style.animation = 'countUp 2s ease-out forwards';
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
});

document.querySelector('.hero-stats')?.observe(observer);
