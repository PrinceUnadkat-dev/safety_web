/**
 * Authentication Module for Smart Turistom
 * Handles Google OAuth, email/password auth, and user management
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userRole = 'user';
        this.isInitialized = false;
        this.init();
    }

    /**
     * Initialize authentication manager
     */
    async init() {
        try {
            // Wait for Firebase to be ready
            if (typeof firebase === 'undefined' || !window.firebaseAuth) {
                setTimeout(() => this.init(), 100);
                return;
            }

            // Listen for auth state changes
            window.firebaseAuth.onAuthStateChanged((user) => {
                this.handleAuthStateChange(user);
            });

            this.isInitialized = true;
            console.log('✅ Auth manager initialized');
        } catch (error) {
            console.error('❌ Auth initialization error:', error);
        }
    }

    /**
     * Handle authentication state changes
     * @param {Object} user - Firebase user object
     */
    async handleAuthStateChange(user) {
        if (user) {
            this.currentUser = user;
            await this.loadUserData();
            this.updateUI();
            console.log('👤 User signed in:', user.email);
        } else {
            this.currentUser = null;
            this.userRole = 'user';
            this.updateUI();
            console.log('👤 User signed out');
        }
    }

    /**
     * Load user data from Firestore
     */
    async loadUserData() {
        if (!this.currentUser || !window.firebaseDb) return;

        try {
            const userDoc = await window.firebaseDb.collection('users').doc(this.currentUser.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                this.userRole = userData.role || 'user';
            } else {
                // Create new user document
                await this.createUserDocument();
            }
        } catch (error) {
            console.error('❌ Error loading user data:', error);
        }
    }

    /**
     * Create user document in Firestore
     */
    async createUserDocument() {
        if (!this.currentUser || !window.firebaseDb) return;

        try {
            await window.firebaseDb.collection('users').doc(this.currentUser.uid).set({
                name: this.currentUser.displayName || this.currentUser.email.split('@')[0],
                email: this.currentUser.email,
                role: 'user',
                createdAt: new Date(),
                kycCompleted: false,
                profilePicture: this.currentUser.photoURL || null
            });
            console.log('✅ User document created');
        } catch (error) {
            console.error('❌ Error creating user document:', error);
        }
    }

    /**
     * Update UI based on authentication state
     */
    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');
        const userRole = document.getElementById('user-role');

        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser.displayName || this.currentUser.email.split('@')[0];
            if (userRole) userRole.textContent = this.userRole;
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (signupBtn) signupBtn.style.display = 'inline-flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    /**
     * Sign in with Google OAuth
     */
    async signInWithGoogle() {
        try {
            if (!window.firebaseAuth) {
                throw new Error('Firebase not initialized');
            }

            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');

            const result = await window.firebaseAuth.signInWithPopup(provider);
            const user = result.user;

            // Store user data in blockchain
            await this.storeUserInBlockchain(user);

            this.showToast('🎉 Google login successful!', 'success');
            return user;
        } catch (error) {
            console.error('❌ Google sign in error:', error);
            this.showToast(this.getErrorMessage(error), 'error');
            throw error;
        }
    }

    /**
     * Sign in with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async signInWithEmail(email, password) {
        try {
            if (!window.firebaseAuth) {
                throw new Error('Firebase not initialized');
            }

            const result = await window.firebaseAuth.signInWithEmailAndPassword(email, password);
            this.showToast('🎉 Login successful!', 'success');
            return result.user;
        } catch (error) {
            console.error('❌ Email sign in error:', error);
            this.showToast(this.getErrorMessage(error), 'error');
            throw error;
        }
    }

    /**
     * Sign up with email and password
     * @param {string} name - User name
     * @param {string} email - User email
     * @param {string} password - User password
     */
    async signUpWithEmail(name, email, password) {
        try {
            if (!window.firebaseAuth) {
                throw new Error('Firebase not initialized');
            }

            const result = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            const user = result.user;

            // Update user profile
            await user.updateProfile({
                displayName: name
            });

            // Store user data in blockchain
            await this.storeUserInBlockchain(user);

            this.showToast('🎉 Account created successfully!', 'success');
            return user;
        } catch (error) {
            console.error('❌ Email sign up error:', error);
            this.showToast(this.getErrorMessage(error), 'error');
            throw error;
        }
    }

    /**
     * Store user data in blockchain
     * @param {Object} user - Firebase user object
     */
    async storeUserInBlockchain(user) {
        try {
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
                console.log('✅ User data stored in blockchain:', hash);
            }
        } catch (error) {
            console.error('❌ Error storing user in blockchain:', error);
        }
    }

    /**
     * Admin login with special credentials
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     */
    async adminLogin(email, password) {
        if (email === 'admin@gmail.com' && password === 'admin123') {
            // Create admin user session
            this.userRole = 'admin';
            this.currentUser = {
                uid: 'admin',
                email: 'admin@gmail.com',
                displayName: 'Admin',
                photoURL: null
            };
            this.updateUI();
            this.showToast('🎉 Admin login successful!', 'success');
            return true;
        } else {
            this.showToast('❌ Invalid admin credentials', 'error');
            return false;
        }
    }

    /**
     * Sign out current user
     */
    async signOut() {
        try {
            if (window.firebaseAuth && this.currentUser && this.currentUser.uid !== 'admin') {
                await window.firebaseAuth.signOut();
            }
            
            this.currentUser = null;
            this.userRole = 'user';
            this.updateUI();
            this.showToast('👋 Logged out successfully', 'success');
        } catch (error) {
            console.error('❌ Sign out error:', error);
            this.showToast('❌ Error signing out', 'error');
        }
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} - Authentication status
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Check if user has specific role
     * @param {string} role - Role to check
     * @returns {boolean} - Role status
     */
    hasRole(role) {
        return this.userRole === role;
    }

    /**
     * Get current user
     * @returns {Object|null} - Current user object
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Get user role
     * @returns {string} - User role
     */
    getUserRole() {
        return this.userRole;
    }

    /**
     * Get error message from Firebase error
     * @param {Object} error - Firebase error object
     * @returns {string} - User-friendly error message
     */
    getErrorMessage(error) {
        const errorMessages = {
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/email-already-in-use': 'Email already registered',
            'auth/weak-password': 'Password should be at least 6 characters',
            'auth/invalid-email': 'Invalid email address',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later',
            'auth/network-request-failed': 'Network error. Please check your connection',
            'auth/popup-closed-by-user': 'Sign-in popup was closed',
            'auth/cancelled-popup-request': 'Sign-in was cancelled',
            'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site'
        };

        return errorMessages[error.code] || 'An error occurred. Please try again.';
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

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Initialize authentication manager
const authManager = new AuthManager();

// Export for global access
window.authManager = authManager;