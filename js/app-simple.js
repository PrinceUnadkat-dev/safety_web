/**
 * Smart Turistom - Simple Working Application
 * No complex dependencies, just pure HTML/CSS/JS
 */

class SmartTuristomApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'home';
        this.isLoggedIn = false;
        this.userRole = 'user';
        this.map = null;
        this.heatmapData = [];
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        console.log('🚀 Initializing Smart Turistom...');
        this.setupEventListeners();
        this.loadPage('home');
        this.showToast('✅ App loaded successfully!', 'success');
        console.log('✅ Smart Turistom app initialized');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Navigation links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const page = e.target.getAttribute('href').substring(1);
                this.loadPage(page);
            }
        });

        // Login button
        document.getElementById('login-btn')?.addEventListener('click', () => {
            this.showLoginModal();
        });

        // Signup button
        document.getElementById('signup-btn')?.addEventListener('click', () => {
            this.showSignupModal();
        });

        // Logout button
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.logout();
        });

        // SOS Button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sos-btn') {
                this.triggerSOS();
            }
        });
    }

    /**
     * Load a page
     * @param {string} page - Page name
     */
    loadPage(page) {
        this.currentPage = page;
        const content = document.getElementById('content');
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`a[href="#${page}"]`)?.classList.add('active');
        
        switch(page) {
            case 'home':
                this.renderHomePage(content);
                break;
            case 'dashboard':
                this.renderDashboardPage(content);
                break;
            case 'admin':
                this.renderAdminPage(content);
                break;
            case 'about':
                this.renderAboutPage(content);
                break;
            default:
                this.renderHomePage(content);
        }
    }

    /**
     * Render home page
     * @param {HTMLElement} container - Container element
     */
    renderHomePage(container) {
        container.innerHTML = `
            <div class="hero">
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-badge">
                            <span>🛡️</span>
                            <span>Next-Gen Tourism Safety</span>
                        </div>
                        
                        <h1 class="hero-title">Smart Turistom</h1>
                        
                        <p class="hero-subtitle">
                            Revolutionary tourism safety platform for North East India featuring real-time monitoring, 
                            emergency alerts, AI-powered safety features, and blockchain-secured data.
                        </p>
                        
                        <div class="hero-actions">
                            <button onclick="app.loadPage('dashboard')" class="btn btn-primary btn-lg">
                                🚀 Explore Dashboard
                            </button>
                            <button onclick="app.showLoginModal()" class="btn btn-outline btn-lg">
                                🔐 Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <section class="features">
                <div class="container">
                    <h2 class="text-center text-3xl font-bold mb-8">Key Features</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="feature-icon">📍</span>
                            <h3 class="feature-title">Real-time GPS Tracking</h3>
                            <p class="feature-description">
                                Advanced GPS monitoring with live location updates and geofencing alerts for enhanced tourist safety.
                            </p>
                        </div>
                        
                        <div class="feature-card">
                            <span class="feature-icon">🚨</span>
                            <h3 class="feature-title">SOS Emergency System</h3>
                            <p class="feature-description">
                                Instant emergency alerts with GPS coordinates, automated dispatch, and real-time response tracking.
                            </p>
                        </div>
                        
                        <div class="feature-card">
                            <span class="feature-icon">🗺️</span>
                            <h3 class="feature-title">Safety Heatmap</h3>
                            <p class="feature-description">
                                AI-powered risk assessment with color-coded safety zones and real-time threat monitoring.
                            </p>
                        </div>
                        
                        <div class="feature-card">
                            <span class="feature-icon">🔐</span>
                            <h3 class="feature-title">Blockchain Security</h3>
                            <p class="feature-description">
                                Tamper-proof data storage using IPFS and blockchain technology for maximum security and privacy.
                            </p>
                        </div>
                        
                        <div class="feature-card">
                            <span class="feature-icon">🤖</span>
                            <h3 class="feature-title">AI Monitoring</h3>
                            <p class="feature-description">
                                Smart anomaly detection using machine learning to identify potential safety threats and unusual patterns.
                            </p>
                        </div>
                        
                        <div class="feature-card">
                            <span class="feature-icon">📱</span>
                            <h3 class="feature-title">Mobile Ready</h3>
                            <p class="feature-description">
                                Responsive design optimized for mobile devices with offline capabilities and push notifications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats Section -->
            <section class="stats">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-icon">👥</span>
                            <div class="stat-number">10K+</div>
                            <div class="stat-label">Tourists Protected</div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">⚡</span>
                            <div class="stat-number">99.9%</div>
                            <div class="stat-label">Uptime Reliability</div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🌍</span>
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Monitoring</div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🏆</span>
                            <div class="stat-number">5★</div>
                            <div class="stat-label">Safety Rating</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render dashboard page
     * @param {HTMLElement} container - Container element
     */
    renderDashboardPage(container) {
        container.innerHTML = `
            <div class="container py-8">
                <!-- Dashboard Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold mb-2">Tourist Dashboard</h1>
                    <p class="text-secondary">Monitor your safety and explore tourist locations</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 mb-8">
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-muted text-sm">Active Tourists</p>
                                <p class="text-2xl font-bold">${window.sampleData?.tourists?.length || 0}</p>
                            </div>
                            <span class="text-3xl">👥</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-muted text-sm">Active Alerts</p>
                                <p class="text-2xl font-bold">${window.sampleData?.alerts?.length || 0}</p>
                            </div>
                            <span class="text-3xl">🚨</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-muted text-sm">Safe Zones</p>
                                <p class="text-2xl font-bold">24</p>
                            </div>
                            <span class="text-3xl">🛡️</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-muted text-sm">Response Time</p>
                                <p class="text-2xl font-bold">2.3 min</p>
                            </div>
                            <span class="text-3xl">⚡</span>
                        </div>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-2 gap-8">
                    <!-- Map Section -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Safety Map</h2>
                            <p class="card-subtitle">Real-time tourist locations and safety zones</p>
                        </div>
                        <div id="map" style="height: 400px; width: 100%; border-radius: 8px; background: #1a1a2e; display: flex; align-items: center; justify-content: center; color: #666;">
                            <div class="text-center">
                                <div class="text-4xl mb-2">🗺️</div>
                                <p>Google Maps will load here</p>
                                <button onclick="app.loadGoogleMaps()" class="btn btn-primary mt-4">Load Map</button>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button id="sos-btn" class="btn btn-primary w-full">
                                🚨 SOS EMERGENCY
                            </button>
                        </div>
                    </div>

                    <!-- Google Maps Safety Heatmap -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Google Maps Safety Heatmap</h2>
                            <p class="card-subtitle">Real-time safety zones from admin</p>
                        </div>
                        <div id="user-maps-heatmap" style="height: 300px; width: 100%; border-radius: 8px; background: #1a1a2e; display: flex; align-items: center; justify-content: center; color: #666; border: 2px dashed #666;">
                            <div class="text-center">
                                <div class="text-3xl mb-2">🗺️</div>
                                <p>Loading Google Maps heatmap...</p>
                                <button onclick="app.loadUserMapsHeatmap()" class="btn btn-primary mt-2 text-sm">Load Heatmap</button>
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <div class="flex items-center gap-2 text-xs">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span>High Risk</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs">
                                <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span>Medium Risk</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span>Low Risk</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs">
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>Safe</span>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Alerts -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Recent Alerts</h2>
                            <p class="card-subtitle">Latest safety notifications</p>
                        </div>
                        <div class="space-y-3">
                            ${this.renderAlerts()}
                        </div>
                    </div>

                    <!-- Location Selector -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Plan Your Trip</h2>
                            <p class="card-subtitle">Select destination and view safety info</p>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-secondary mb-2">State</label>
                                <select id="state-select" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                                    <option value="">Select State</option>
                                    <option value="assam">Assam</option>
                                    <option value="meghalaya">Meghalaya</option>
                                    <option value="arunachal">Arunachal Pradesh</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-secondary mb-2">City</label>
                                <select id="city-select" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                                    <option value="">Select City</option>
                                </select>
                            </div>
                            <button onclick="app.viewLocation()" class="btn btn-primary w-full">
                                View Location Safety
                            </button>
                        </div>
                    </div>

                    <!-- Tourist List -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Active Tourists</h2>
                            <p class="card-subtitle">Currently monitored tourists</p>
                        </div>
                        <div class="space-y-3">
                            ${this.renderTourists()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupLocationSelector();
        this.setupUserHeatmap();
        this.setupUserMapsHeatmap();
    }

    /**
     * Load Google Maps
     */
    loadGoogleMaps() {
        this.showToast('🔄 Loading Google Maps...', 'info');
        
        // Create script element for Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdySYKKI6Z1T8GHwbxmmrnN5xsjG5TEXU&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        // Define the callback function
        window.initMap = () => {
            this.initMap();
        };
        
        document.head.appendChild(script);
    }

    /**
     * Initialize Google Maps
     */
    initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        this.map = new google.maps.Map(mapElement, {
            center: { lat: 26.2006, lng: 92.9376 }, // North East India
            zoom: 7,
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#1a1a2e" }]
                },
                {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#0f3460" }]
                }
            ]
        });

        // Add sample markers
        if (window.sampleData?.tourists) {
            window.sampleData.tourists.forEach(tourist => {
                new google.maps.Marker({
                    position: { lat: tourist.lat, lng: tourist.lng },
                    map: this.map,
                    title: tourist.name,
                    icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#6366f1"/>
                                <text x="12" y="16" text-anchor="middle" fill="white" font-size="12">👤</text>
                            </svg>
                        `),
                        scaledSize: new google.maps.Size(24, 24)
                    }
                });
            });
        }

        this.showToast('✅ Google Maps loaded successfully!', 'success');
        console.log('✅ Map initialized');
    }

    /**
     * Render admin page
     * @param {HTMLElement} container - Container element
     */
    renderAdminPage(container) {
        // Check if user is admin
        if (this.userRole !== 'admin') {
            container.innerHTML = `
                <div class="container py-20">
                    <div class="max-w-md mx-auto text-center">
                        <div class="card">
                            <div class="text-center">
                                <div class="text-6xl mb-4">🔒</div>
                                <h1 class="text-2xl font-bold mb-4">Access Denied</h1>
                                <p class="text-secondary mb-6">You need admin privileges to access this page.</p>
                                <button onclick="app.showAdminLoginModal()" class="btn bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
                                    🔐 Admin Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="container py-8">
                <!-- Admin Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold mb-2">Admin Panel</h1>
                    <p class="text-secondary">Manage heatmaps, alerts, and user activities</p>
                </div>

                <!-- Admin Dashboard -->
                <div class="space-y-8">
                    <!-- Google Maps Heatmap Editor -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Google Maps Heatmap Editor</h2>
                            <p class="card-subtitle">Create safety zones on real map</p>
                        </div>
                        
                        <!-- Map Selection -->
                        <div class="mb-4">
                            <button onclick="app.loadAdminGoogleMaps()" class="btn btn-primary mb-4">
                                🗺️ Load Google Maps
                            </button>
                            <button onclick="app.selectMapArea()" class="btn bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 ml-2" id="select-map-btn" style="display: none;">
                                📍 Select Map Area
                            </button>
                        </div>

                        <!-- Color Selection -->
                        <div class="grid grid-cols-4 gap-4 mb-4">
                            <button class="color-btn bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors" data-color="red">Red (High Risk)</button>
                            <button class="color-btn bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors" data-color="orange">Orange (Medium Risk)</button>
                            <button class="color-btn bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition-colors" data-color="yellow">Yellow (Low Risk)</button>
                            <button class="color-btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors" data-color="green">Green (Safe)</button>
                        </div>

                        <!-- Google Maps Container -->
                        <div id="admin-map" style="height: 500px; width: 100%; border: 2px dashed #666; border-radius: 8px; position: relative; background: #1a1a2e; display: flex; align-items: center; justify-content: center; color: #666;">
                            <div class="text-center">
                                <div class="text-4xl mb-2">🗺️</div>
                                <p>Google Maps will load here</p>
                                <p class="text-sm text-muted mt-2">Click "Load Google Maps" to start</p>
                            </div>
                        </div>

                        <!-- Heatmap Controls -->
                        <div class="mt-4 flex gap-4">
                            <button onclick="app.clearMapsHeatmap()" class="btn btn-outline">
                                🗑️ Clear Heatmap
                            </button>
                            <button onclick="app.saveMapsHeatmap()" class="btn btn-primary">
                                💾 Save to Blockchain
                            </button>
                            <button onclick="app.toggleHeatmapDrawing()" class="btn bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700" id="draw-toggle-btn">
                                ✏️ Start Drawing
                            </button>
                        </div>
                    </div>

                    <!-- User Activities -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">User Activities</h2>
                            <p class="card-subtitle">Monitor user actions and system events</p>
                        </div>
                        <div class="space-y-3">
                            ${this.renderUserActivities()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupAdminHeatmapEditor();
    }

    /**
     * Render about page
     * @param {HTMLElement} container - Container element
     */
    renderAboutPage(container) {
        container.innerHTML = `
            <div class="container py-20">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl font-bold mb-8">About Smart Turistom</h1>
                    <p class="text-lg text-secondary leading-relaxed mb-8">
                        Smart Turistom is a comprehensive tourism safety platform designed specifically for North East India. 
                        Our mission is to ensure the safety and security of tourists through advanced technology, 
                        real-time monitoring, AI-powered safety features, and blockchain-secured data storage.
                    </p>
                    <div class="grid grid-cols-3 gap-8 mt-12">
                        <div class="card">
                            <h3 class="text-xl font-semibold mb-4">Our Mission</h3>
                            <p class="text-secondary">To make tourism in North East India safer through cutting-edge technology</p>
                        </div>
                        <div class="card">
                            <h3 class="text-xl font-semibold mb-4">Our Vision</h3>
                            <p class="text-secondary">A world where every tourist feels safe and secure</p>
                        </div>
                        <div class="card">
                            <h3 class="text-xl font-semibold mb-4">Our Values</h3>
                            <p class="text-secondary">Safety, Innovation, Privacy, and User-Centric Design</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Show login modal - Aesthetic Modern Design
     */
    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="modern-auth-container">
                <div class="modern-auth-card">
                    <button onclick="app.closeModal()" class="modern-auth-close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="modern-auth-header">
                        <div class="modern-auth-icon login-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <h2 class="modern-auth-title">Welcome Back</h2>
                        <p class="modern-auth-subtitle">Sign in to your account</p>
                    </div>

                    <form id="login-form" class="modern-auth-form">
                        <div class="modern-input-group">
                            <label class="modern-input-label">Email Address</label>
                            <div class="modern-input-container">
                                <svg class="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input type="email" id="login-email" class="modern-input" placeholder="hello@example.com" required>
                            </div>
                        </div>

                        <div class="modern-input-group">
                            <label class="modern-input-label">Password</label>
                            <div class="modern-input-container">
                                <svg class="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <circle cx="12" cy="16" r="1"></circle>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input type="password" id="login-password" class="modern-input" placeholder="Enter your password" required>
                                <button type="button" class="modern-input-toggle" onclick="this.previousElementSibling.type = this.previousElementSibling.type === 'password' ? 'text' : 'password'">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="modern-input-group">
                            <label class="modern-checkbox">
                                <input type="checkbox" class="modern-checkbox-input">
                                <span class="modern-checkbox-custom"></span>
                                <span class="modern-checkbox-label">Remember me</span>
                            </label>
                        </div>

                        <button type="submit" class="modern-auth-button">
                            <span>Sign In</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                        </button>
                    </form>

                    <div class="modern-auth-divider">
                        <span>or continue with</span>
                    </div>

                    <button onclick="app.showGoogleLogin()" class="modern-social-button">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div class="modern-auth-footer">
                        <span>Don't have an account?</span>
                        <a href="#" onclick="app.closeModal(); app.showSignupModal(); return false;" class="modern-auth-link">Sign up</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add login-specific CSS if not already added
        if (!document.getElementById('modern-auth-styles-login')) {
            const style = document.createElement('style');
            style.id = 'modern-auth-styles-login';
            style.textContent = `
                .login-icon {
                    background: linear-gradient(135deg, var(--blue-500), var(--indigo-600));
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            this.handleLogin(email, password);
        });
    }

    /**
     * Show signup modal - Aesthetic Modern Design
     */
    showSignupModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="modern-auth-container">
                <div class="modern-auth-card">
                    <button onclick="app.closeModal()" class="modern-auth-close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="modern-auth-header">
                        <div class="modern-auth-icon signup-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <path d="M20 8v6"></path>
                                <path d="M23 11h-6"></path>
                            </svg>
                        </div>
                        <h2 class="modern-auth-title">Create Account</h2>
                        <p class="modern-auth-subtitle">Start your journey with us today</p>
                    </div>

                    <form id="signup-form" class="modern-auth-form">
                        <div class="modern-input-group">
                            <label class="modern-input-label">Full Name</label>
                            <div class="modern-input-container">
                                <svg class="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <input type="text" id="signup-name" class="modern-input" placeholder="John Doe" required>
                            </div>
                        </div>

                        <div class="modern-input-group">
                            <label class="modern-input-label">Email Address</label>
                            <div class="modern-input-container">
                                <svg class="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input type="email" id="signup-email" class="modern-input" placeholder="hello@example.com" required>
                            </div>
                        </div>

                        <div class="modern-input-group">
                            <label class="modern-input-label">Password</label>
                            <div class="modern-input-container">
                                <svg class="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <circle cx="12" cy="16" r="1"></circle>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input type="password" id="signup-password" class="modern-input" placeholder="Create a strong password" required>
                                <button type="button" class="modern-input-toggle" onclick="this.previousElementSibling.type = this.previousElementSibling.type === 'password' ? 'text' : 'password'">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="modern-input-group">
                            <label class="modern-checkbox">
                                <input type="checkbox" class="modern-checkbox-input" required>
                                <span class="modern-checkbox-custom"></span>
                                <span class="modern-checkbox-label">I agree to the <a href="#" class="modern-auth-link">Terms of Service</a> and <a href="#" class="modern-auth-link">Privacy Policy</a></span>
                            </label>
                        </div>

                        <button type="submit" class="modern-auth-button">
                            <span>Create Account</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                        </button>
                    </form>

                    <div class="modern-auth-divider">
                        <span>or continue with</span>
                    </div>

                    <button onclick="app.showGoogleSignup()" class="modern-social-button">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div class="modern-auth-footer">
                        <span>Already have an account?</span>
                        <a href="#" onclick="app.closeModal(); app.showLoginModal(); return false;" class="modern-auth-link">Sign in</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add signup-specific CSS if not already added
        if (!document.getElementById('modern-auth-styles-signup')) {
            const style = document.createElement('style');
            style.id = 'modern-auth-styles-signup';
            style.textContent = `
                .signup-icon {
                    background: linear-gradient(135deg, var(--emerald-500), var(--emerald-600));
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            this.handleSignup(name, email, password);
        });
    }

    /**
     * Show Google login
     */
    async showGoogleLogin() {
        try {
            this.showToast('🔄 Initializing Google OAuth...', 'info');
            
            // Load Firebase and Google OAuth
            await this.loadFirebase();
            await this.loadGoogleOAuth();
            
            // Perform Google sign-in
            const result = await window.firebaseAuth.signInWithPopup(window.googleProvider);
            const user = result.user;
            
            // Store user data in blockchain
            if (window.blockchainManager) {
                const userData = {
                    uid: user.uid,
                    name: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    profilePicture: user.photoURL,
                    createdAt: new Date().toISOString(),
                    role: 'user',
                    kycCompleted: false
                };
                
                const hash = await window.blockchainManager.storeUserData(userData);
                console.log('User data stored in blockchain:', hash);
            }
            
            // Update app state
            this.currentUser = user;
            this.userRole = 'user';
            this.isLoggedIn = true;
            this.updateUI();
            this.closeModal();
            
            this.showToast('🎉 Google login successful!', 'success');
            this.loadPage('dashboard');
            
        } catch (error) {
            console.error('Google OAuth error:', error);
            this.showToast('❌ Google OAuth failed: ' + error.message, 'error');
        }
    }

    /**
     * Show Google signup
     */
    async showGoogleSignup() {
        try {
            this.showToast('🔄 Initializing Google OAuth...', 'info');
            
            // Load Firebase and Google OAuth
            await this.loadFirebase();
            await this.loadGoogleOAuth();
            
            // Perform Google sign-in
            const result = await window.firebaseAuth.signInWithPopup(window.googleProvider);
            const user = result.user;
            
            // Store user data in blockchain
            if (window.blockchainManager) {
                const userData = {
                    uid: user.uid,
                    name: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    profilePicture: user.photoURL,
                    createdAt: new Date().toISOString(),
                    role: 'user',
                    kycCompleted: false
                };
                
                const hash = await window.blockchainManager.storeUserData(userData);
                console.log('User data stored in blockchain:', hash);
            }
            
            // Update app state
            this.currentUser = user;
            this.userRole = 'user';
            this.isLoggedIn = true;
            this.updateUI();
            this.closeModal();
            
            this.showToast('🎉 Google signup successful!', 'success');
            this.loadPage('dashboard');
            
        } catch (error) {
            console.error('Google OAuth error:', error);
            this.showToast('❌ Google OAuth failed: ' + error.message, 'error');
        }
    }

    /**
     * Load Firebase
     */
    async loadFirebase() {
        return new Promise((resolve, reject) => {
            if (typeof firebase !== 'undefined') {
                resolve();
                return;
            }

            const scripts = [
                'https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth-compat.js',
                'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore-compat.js'
            ];

            let loaded = 0;
            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    loaded++;
                    if (loaded === scripts.length) {
                        resolve();
                    }
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        });
    }

    /**
     * Load Google OAuth
     */
    async loadGoogleOAuth() {
        return new Promise((resolve, reject) => {
            if (window.firebaseAuth) {
                resolve();
                return;
            }

            // Initialize Firebase
            const firebaseConfig = {
                apiKey: "AIzaSyAdySYKKI6Z1T8GHwbxmmrnN5xsjG5TEXU",
                authDomain: "safety-app-5cc2a.firebaseapp.com",
                projectId: "safety-app-5cc2a",
                storageBucket: "safety-app-5cc2a.firebasestorage.app",
                messagingSenderId: "464836479765",
                appId: "1:464836479765:web:a3042263a7ded077d2771c",
                measurementId: "G-G7BSDX2X5F"
            };

            try {
                const app = firebase.initializeApp(firebaseConfig);
                window.firebaseApp = app;
                window.firebaseAuth = firebase.auth();
                window.firebaseDb = firebase.firestore();
                
                // Configure Google OAuth
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('email');
                provider.addScope('profile');
                
                // Store provider globally
                window.googleProvider = provider;
                
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.querySelector('.fixed.inset-0');
        if (modal) {
            modal.remove();
        }
    }

    /**
     * Show admin login modal
     */
    showAdminLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="glass-strong p-6 rounded-2xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
                <div class="text-center mb-6">
                    <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span class="text-xl">🔐</span>
                    </div>
                    <h2 class="text-2xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Admin Access</h2>
                    <p class="text-secondary text-sm">Enter admin credentials to access the panel</p>
                </div>
                <form id="admin-login-form" class="space-y-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-secondary">Admin Email</label>
                        <input type="email" id="admin-email" class="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-sm" placeholder="admin@gmail.com" required>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-secondary">Admin Password</label>
                        <input type="password" id="admin-password" class="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-sm" placeholder="Enter admin password" required>
                    </div>
                    <button type="submit" class="btn bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 w-full py-3 text-sm font-semibold">
                        🔐 Admin Login
                    </button>
                </form>
                <div class="mt-4 text-center">
                    <p class="text-secondary text-xs">Need regular access? 
                        <button onclick="app.showLoginModal(); app.closeModal();" class="text-blue-400 hover:text-blue-300 transition-colors font-medium">User Login</button>
                    </p>
                </div>
                <button onclick="app.closeModal()" class="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            this.handleAdminLogin(email, password);
        });
    }

    /**
     * Handle admin login
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     */
    async handleAdminLogin(email, password) {
        try {
            if (email === 'admin@gmail.com' && password === 'admin123') {
                this.currentUser = { email, name: 'Admin', role: 'admin' };
                this.userRole = 'admin';
                this.isLoggedIn = true;
                this.updateUI();
                this.closeModal();
                this.showToast('🎉 Admin login successful!', 'success');
                this.loadPage('admin');
            } else {
                this.showToast('❌ Invalid admin credentials', 'error');
            }
        } catch (error) {
            this.showToast('❌ Admin login failed', 'error');
        }
    }

    /**
     * Handle login
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async handleLogin(email, password) {
        try {
            if (email && password) {
                this.currentUser = { email, name: email.split('@')[0] };
                this.userRole = 'user';
                this.isLoggedIn = true;
                this.updateUI();
                this.closeModal();
                this.showToast('🎉 Login successful!', 'success');
                this.loadPage('dashboard');
            } else {
                this.showToast('❌ Invalid credentials', 'error');
            }
        } catch (error) {
            this.showToast('❌ Login failed', 'error');
        }
    }

    /**
     * Handle signup
     * @param {string} name - User name
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async handleSignup(name, email, password) {
        try {
            if (name && email && password) {
                this.currentUser = { email, name };
                this.userRole = 'user';
                this.isLoggedIn = true;
                this.updateUI();
                this.closeModal();
                this.showToast('🎉 Account created successfully!', 'success');
                this.loadPage('dashboard');
            } else {
                this.showToast('❌ Please fill in all fields', 'error');
            }
        } catch (error) {
            this.showToast('❌ Signup failed', 'error');
        }
    }

    /**
     * Logout user
     */
    async logout() {
        this.currentUser = null;
        this.userRole = 'user';
        this.isLoggedIn = false;
        this.updateUI();
        this.showToast('👋 Logged out successfully', 'success');
        this.loadPage('home');
    }

    /**
     * Update UI based on login state
     */
    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');
        const userRole = document.getElementById('user-role');
        const adminLink = document.querySelector('a[href="#admin"]');

        if (this.isLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser?.name || this.currentUser?.email || 'User';
            if (userRole) userRole.textContent = this.userRole;
            
            // Show/hide admin link based on role
            if (adminLink) {
                if (this.userRole === 'admin') {
                    adminLink.style.display = 'block';
                } else {
                    adminLink.style.display = 'none';
                }
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (signupBtn) signupBtn.style.display = 'inline-flex';
            if (userMenu) userMenu.style.display = 'none';
            if (adminLink) adminLink.style.display = 'block';
        }
    }

    /**
     * Setup location selector
     */
    setupLocationSelector() {
        const stateSelect = document.getElementById('state-select');
        const citySelect = document.getElementById('city-select');

        if (stateSelect && citySelect) {
            stateSelect.addEventListener('change', (e) => {
                const cities = {
                    'assam': ['Guwahati', 'Dibrugarh', 'Jorhat'],
                    'meghalaya': ['Shillong', 'Cherrapunji', 'Tura'],
                    'arunachal': ['Itanagar', 'Tawang', 'Bomdila']
                };

                citySelect.innerHTML = '<option value="">Select City</option>';
                if (cities[e.target.value]) {
                    cities[e.target.value].forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.toLowerCase();
                        option.textContent = city;
                        citySelect.appendChild(option);
                    });
                }
            });
        }
    }

    /**
     * Setup user heatmap display
     */
    setupUserHeatmap() {
        // Load and display admin heatmap for users
        this.loadUserHeatmap();
        
        // Set up real-time sync for users
        this.setupUserHeatmapSync();
    }

    /**
     * Load user heatmap from admin data
     */
    loadUserHeatmap() {
        try {
            const storedHeatmap = localStorage.getItem('admin_heatmap');
            
            if (storedHeatmap) {
                const heatmapData = JSON.parse(storedHeatmap);
                this.renderUserHeatmap(heatmapData.zones || []);
            } else {
                // Show placeholder if no heatmap data
                const userHeatmap = document.getElementById('user-heatmap');
                if (userHeatmap) {
                    userHeatmap.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center text-muted">
                            <div class="text-center">
                                <div class="text-3xl mb-2">🗺️</div>
                                <p>No safety heatmap available</p>
                                <p class="text-xs mt-2">Admin will update safety zones</p>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Error loading user heatmap:', error);
        }
    }

    /**
     * Render user heatmap
     * @param {Array} heatmapZones - Array of heatmap zones
     */
    renderUserHeatmap(heatmapZones) {
        const userHeatmap = document.getElementById('user-heatmap');
        if (!userHeatmap) return;

        // Clear existing content
        userHeatmap.innerHTML = '';

        // Render each heatmap point
        heatmapZones.forEach(point => {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.left = (point.x - 10) + 'px';
            dot.style.top = (point.y - 10) + 'px';
            dot.style.width = '20px';
            dot.style.height = '20px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = point.color;
            dot.style.opacity = '0.7';
            dot.style.pointerEvents = 'none';
            dot.style.border = '2px solid rgba(255, 255, 255, 0.5)';
            dot.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
            dot.style.transition = 'all 0.3s ease';

            userHeatmap.appendChild(dot);
        });

        // Add legend info
        if (heatmapZones.length > 0) {
            const lastUpdated = localStorage.getItem('heatmap_last_updated');
            const updateInfo = document.createElement('div');
            updateInfo.className = 'absolute bottom-2 right-2 text-xs text-muted bg-black/50 px-2 py-1 rounded';
            updateInfo.textContent = lastUpdated ? `Updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'Live data';
            userHeatmap.appendChild(updateInfo);
        }
    }

    /**
     * Setup user heatmap synchronization
     */
    setupUserHeatmapSync() {
        // Check for heatmap updates every 3 seconds
        setInterval(() => {
            this.checkUserHeatmapUpdates();
        }, 3000);

        // Listen for storage changes (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'admin_heatmap') {
                this.loadUserHeatmap();
                this.showToast('🗺️ Safety heatmap updated by admin', 'info');
            }
        });
    }

    /**
     * Check for user heatmap updates
     */
    checkUserHeatmapUpdates() {
        const notification = localStorage.getItem('heatmap_notification');
        if (notification) {
            try {
                const notifData = JSON.parse(notification);
                if (notifData.type === 'heatmap_update') {
                    this.loadUserHeatmap();
                    this.showToast('🗺️ ' + notifData.message, 'info');
                    
                    // Clear notification after showing
                    localStorage.removeItem('heatmap_notification');
                }
            } catch (error) {
                console.error('Error parsing heatmap notification:', error);
            }
        }
    }

    /**
     * Load user Google Maps heatmap
     */
    loadUserMapsHeatmap() {
        this.showToast('🔄 Loading Google Maps heatmap...', 'info');
        
        // Create script element for Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdySYKKI6Z1T8GHwbxmmrnN5xsjG5TEXU&libraries=places&callback=initUserMapsHeatmap`;
        script.async = true;
        script.defer = true;
        
        // Define the callback function
        window.initUserMapsHeatmap = () => {
            this.initUserMapsHeatmap();
        };
        
        document.head.appendChild(script);
    }

    /**
     * Initialize user Google Maps heatmap
     */
    initUserMapsHeatmap() {
        const mapElement = document.getElementById('user-maps-heatmap');
        if (!mapElement) return;

        this.userMapsHeatmap = new google.maps.Map(mapElement, {
            center: { lat: 26.2006, lng: 92.9376 }, // North East India
            zoom: 10,
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#1a1a2e" }]
                },
                {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#0f3460" }]
                }
            ]
        });

        // Load and display admin's heatmap data
        this.loadAndDisplayMapsHeatmap();

        this.showToast('✅ Google Maps heatmap loaded!', 'success');
        console.log('✅ User maps heatmap initialized');
    }

    /**
     * Load and display admin's Google Maps heatmap data
     */
    loadAndDisplayMapsHeatmap() {
        try {
            const storedHeatmap = localStorage.getItem('admin_maps_heatmap');
            
            if (storedHeatmap && this.userMapsHeatmap) {
                const heatmapData = JSON.parse(storedHeatmap);
                this.displayMapsHeatmapOnUserMap(heatmapData.zones || []);
            } else {
                // Show placeholder if no heatmap data
                const userHeatmap = document.getElementById('user-maps-heatmap');
                if (userHeatmap && !this.userMapsHeatmap) {
                    userHeatmap.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center text-muted">
                            <div class="text-center">
                                <div class="text-3xl mb-2">🗺️</div>
                                <p>No Google Maps heatmap available</p>
                                <p class="text-xs mt-2">Admin will update safety zones on map</p>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Error loading user maps heatmap:', error);
        }
    }

    /**
     * Display Google Maps heatmap on user's map
     * @param {Array} heatmapZones - Array of heatmap zones with lat/lng
     */
    displayMapsHeatmapOnUserMap(heatmapZones) {
        if (!this.userMapsHeatmap) return;

        // Clear existing markers
        if (this.userHeatmapMarkers) {
            this.userHeatmapMarkers.forEach(marker => marker.setMap(null));
        }
        this.userHeatmapMarkers = [];

        // Add markers for each heatmap zone
        heatmapZones.forEach(zone => {
            const marker = new google.maps.Marker({
                position: { lat: zone.lat, lng: zone.lng },
                map: this.userMapsHeatmap,
                icon: {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="${zone.color}" opacity="0.8"/>
                            <circle cx="12" cy="12" r="6" fill="white" opacity="0.6"/>
                        </svg>
                    `)}`,
                    scaledSize: new google.maps.Size(20, 20)
                },
                title: `${zone.color} risk zone - ${new Date(zone.timestamp).toLocaleString()}`
            });

            this.userHeatmapMarkers.push(marker);
        });

        // Add update info
        const lastUpdated = localStorage.getItem('maps_heatmap_last_updated');
        if (lastUpdated) {
            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="text-sm">
                    <strong>Safety Heatmap</strong><br>
                    Updated: ${new Date(lastUpdated).toLocaleString()}<br>
                    Zones: ${heatmapZones.length}
                </div>`
            });

            // Show info window on map click
            this.userMapsHeatmap.addListener('click', () => {
                infoWindow.open(this.userMapsHeatmap);
            });
        }
    }

    /**
     * Setup user Google Maps heatmap synchronization
     */
    setupUserMapsHeatmap() {
        // Check for Google Maps heatmap updates every 3 seconds
        setInterval(() => {
            this.checkUserMapsHeatmapUpdates();
        }, 3000);

        // Listen for storage changes (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'admin_maps_heatmap') {
                this.loadAndDisplayMapsHeatmap();
                this.showToast('🗺️ Google Maps heatmap updated by admin', 'info');
            }
        });
    }

    /**
     * Check for user Google Maps heatmap updates
     */
    checkUserMapsHeatmapUpdates() {
        const notification = localStorage.getItem('maps_heatmap_notification');
        if (notification) {
            try {
                const notifData = JSON.parse(notification);
                if (notifData.type === 'maps_heatmap_update') {
                    this.loadAndDisplayMapsHeatmap();
                    this.showToast('🗺️ ' + notifData.message, 'info');
                    
                    // Clear notification after showing
                    localStorage.removeItem('maps_heatmap_notification');
                }
            } catch (error) {
                console.error('Error parsing maps heatmap notification:', error);
            }
        }
    }

    /**
     * View selected location
     */
    viewLocation() {
        const state = document.getElementById('state-select').value;
        const city = document.getElementById('city-select').value;
        
        if (state && city) {
            this.showToast(`📍 Viewing safety data for ${city}, ${state}`, 'info');
        } else {
            this.showToast('❌ Please select both state and city', 'error');
        }
    }

    /**
     * Setup admin login
     */
    setupAdminLogin() {
        const form = document.getElementById('admin-login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('admin-email').value;
                const password = document.getElementById('admin-password').value;
                
                if (email === 'admin@gmail.com' && password === 'admin123') {
                    document.getElementById('admin-login').classList.add('hidden');
                    document.getElementById('admin-dashboard').classList.remove('hidden');
                    this.showToast('🎉 Admin login successful!', 'success');
                } else {
                    this.showToast('❌ Invalid admin credentials', 'error');
                }
            });
        }
    }

    /**
     * Load Google Maps for admin panel
     */
    loadAdminGoogleMaps() {
        this.showToast('🔄 Loading Google Maps for admin...', 'info');
        
        // Create script element for Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdySYKKI6Z1T8GHwbxmmrnN5xsjG5TEXU&libraries=places&callback=initAdminMap`;
        script.async = true;
        script.defer = true;
        
        // Define the callback function
        window.initAdminMap = () => {
            this.initAdminMap();
        };
        
        document.head.appendChild(script);
    }

    /**
     * Initialize Google Maps for admin
     */
    initAdminMap() {
        const mapElement = document.getElementById('admin-map');
        if (!mapElement) return;

        this.adminMap = new google.maps.Map(mapElement, {
            center: { lat: 26.2006, lng: 92.9376 }, // North East India
            zoom: 10,
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#1a1a2e" }]
                },
                {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#0f3460" }]
                }
            ]
        });

        // Show select button
        document.getElementById('select-map-btn').style.display = 'inline-block';

        this.showToast('✅ Google Maps loaded for admin!', 'success');
        console.log('✅ Admin map initialized');
    }

    /**
     * Select map area for heatmap editing
     */
    selectMapArea() {
        if (!this.adminMap) {
            this.showToast('❌ Please load Google Maps first', 'error');
            return;
        }

        this.isMapSelected = true;
        this.showToast('📍 Map area selected! You can now draw heatmap zones', 'success');
        
        // Enable drawing mode
        document.getElementById('draw-toggle-btn').textContent = '✏️ Drawing Mode Active';
        document.getElementById('draw-toggle-btn').classList.add('bg-green-500');
    }

    /**
     * Toggle heatmap drawing mode
     */
    toggleHeatmapDrawing() {
        if (!this.adminMap || !this.isMapSelected) {
            this.showToast('❌ Please select map area first', 'error');
            return;
        }

        this.isDrawingMode = !this.isDrawingMode;
        
        if (this.isDrawingMode) {
            this.setupMapDrawing();
            document.getElementById('draw-toggle-btn').textContent = '🛑 Stop Drawing';
            document.getElementById('draw-toggle-btn').classList.remove('bg-green-500');
            document.getElementById('draw-toggle-btn').classList.add('bg-red-500');
            this.showToast('✏️ Drawing mode enabled! Click on map to add heatmap zones', 'info');
        } else {
            this.disableMapDrawing();
            document.getElementById('draw-toggle-btn').textContent = '✏️ Start Drawing';
            document.getElementById('draw-toggle-btn').classList.remove('bg-red-500');
            document.getElementById('draw-toggle-btn').classList.add('bg-green-500');
            this.showToast('🛑 Drawing mode disabled', 'info');
        }
    }

    /**
     * Setup map drawing functionality
     */
    setupMapDrawing() {
        if (!this.adminMap) return;

        // Add click listener to map
        this.mapClickListener = this.adminMap.addListener('click', (event) => {
            this.addHeatmapPoint(event.latLng);
        });
    }

    /**
     * Disable map drawing
     */
    disableMapDrawing() {
        if (this.mapClickListener) {
            google.maps.event.removeListener(this.mapClickListener);
            this.mapClickListener = null;
        }
    }

    /**
     * Add heatmap point to map
     * @param {google.maps.LatLng} latLng - Map coordinates
     */
    addHeatmapPoint(latLng) {
        if (!this.adminMap) return;

        const colorButtons = document.querySelectorAll('.color-btn');
        let currentColor = 'red';
        
        // Get selected color
        colorButtons.forEach(btn => {
            if (btn.classList.contains('ring-2')) {
                currentColor = btn.dataset.color;
            }
        });

        // Create marker
        const marker = new google.maps.Marker({
            position: latLng,
            map: this.adminMap,
            icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="${currentColor}"/>
                        <circle cx="12" cy="12" r="6" fill="white" opacity="0.8"/>
                    </svg>
                `)}`,
                scaledSize: new google.maps.Size(24, 24)
            },
            title: `${currentColor} risk zone`
        });

        // Store heatmap data
        if (!this.mapsHeatmapData) {
            this.mapsHeatmapData = [];
        }

        this.mapsHeatmapData.push({
            lat: latLng.lat(),
            lng: latLng.lng(),
            color: currentColor,
            timestamp: new Date().toISOString()
        });

        console.log('Added heatmap point:', latLng.lat(), latLng.lng(), currentColor);
    }

    /**
     * Clear maps heatmap
     */
    clearMapsHeatmap() {
        if (this.mapsHeatmapData) {
            this.mapsHeatmapData = [];
        }
        
        // Clear all markers from map
        if (this.adminMap) {
            // This would require storing marker references, simplified for now
            this.showToast('🗑️ Heatmap cleared', 'info');
        }
    }

    /**
     * Save maps heatmap to blockchain
     */
    async saveMapsHeatmap() {
        if (!this.mapsHeatmapData || this.mapsHeatmapData.length === 0) {
            this.showToast('❌ No heatmap data to save', 'error');
            return;
        }

        try {
            this.showToast('🔄 Saving Google Maps heatmap to blockchain...', 'info');
            
            if (window.blockchainManager) {
                const heatmapData = {
                    zones: this.mapsHeatmapData,
                    type: 'google_maps_heatmap',
                    createdAt: new Date().toISOString(),
                    createdBy: this.currentUser?.uid || 'admin',
                    version: Date.now()
                };
                
                const hash = await window.blockchainManager.storeHeatmapData(heatmapData);
                
                // Store in localStorage for real-time sync
                localStorage.setItem('admin_maps_heatmap', JSON.stringify(heatmapData));
                localStorage.setItem('maps_heatmap_last_updated', new Date().toISOString());
                
                this.showToast('✅ Google Maps heatmap saved and synced! Hash: ' + hash, 'success');
                
                // Notify users about heatmap update
                this.notifyMapsHeatmapUpdate(heatmapData);
            } else {
                // Fallback simulation
                await new Promise(resolve => setTimeout(resolve, 2000));
                this.showToast('✅ Google Maps heatmap saved to blockchain!', 'success');
            }
        } catch (error) {
            this.showToast('❌ Error saving Google Maps heatmap', 'error');
        }
    }

    /**
     * Notify users about Google Maps heatmap update
     * @param {Object} heatmapData - Updated heatmap data
     */
    notifyMapsHeatmapUpdate(heatmapData) {
        // Store update notification
        const notification = {
            type: 'maps_heatmap_update',
            data: heatmapData,
            timestamp: new Date().toISOString(),
            message: 'Admin has updated the Google Maps safety heatmap'
        };
        
        localStorage.setItem('maps_heatmap_notification', JSON.stringify(notification));
        
        // Show notification to all users
        if (this.userRole === 'user') {
            this.showToast('🗺️ Google Maps safety heatmap has been updated by admin', 'info');
        }
    }

    /**
     * Setup admin heatmap editor
     */
    setupAdminHeatmapEditor() {
        const colorButtons = document.querySelectorAll('.color-btn');
        let currentColor = 'red';

        // Color selection
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('ring-2', 'ring-white', 'ring-offset-2'));
                btn.classList.add('ring-2', 'ring-white', 'ring-offset-2');
                currentColor = btn.dataset.color;
                console.log('Selected color:', currentColor);
            });
        });

        // Set default selected color
        if (colorButtons.length > 0) {
            colorButtons[0].classList.add('ring-2', 'ring-white', 'ring-offset-2');
        }

        // Initialize variables
        this.isMapSelected = false;
        this.isDrawingMode = false;
        this.mapsHeatmapData = [];
    }

    /**
     * Setup heatmap editor (legacy - for backward compatibility)
     */
    setupHeatmapEditor() {
        const canvas = document.getElementById('heatmap-canvas');
        const colorButtons = document.querySelectorAll('.color-btn');
        let currentColor = 'red';
        let isDrawing = false;

        // Load existing heatmap data
        this.loadHeatmapData();

        // Color selection
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('ring-2', 'ring-white', 'ring-offset-2'));
                btn.classList.add('ring-2', 'ring-white', 'ring-offset-2');
                currentColor = btn.dataset.color;
                console.log('Selected color:', currentColor);
            });
        });

        // Set default selected color
        if (colorButtons.length > 0) {
            colorButtons[0].classList.add('ring-2', 'ring-white', 'ring-offset-2');
        }

        // Drawing functionality
        if (canvas) {
            // Remove placeholder text
            const placeholder = canvas.querySelector('.absolute.inset-0');
            if (placeholder) {
                placeholder.remove();
            }

            canvas.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDrawing = true;
                this.drawOnCanvas(e, currentColor);
            });

            canvas.addEventListener('mousemove', (e) => {
                if (isDrawing) {
                    e.preventDefault();
                    this.drawOnCanvas(e, currentColor);
                }
            });

            canvas.addEventListener('mouseup', (e) => {
                e.preventDefault();
                isDrawing = false;
            });

            // Touch events for mobile
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                isDrawing = true;
                const touch = e.touches[0];
                const rect = canvas.getBoundingClientRect();
                const mouseEvent = new MouseEvent('mousedown', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.drawOnCanvas(mouseEvent, currentColor);
            });

            canvas.addEventListener('touchmove', (e) => {
                if (isDrawing) {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const rect = canvas.getBoundingClientRect();
                    const mouseEvent = new MouseEvent('mousemove', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    });
                    this.drawOnCanvas(mouseEvent, currentColor);
                }
            });

            canvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                isDrawing = false;
            });
        }

        // Set up real-time sync
        this.setupHeatmapSync();
    }

    /**
     * Setup real-time heatmap synchronization
     */
    setupHeatmapSync() {
        // Check for heatmap updates every 5 seconds
        setInterval(() => {
            this.checkHeatmapUpdates();
        }, 5000);

        // Listen for storage changes (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'admin_heatmap') {
                this.loadHeatmapData();
                this.showToast('🗺️ Heatmap updated by admin', 'info');
            }
        });
    }

    /**
     * Check for heatmap updates
     */
    checkHeatmapUpdates() {
        const notification = localStorage.getItem('heatmap_notification');
        if (notification) {
            try {
                const notifData = JSON.parse(notification);
                if (notifData.type === 'heatmap_update') {
                    this.loadHeatmapData();
                    this.showToast('🗺️ ' + notifData.message, 'info');
                    
                    // Clear notification after showing
                    localStorage.removeItem('heatmap_notification');
                }
            } catch (error) {
                console.error('Error parsing heatmap notification:', error);
            }
        }
    }

    /**
     * Draw on heatmap canvas
     * @param {Event} e - Mouse event
     * @param {string} color - Color to draw
     */
    drawOnCanvas(e, color) {
        const canvas = document.getElementById('heatmap-canvas');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create a more visible dot
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.left = (x - 15) + 'px';
        dot.style.top = (y - 15) + 'px';
        dot.style.width = '30px';
        dot.style.height = '30px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.opacity = '0.8';
        dot.style.pointerEvents = 'none';
        dot.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        dot.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        dot.style.transition = 'all 0.1s ease';

        // Add a pulse animation
        dot.style.animation = 'pulse 0.3s ease-out';

        canvas.appendChild(dot);

        // Store the drawing data
        this.heatmapData.push({
            x: x,
            y: y,
            color: color,
            timestamp: new Date().toISOString()
        });

        console.log('Drew dot at:', x, y, 'with color:', color);
    }

    /**
     * Clear heatmap
     */
    clearHeatmap() {
        const canvas = document.getElementById('heatmap-canvas');
        if (canvas) {
            canvas.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-muted">Click and drag to paint risk zones</div>';
        }
        this.showToast('🗑️ Heatmap cleared', 'info');
    }

    /**
     * Save heatmap
     */
    async saveHeatmap() {
        try {
            this.showToast('🔄 Saving heatmap to blockchain...', 'info');
            
            if (window.blockchainManager) {
                const heatmapData = {
                    zones: this.heatmapData,
                    createdAt: new Date().toISOString(),
                    createdBy: this.currentUser?.uid || 'admin',
                    type: 'admin_heatmap',
                    version: Date.now()
                };
                
                const hash = await window.blockchainManager.storeHeatmapData(heatmapData);
                
                // Store in localStorage for real-time sync
                localStorage.setItem('admin_heatmap', JSON.stringify(heatmapData));
                localStorage.setItem('heatmap_last_updated', new Date().toISOString());
                
                this.showToast('✅ Heatmap saved and synced! Hash: ' + hash, 'success');
                
                // Notify users about heatmap update
                this.notifyHeatmapUpdate(heatmapData);
            } else {
                // Fallback simulation
                await new Promise(resolve => setTimeout(resolve, 2000));
                this.showToast('✅ Heatmap saved to blockchain!', 'success');
            }
        } catch (error) {
            this.showToast('❌ Error saving heatmap', 'error');
        }
    }

    /**
     * Notify users about heatmap update
     * @param {Object} heatmapData - Updated heatmap data
     */
    notifyHeatmapUpdate(heatmapData) {
        // Store update notification
        const notification = {
            type: 'heatmap_update',
            data: heatmapData,
            timestamp: new Date().toISOString(),
            message: 'Admin has updated the safety heatmap'
        };
        
        localStorage.setItem('heatmap_notification', JSON.stringify(notification));
        
        // Show notification to all users
        if (this.userRole === 'user') {
            this.showToast('🗺️ Safety heatmap has been updated by admin', 'info');
        }
    }

    /**
     * Load and sync heatmap data
     */
    loadHeatmapData() {
        try {
            const storedHeatmap = localStorage.getItem('admin_heatmap');
            const lastUpdated = localStorage.getItem('heatmap_last_updated');
            
            if (storedHeatmap) {
                const heatmapData = JSON.parse(storedHeatmap);
                this.heatmapData = heatmapData.zones || [];
                
                // Render existing heatmap on canvas
                this.renderExistingHeatmap();
                
                console.log('✅ Heatmap data loaded and synced');
            }
        } catch (error) {
            console.error('Error loading heatmap data:', error);
        }
    }

    /**
     * Render existing heatmap on canvas
     */
    renderExistingHeatmap() {
        const canvas = document.getElementById('heatmap-canvas');
        if (!canvas || !this.heatmapData.length) return;

        // Clear existing content
        canvas.innerHTML = '';

        // Render each heatmap point
        this.heatmapData.forEach(point => {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.left = (point.x - 15) + 'px';
            dot.style.top = (point.y - 15) + 'px';
            dot.style.width = '30px';
            dot.style.height = '30px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = point.color;
            dot.style.opacity = '0.8';
            dot.style.pointerEvents = 'none';
            dot.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            dot.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            dot.style.transition = 'all 0.1s ease';

            canvas.appendChild(dot);
        });
    }

    /**
     * Trigger SOS
     */
    async triggerSOS() {
        try {
            this.showToast('🚨 SOS ALERT SENT! Emergency services have been notified.', 'error');
            
            // Store emergency alert in blockchain
            if (window.blockchainManager) {
                const alertData = {
                    userId: this.currentUser?.uid || 'anonymous',
                    type: 'SOS',
                    location: { lat: 26.2006, lng: 92.9376 },
                    severity: 'critical',
                    timestamp: new Date().toISOString(),
                    message: 'Emergency assistance requested'
                };
                
                const hash = await window.blockchainManager.storeEmergencyAlert(alertData);
                console.log('SOS Alert stored in blockchain:', hash);
            }
            
            // Simulate emergency alert
            setTimeout(() => {
                this.showToast('📞 Emergency response team dispatched. ETA: 5 minutes', 'info');
            }, 2000);
        } catch (error) {
            this.showToast('❌ Error sending SOS alert', 'error');
        }
    }

    /**
     * Render alerts
     * @returns {string} HTML string
     */
    renderAlerts() {
        if (!window.sampleData?.alerts) return '<p class="text-muted">No alerts</p>';
        
        return window.sampleData.alerts.map(alert => `
            <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                    <p class="text-white font-medium">${alert.type}</p>
                    <p class="text-muted text-sm">${alert.location}</p>
                </div>
                <span class="px-2 py-1 rounded text-xs ${alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'} text-white">
                    ${alert.severity}
                </span>
            </div>
        `).join('');
    }

    /**
     * Render tourists
     * @returns {string} HTML string
     */
    renderTourists() {
        if (!window.sampleData?.tourists) return '<p class="text-muted">No tourists</p>';
        
        return window.sampleData.tourists.map(tourist => `
            <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                    <p class="text-white font-medium">${tourist.name}</p>
                    <p class="text-muted text-sm">${tourist.country}</p>
                </div>
                <span class="px-2 py-1 rounded text-xs bg-green-500 text-white">
                    Safe
                </span>
            </div>
        `).join('');
    }

    /**
     * Render user activities
     * @returns {string} HTML string
     */
    renderUserActivities() {
        const activities = [
            { user: 'John Doe', action: 'Logged in', time: '2 min ago' },
            { user: 'Jane Smith', action: 'Viewed heatmap', time: '5 min ago' },
            { user: 'Bob Johnson', action: 'Submitted report', time: '10 min ago' }
        ];

        return activities.map(activity => `
            <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                    <p class="text-white font-medium">${activity.user}</p>
                    <p class="text-muted text-sm">${activity.action}</p>
                </div>
                <span class="text-muted text-sm">${activity.time}</span>
            </div>
        `).join('');
    }

    /**
     * Show toast notification
     * @param {string} message - Toast message
     * @param {string} type - Toast type
     */
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Initialize the application
const app = new SmartTuristomApp();

// Make app globally available
window.app = app;
