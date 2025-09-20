/**
 * Smart Turistom - Main Application
 * Beautiful, functional tourist safety platform with Google OAuth and blockchain
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
    async init() {
        this.setupEventListeners();
        this.loadPage('home');
        
        // Wait for Firebase to initialize
        setTimeout(() => {
            if (window.authManager) {
                this.currentUser = window.authManager.getCurrentUser();
                this.userRole = window.authManager.getUserRole();
                this.isLoggedIn = window.authManager.isAuthenticated();
                this.updateUI();
            }
        }, 1000);
        
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
                        <div id="map" style="height: 400px; width: 100%; border-radius: 8px;"></div>
                        <div class="mt-4">
                            <button id="sos-btn" class="btn btn-primary w-full">
                                🚨 SOS EMERGENCY
                            </button>
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

        // Initialize map after rendering
        setTimeout(() => this.initMap(), 100);
        this.setupLocationSelector();
    }

    /**
     * Render admin page
     * @param {HTMLElement} container - Container element
     */
    renderAdminPage(container) {
        container.innerHTML = `
            <div class="container py-8">
                <!-- Admin Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold mb-2">Admin Panel</h1>
                    <p class="text-secondary">Manage heatmaps, alerts, and user activities</p>
                </div>

                <!-- Admin Login Form -->
                <div id="admin-login" class="max-w-md mx-auto card">
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold mb-2">Admin Login</h2>
                        <p class="text-secondary">Enter your admin credentials</p>
                    </div>
                    <form id="admin-login-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-secondary mb-2">Email</label>
                            <input type="email" id="admin-email" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="admin@gmail.com" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary mb-2">Password</label>
                            <input type="password" id="admin-password" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="admin123" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-full">
                            Login as Admin
                        </button>
                    </form>
                </div>

                <!-- Admin Dashboard (hidden initially) -->
                <div id="admin-dashboard" class="hidden">
                    <!-- Heatmap Editor -->
                    <div class="card mb-8">
                        <div class="card-header">
                            <h2 class="card-title">Heatmap Editor</h2>
                            <p class="card-subtitle">Create and manage safety zones</p>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mb-4">
                            <button class="color-btn bg-red-500 text-white p-3 rounded-lg" data-color="red">Red (High Risk)</button>
                            <button class="color-btn bg-orange-500 text-white p-3 rounded-lg" data-color="orange">Orange (Medium Risk)</button>
                            <button class="color-btn bg-yellow-500 text-white p-3 rounded-lg" data-color="yellow">Yellow (Low Risk)</button>
                            <button class="color-btn bg-green-500 text-white p-3 rounded-lg" data-color="green">Green (Safe)</button>
                        </div>
                        <div id="heatmap-canvas" style="height: 400px; width: 100%; border: 2px dashed #666; border-radius: 8px; position: relative; background: rgba(0,0,0,0.1);">
                            <div class="absolute inset-0 flex items-center justify-center text-muted">
                                Click and drag to paint risk zones
                            </div>
                        </div>
                        <div class="mt-4 flex gap-4">
                            <button onclick="app.clearHeatmap()" class="btn btn-outline">
                                Clear
                            </button>
                            <button onclick="app.saveHeatmap()" class="btn btn-primary">
                                Save Heatmap
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

        this.setupAdminLogin();
        this.setupHeatmapEditor();
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
                        <div class="modern-auth-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <h2 class="modern-auth-title">Welcome Back</h2>
                        <p class="modern-auth-subtitle">Sign in to continue your journey</p>
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

                        <div class="modern-auth-actions">
                            <label class="modern-checkbox">
                                <input type="checkbox" class="modern-checkbox-input">
                                <span class="modern-checkbox-custom"></span>
                                <span class="modern-checkbox-label">Remember me</span>
                            </label>
                            <a href="#" class="modern-auth-link">Forgot password?</a>
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
        
        // Add CSS for modern auth styling
        if (!document.getElementById('modern-auth-styles')) {
            const style = document.createElement('style');
            style.id = 'modern-auth-styles';
            style.textContent = `
                .modern-auth-container {
                    animation: modernAuthSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .modern-auth-card {
                    background: var(--surface-elevated);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                    padding: 2.5rem;
                    width: 100%;
                    max-width: 420px;
                    position: relative;
                    box-shadow: var(--shadow-xl);
                    backdrop-filter: blur(20px);
                }
                
                .modern-auth-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all var(--transition-fast);
                }
                
                .modern-auth-close:hover {
                    color: var(--text-primary);
                    background: var(--surface-hover);
                    transform: scale(1.1);
                }
                
                .modern-auth-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .modern-auth-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 4rem;
                    height: 4rem;
                    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
                    border-radius: 50%;
                    margin-bottom: 1rem;
                    color: white;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }
                
                .modern-auth-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.02em;
                }
                
                .modern-auth-subtitle {
                    color: var(--text-secondary);
                    font-size: 0.875rem;
                    font-weight: 400;
                }
                
                .modern-auth-form {
                    margin-bottom: 1.5rem;
                }
                
                .modern-input-group {
                    margin-bottom: 1.25rem;
                }
                
                .modern-input-label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }
                
                .modern-input-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .modern-input-icon {
                    position: absolute;
                    left: 1rem;
                    color: var(--text-muted);
                    z-index: 1;
                }
                
                .modern-input {
                    width: 100%;
                    padding: 0.875rem 1rem 0.875rem 2.75rem;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    color: var(--text-primary);
                    font-size: 0.875rem;
                    transition: all var(--transition-normal);
                    font-weight: 400;
                }
                
                .modern-input:focus {
                    outline: none;
                    border-color: var(--primary-500);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                    background: var(--surface);
                }
                
                .modern-input:hover {
                    border-color: var(--border-light);
                }
                
                .modern-input-toggle {
                    position: absolute;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0.25rem;
                    transition: color var(--transition-fast);
                }
                
                .modern-input-toggle:hover {
                    color: var(--text-primary);
                }
                
                .modern-auth-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                
                .modern-checkbox {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                }
                
                .modern-checkbox-input {
                    display: none;
                }
                
                .modern-checkbox-custom {
                    width: 1rem;
                    height: 1rem;
                    border: 1px solid var(--border);
                    border-radius: 0.25rem;
                    margin-right: 0.5rem;
                    position: relative;
                    transition: all var(--transition-fast);
                }
                
                .modern-checkbox-input:checked + .modern-checkbox-custom {
                    background: var(--primary-500);
                    border-color: var(--primary-500);
                }
                
                .modern-checkbox-input:checked + .modern-checkbox-custom::after {
                    content: '';
                    position: absolute;
                    left: 3px;
                    top: 0px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                
                .modern-checkbox-label {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }
                
                .modern-auth-link {
                    color: var(--primary-500);
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: color var(--transition-fast);
                }
                
                .modern-auth-link:hover {
                    color: var(--primary-600);
                    text-decoration: underline;
                }
                
                .modern-auth-button {
                    width: 100%;
                    padding: 0.875rem 1.5rem;
                    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
                    border: none;
                    border-radius: var(--radius);
                    color: white;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-normal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                
                .modern-auth-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }
                
                .modern-auth-button:active {
                    transform: translateY(0);
                }
                
                .modern-auth-divider {
                    position: relative;
                    text-align: center;
                    margin: 1.5rem 0;
                }
                
                .modern-auth-divider::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 50%;
                    height: 1px;
                    background: var(--border);
                }
                
                .modern-auth-divider span {
                    background: var(--surface-elevated);
                    padding: 0 1rem;
                    position: relative;
                    color: var(--text-muted);
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .modern-social-button {
                    width: 100%;
                    padding: 0.875rem 1.5rem;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    color: var(--text-primary);
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all var(--transition-normal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                }
                
                .modern-social-button:hover {
                    background: var(--surface-hover);
                    border-color: var(--border-light);
                }
                
                .modern-auth-footer {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }
                
                @keyframes modernAuthSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                @media (max-width: 640px) {
                    .modern-auth-card {
                        padding: 2rem;
                        margin: 1rem;
                    }
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
            if (window.authManager) {
                await window.authManager.signInWithGoogle();
                this.closeModal();
                this.loadPage('dashboard');
            } else {
                this.showToast('❌ Authentication service not available', 'error');
            }
        } catch (error) {
            this.showToast('❌ Google login failed', 'error');
        }
    }

    /**
     * Show Google signup
     */
    async showGoogleSignup() {
        try {
            if (window.authManager) {
                await window.authManager.signInWithGoogle();
                this.closeModal();
                this.loadPage('dashboard');
            } else {
                this.showToast('❌ Authentication service not available', 'error');
            }
        } catch (error) {
            this.showToast('❌ Google signup failed', 'error');
        }
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
     * Handle login
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async handleLogin(email, password) {
        try {
            if (window.authManager) {
                await window.authManager.signInWithEmail(email, password);
                this.closeModal();
                this.loadPage('dashboard');
            } else {
                // Fallback for admin login
                if (email === 'admin@gmail.com' && password === 'admin123') {
                    this.currentUser = { email, name: 'Admin' };
                    this.userRole = 'admin';
                    this.isLoggedIn = true;
                    this.updateUI();
                    this.closeModal();
                    this.showToast('🎉 Admin login successful!', 'success');
                    this.loadPage('admin');
                } else {
                    this.showToast('❌ Invalid credentials', 'error');
                }
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
            if (window.authManager) {
                await window.authManager.signUpWithEmail(name, email, password);
                this.closeModal();
                this.loadPage('dashboard');
            } else {
                this.showToast('❌ Signup service not available', 'error');
            }
        } catch (error) {
            this.showToast('❌ Signup failed', 'error');
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            if (window.authManager) {
                await window.authManager.signOut();
            }
            this.currentUser = null;
            this.userRole = 'user';
            this.isLoggedIn = false;
            this.updateUI();
            this.showToast('👋 Logged out successfully', 'success');
            this.loadPage('home');
        } catch (error) {
            this.showToast('❌ Logout failed', 'error');
        }
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

        if (this.isLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser?.name || this.currentUser?.email || 'User';
            if (userRole) userRole.textContent = this.userRole;
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (signupBtn) signupBtn.style.display = 'inline-flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    /**
     * Initialize Google Maps
     */
    initMap() {
        if (typeof google === 'undefined') {
            console.log('Google Maps not loaded yet');
            return;
        }

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

        console.log('✅ Map initialized');
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
     * Setup heatmap editor
     */
    setupHeatmapEditor() {
        const canvas = document.getElementById('heatmap-canvas');
        const colorButtons = document.querySelectorAll('.color-btn');
        let currentColor = 'red';
        let isDrawing = false;

        // Color selection
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('ring-2', 'ring-white'));
                btn.classList.add('ring-2', 'ring-white');
                currentColor = btn.dataset.color;
            });
        });

        // Drawing functionality
        if (canvas) {
            canvas.addEventListener('mousedown', (e) => {
                isDrawing = true;
                this.drawOnCanvas(e, currentColor);
            });

            canvas.addEventListener('mousemove', (e) => {
                if (isDrawing) {
                    this.drawOnCanvas(e, currentColor);
                }
            });

            canvas.addEventListener('mouseup', () => {
                isDrawing = false;
            });
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

        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.width = '20px';
        dot.style.height = '20px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = color;
        dot.style.opacity = '0.7';
        dot.style.pointerEvents = 'none';

        canvas.appendChild(dot);
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
            if (window.blockchainManager) {
                const heatmapData = {
                    zones: this.heatmapData,
                    createdAt: new Date().toISOString(),
                    createdBy: this.currentUser?.uid || 'admin'
                };
                
                await window.blockchainManager.storeHeatmapData(heatmapData);
                this.showToast('✅ Heatmap saved to blockchain!', 'success');
            } else {
                this.showToast('✅ Heatmap saved successfully!', 'success');
            }
        } catch (error) {
            this.showToast('❌ Error saving heatmap', 'error');
        }
    }

    /**
     * Trigger SOS
     */
    async triggerSOS() {
        try {
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
                
                await window.blockchainManager.storeEmergencyAlert(alertData);
            }
            
            this.showToast('🚨 SOS ALERT SENT! Emergency services have been notified.', 'error');
            
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