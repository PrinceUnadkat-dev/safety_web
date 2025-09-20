# 🛡️ Smart Turistom - Tourist Safety Platform

A comprehensive tourism safety platform for North East India featuring real-time monitoring, emergency alerts, AI-powered safety features, and blockchain-secured data storage.

## ✨ Features

### 🔐 Authentication
- **Google OAuth** - Real Google login/signup with Firebase
- **Email/Password** - Traditional authentication
- **Admin Access** - admin@gmail.com / admin123
- **Role-based Access** - User/Admin roles

### ⛓️ Blockchain Integration
- **IPFS Storage** - User data stored on Pinata IPFS
- **KYC Data** - Secure identity verification storage
- **Emergency Alerts** - SOS alerts stored on blockchain
- **Heatmap Data** - Safety zones stored securely

### 🗺️ Core Features
- **Google Maps** - Real map with tourist markers
- **SOS Emergency** - Functional emergency button with blockchain storage
- **Heatmap Editor** - Canvas-based drawing tool for risk zones
- **Location Selector** - State → City dropdown navigation
- **Real-time Stats** - Live dashboard with sample data
- **Toast Notifications** - Beautiful success/error messages

## 🚀 Quick Start

### 1. Open the Application
```bash
# Simply open index.html in your browser
open index.html
```

### 2. Test the Application
```bash
# Open test-complete.html for comprehensive testing
open test-complete.html
```

### 3. Login Options
- **Google OAuth**: Click "Login with Google" button
- **Admin Access**: admin@gmail.com / admin123
- **Regular User**: Any email/password combination

## 📁 File Structure

```
smart-tourism-h/
├── index.html              # Main application
├── test-complete.html      # Comprehensive test suite
├── test-working.html       # Simple test page
├── data/
│   └── sample-data.js      # Sample data for demonstration
├── js/
│   ├── app-simple.js       # Main application logic
│   ├── blockchain.js       # Real Pinata blockchain integration
│   └── blockchain-simple.js # Simulated blockchain (fallback)
└── styles/
    ├── main.css            # Main styles
    ├── components.css      # Component styles
    └── pages.css           # Page-specific styles
```

## 🔧 Configuration

### Google OAuth
The application is configured with your Google OAuth credentials:
- **Client ID**: 358474239679-ugpktoisgue5ogqv3eft2k7tfas6pfg9.apps.googleusercontent.com
- **Client Secret**: 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

### Pinata Blockchain
Real blockchain integration using your Pinata credentials:
- **API Key**: 10f67bae55223788b169
- **API Secret**: 6c8e03a241a318088a44f79f8f7bc7a7f19ff2c3852258cbd996a5f3d70a6c32
- **JWT**: [Configured in blockchain.js]

## 🧪 Testing

### Test Pages
1. **test-complete.html** - Comprehensive test suite
2. **test-working.html** - Simple functionality tests

### Test Features
- ✅ App initialization
- ✅ Sample data loading
- ✅ Blockchain connectivity
- ✅ Pinata API connection
- ✅ Authentication systems
- ✅ Google Maps integration
- ✅ SOS emergency system
- ✅ Heatmap editor
- ✅ Location selector

## 🎯 Usage Guide

### For Tourists
1. **Login** - Use Google OAuth or create account
2. **Dashboard** - View safety map and tourist locations
3. **SOS Button** - Emergency assistance (stores in blockchain)
4. **Location Selector** - Plan trips and view safety info

### For Admins
1. **Admin Login** - admin@gmail.com / admin123
2. **Heatmap Editor** - Create and manage safety zones
3. **User Monitoring** - View user activities and alerts
4. **Data Management** - All data stored on blockchain

## 🔒 Security Features

- **Blockchain Storage** - All user data stored on IPFS
- **Encrypted Data** - Secure data transmission
- **Role-based Access** - Admin/User permissions
- **Real-time Monitoring** - Live safety tracking

## 🌐 Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 📱 Mobile Support

- ✅ Responsive design
- ✅ Touch-friendly interface
- ✅ Mobile-optimized maps
- ✅ Offline capabilities

## 🐛 Troubleshooting

### Common Issues
1. **Loading Issues** - Check browser console for errors
2. **Google OAuth** - Ensure popups are allowed
3. **Blockchain** - Check internet connection
4. **Maps** - Verify Google Maps API key

### Debug Mode
Open browser console (F12) to see detailed logs and error messages.

## 🚀 Deployment

### Local Development
```bash
# No build process required - just open index.html
open index.html
```

### Production Deployment
1. Upload all files to web server
2. Ensure HTTPS for Google OAuth
3. Configure Firebase project
4. Update API keys if needed

## 📞 Support

For issues or questions:
1. Check the test pages first
2. Review browser console logs
3. Verify all credentials are correct
4. Ensure internet connectivity

## 🎉 Success!

If everything is working correctly, you should see:
- ✅ Beautiful, modern UI
- ✅ Working Google OAuth login
- ✅ Functional Google Maps
- ✅ Real blockchain data storage
- ✅ Working SOS emergency system
- ✅ Interactive heatmap editor

---

**Smart Turistom** - Making tourism in North East India safer through technology! 🛡️