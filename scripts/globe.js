// scripts/globe.js
document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const locations = [
        { 
            id: 'new-york',
            title: "New York", 
            description: "Americas Headquarters", 
            coordinates: [72, 38],  // [x%, y%]
            stats: "500+ employees | Established 2015",
            connections: ['london', 'singapore']
        },
        { 
            id: 'london',
            title: "London", 
            description: "European Operations Center", 
            coordinates: [50, 32],
            stats: "350+ employees | Established 2017",
            connections: ['new-york', 'dubai']
        },
        { 
            id: 'singapore',
            title: "Singapore", 
            description: "Asia-Pacific Hub", 
            coordinates: [82, 62],
            stats: "400+ employees | Established 2018",
            connections: ['new-york', 'sydney']
        },
        { 
            id: 'sydney',
            title: "Sydney", 
            description: "Oceania Office", 
            coordinates: [87, 72],
            stats: "200+ employees | Established 2019",
            connections: ['singapore']
        },
        { 
            id: 'dubai',
            title: "Dubai", 
            description: "Middle East Office", 
            coordinates: [62, 48],
            stats: "150+ employees | Established 2020",
            connections: ['london']
        }
    ];

    // DOM Elements
    const globeContainer = document.getElementById('globe-container');
    const hotspotsContainer = document.getElementById('hotspots-container');
    const connectionLines = document.getElementById('connection-lines');
    const locationInfo = document.getElementById('location-info');
    const locationTitle = document.getElementById('location-title');
    const locationDesc = document.getElementById('location-desc');
    const locationStats = document.getElementById('location-stats');
    const closeButton = document.getElementById('close-location');

    // State
    let activeLocation = null;

    // Initialize Globe
    function initGlobe() {
        createHotspots();
        drawConnections();
        setupEventListeners();
    }

    // Create Location Hotspots
    function createHotspots() {
        locations.forEach(location => {
            const hotspot = document.createElement('div');
            hotspot.className = 'globe-hotspot';
            hotspot.dataset.locationId = location.id;
            hotspot.style.left = `${location.coordinates[0]}%`;
            hotspot.style.top = `${location.coordinates[1]}%`;
            
            // Add ping animation element
            const ping = document.createElement('div');
            ping.className = 'ping-effect absolute inset-0 rounded-full bg-accent opacity-0';
            hotspot.appendChild(ping);
            
            hotspotsContainer.appendChild(hotspot);
        });
    }

    // Draw Connection Lines
    function drawConnections() {
        locations.forEach(location => {
            location.connections.forEach(connectionId => {
                const targetLocation = locations.find(loc => loc.id === connectionId);
                if (targetLocation) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', `${location.coordinates[0]}%`);
                    line.setAttribute('y1', `${location.coordinates[1]}%`);
                    line.setAttribute('x2', `${targetLocation.coordinates[0]}%`);
                    line.setAttribute('y2', `${targetLocation.coordinates[1]}%`);
                    line.setAttribute('stroke', 'url(#connection-gradient)');
                    line.setAttribute('stroke-width', '1.5');
                    line.setAttribute('stroke-dasharray', '4,2');
                    connectionLines.appendChild(line);
                }
            });
        });
    }

    // Event Handlers
    function handleHotspotClick(event) {
        const hotspot = event.currentTarget;
        const locationId = hotspot.dataset.locationId;
        const location = locations.find(loc => loc.id === locationId);
        
        // Update active location
        activeLocation = location;
        
        // Update UI
        updateLocationInfo(location);
        animateHotspot(hotspot);
        
        // Show info panel
        locationInfo.classList.add('show');
    }

    function updateLocationInfo(location) {
        locationTitle.textContent = location.title;
        locationDesc.textContent = location.description;
        locationStats.textContent = location.stats;
    }

    function animateHotspot(hotspot) {
        // Reset all hotspots
        document.querySelectorAll('.globe-hotspot').forEach(h => {
            h.classList.remove('active');
            h.querySelector('.ping-effect').classList.remove('animate-ping');
        });
        
        // Activate current hotspot
        hotspot.classList.add('active');
        const ping = hotspot.querySelector('.ping-effect');
        ping.classList.add('animate-ping');
        
        // Auto-remove ping animation
        setTimeout(() => {
            ping.classList.remove('animate-ping');
        }, 1000);
    }

    function setupEventListeners() {
        // Hotspot clicks
        document.querySelectorAll('.globe-hotspot').forEach(hotspot => {
            hotspot.addEventListener('click', handleHotspotClick);
        });
        
        // Close button
        closeButton.addEventListener('click', () => {
            locationInfo.classList.remove('show');
            document.querySelectorAll('.globe-hotspot').forEach(h => {
                h.classList.remove('active');
            });
        });
        
        // Globe background click
        globeContainer.addEventListener('click', (e) => {
            if (e.target === globeContainer || e.target.classList.contains('globe')) {
                locationInfo.classList.remove('show');
                document.querySelectorAll('.globe-hotspot').forEach(h => {
                    h.classList.remove('active');
                });
            }
        });
    }

    // Initialize
    initGlobe();
});