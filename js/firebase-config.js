/**
 * Firebase Configuration for Smart Turistom
 * Handles Firebase initialization and exports services
 */

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdySYKKI6Z1T8GHwbxmmrnN5xsjG5TEXU",
    authDomain: "safety-app-5cc2a.firebaseapp.com",
    projectId: "safety-app-5cc2a",
    storageBucket: "safety-app-5cc2a.firebasestorage.app",
    messagingSenderId: "464836479765",
    appId: "1:464836479765:web:a3042263a7ded077d2771c",
    measurementId: "G-G7BSDX2X5F"
};

// Google OAuth Configuration
const googleOAuthConfig = {
    clientId: "358474239679-ugpktoisgue5ogqv3eft2k7tfas6pfg9.apps.googleusercontent.com",
    clientSecret: "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"
};

// Initialize Firebase
let app, auth, db;

try {
    // Initialize Firebase app
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize Firebase services
    auth = firebase.auth();
    db = firebase.firestore();
    
    console.log('✅ Firebase initialized successfully');
    
    // Export Firebase services globally
    window.firebaseApp = app;
    window.firebaseAuth = auth;
    window.firebaseDb = db;
    
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { app, auth, db };
}