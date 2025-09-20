/**
 * Sample Data for Smart Turistom
 * Contains sample tourists, alerts, and other data for demonstration
 */

window.sampleData = {
    tourists: [
        { 
            id: 'T001', 
            name: 'Alice Johnson', 
            country: 'USA', 
            lat: 26.2006, 
            lng: 92.9376,
            status: 'safe',
            lastSeen: '2 minutes ago'
        },
        { 
            id: 'T002', 
            name: 'Bob Smith', 
            country: 'UK', 
            lat: 25.5788, 
            lng: 91.8933,
            status: 'safe',
            lastSeen: '5 minutes ago'
        },
        { 
            id: 'T003', 
            name: 'Maria Garcia', 
            country: 'Spain', 
            lat: 26.1445, 
            lng: 91.7362,
            status: 'warning',
            lastSeen: '1 minute ago'
        },
        { 
            id: 'T004', 
            name: 'David Chen', 
            country: 'Canada', 
            lat: 27.5330, 
            lng: 88.5122,
            status: 'safe',
            lastSeen: '3 minutes ago'
        }
    ],

    alerts: [
        {
            id: 'A001',
            type: 'SOS Emergency',
            location: 'Guwahati, Assam',
            severity: 'high',
            timestamp: new Date(Date.now() - 300000), // 5 minutes ago
            status: 'active',
            description: 'Tourist requesting immediate assistance'
        },
        {
            id: 'A002',
            type: 'Risk Report',
            location: 'Shillong, Meghalaya',
            severity: 'medium',
            timestamp: new Date(Date.now() - 600000), // 10 minutes ago
            status: 'pending',
            description: 'Suspicious activity reported in area'
        },
        {
            id: 'A003',
            type: 'Weather Alert',
            location: 'Cherrapunji, Meghalaya',
            severity: 'low',
            timestamp: new Date(Date.now() - 900000), // 15 minutes ago
            status: 'resolved',
            description: 'Heavy rainfall expected'
        }
    ],

    riskReports: [
        {
            id: 'R001',
            userId: 'T001',
            location: 'Kamakhya Temple, Guwahati',
            severity: 'medium',
            description: 'Crowded area with limited emergency exits',
            timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
            status: 'pending'
        },
        {
            id: 'R002',
            userId: 'T002',
            location: 'Elephant Falls, Shillong',
            severity: 'low',
            description: 'Slippery path near waterfall',
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            status: 'approved'
        }
    ],

    heatmapZones: [
        {
            id: 'H001',
            name: 'High Risk Zone - Guwahati',
            coordinates: [
                { lat: 26.1800, lng: 91.7000 },
                { lat: 26.1900, lng: 91.7000 },
                { lat: 26.1900, lng: 91.7200 },
                { lat: 26.1800, lng: 91.7200 }
            ],
            severity: 'high',
            color: 'red',
            description: 'Area with reported incidents'
        },
        {
            id: 'H002',
            name: 'Medium Risk Zone - Shillong',
            coordinates: [
                { lat: 25.5700, lng: 91.8800 },
                { lat: 25.5800, lng: 91.8800 },
                { lat: 25.5800, lng: 91.9000 },
                { lat: 25.5700, lng: 91.9000 }
            ],
            severity: 'medium',
            color: 'orange',
            description: 'Area with moderate risk factors'
        },
        {
            id: 'H003',
            name: 'Safe Zone - Tawang',
            coordinates: [
                { lat: 27.5800, lng: 91.8600 },
                { lat: 27.5900, lng: 91.8600 },
                { lat: 27.5900, lng: 91.8800 },
                { lat: 27.5800, lng: 91.8800 }
            ],
            severity: 'low',
            color: 'green',
            description: 'Well-monitored safe area'
        }
    ],

    locations: {
        'assam': {
            'guwahati': ['Kamakhya Temple', 'Umananda Island', 'Assam State Museum'],
            'dibrugarh': ['Dibru-Saikhowa National Park', 'Dehing Patkai Wildlife Sanctuary'],
            'jorhat': ['Kaziranga National Park', 'Majuli Island']
        },
        'meghalaya': {
            'shillong': ['Elephant Falls', 'Ward\'s Lake', 'Shillong Peak'],
            'cherrapunji': ['Nohkalikai Falls', 'Double Decker Living Root Bridge'],
            'tura': ['Nokrek National Park', 'Balpakram National Park']
        },
        'arunachal': {
            'itanagar': ['Ita Fort', 'Ganga Lake', 'Jawaharlal Nehru Museum'],
            'tawang': ['Tawang Monastery', 'Sela Pass', 'Madhuri Lake'],
            'bomdila': ['Bomdila Monastery', 'Dirang Valley']
        }
    },

    emergencyContacts: {
        police: '100',
        medical: '108',
        fire: '101',
        tourism: '+91-361-273-2545'
    }
};

console.log('Sample data loaded:', window.sampleData);