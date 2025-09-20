/**
 * Simple Blockchain Module for Smart Turistom
 * Simulates blockchain functionality without external dependencies
 */

class SimpleBlockchainManager {
    constructor() {
        this.storage = new Map();
        this.isInitialized = true;
        console.log('✅ Simple Blockchain manager initialized');
    }

    /**
     * Store user data (simulated blockchain)
     * @param {Object} userData - User data to store
     * @returns {Promise<string>} - Simulated hash
     */
    async storeUserData(userData) {
        try {
            const hash = this.generateHash(userData);
            const data = {
                ...userData,
                hash: hash,
                timestamp: new Date().toISOString(),
                blockNumber: this.storage.size + 1
            };
            
            this.storage.set(hash, data);
            
            console.log('✅ User data stored in blockchain:', hash);
            console.log('📊 Data:', data);
            
            return hash;
        } catch (error) {
            console.error('❌ Error storing user data in blockchain:', error);
            throw error;
        }
    }

    /**
     * Store KYC data (simulated blockchain)
     * @param {Object} kycData - KYC data to store
     * @returns {Promise<string>} - Simulated hash
     */
    async storeKYCData(kycData) {
        try {
            const hash = this.generateHash(kycData);
            const data = {
                ...kycData,
                hash: hash,
                timestamp: new Date().toISOString(),
                blockNumber: this.storage.size + 1,
                type: 'kyc'
            };
            
            this.storage.set(hash, data);
            
            console.log('✅ KYC data stored in blockchain:', hash);
            console.log('📊 Data:', data);
            
            return hash;
        } catch (error) {
            console.error('❌ Error storing KYC data in blockchain:', error);
            throw error;
        }
    }

    /**
     * Store emergency alert (simulated blockchain)
     * @param {Object} alertData - Alert data to store
     * @returns {Promise<string>} - Simulated hash
     */
    async storeEmergencyAlert(alertData) {
        try {
            const hash = this.generateHash(alertData);
            const data = {
                ...alertData,
                hash: hash,
                timestamp: new Date().toISOString(),
                blockNumber: this.storage.size + 1,
                type: 'emergency'
            };
            
            this.storage.set(hash, data);
            
            console.log('✅ Emergency alert stored in blockchain:', hash);
            console.log('📊 Data:', data);
            
            return hash;
        } catch (error) {
            console.error('❌ Error storing emergency alert in blockchain:', error);
            throw error;
        }
    }

    /**
     * Store heatmap data (simulated blockchain)
     * @param {Object} heatmapData - Heatmap data to store
     * @returns {Promise<string>} - Simulated hash
     */
    async storeHeatmapData(heatmapData) {
        try {
            const hash = this.generateHash(heatmapData);
            const data = {
                ...heatmapData,
                hash: hash,
                timestamp: new Date().toISOString(),
                blockNumber: this.storage.size + 1,
                type: 'heatmap'
            };
            
            this.storage.set(hash, data);
            
            console.log('✅ Heatmap data stored in blockchain:', hash);
            console.log('📊 Data:', data);
            
            return hash;
        } catch (error) {
            console.error('❌ Error storing heatmap data in blockchain:', error);
            throw error;
        }
    }

    /**
     * Retrieve data from blockchain
     * @param {string} hash - Data hash
     * @returns {Promise<Object>} - Retrieved data
     */
    async retrieveData(hash) {
        try {
            const data = this.storage.get(hash);
            if (data) {
                console.log('✅ Data retrieved from blockchain:', hash);
                return data;
            } else {
                throw new Error('Data not found');
            }
        } catch (error) {
            console.error('❌ Error retrieving data from blockchain:', error);
            throw error;
        }
    }

    /**
     * Verify data integrity
     * @param {string} hash - Data hash
     * @param {Object} originalData - Original data to verify
     * @returns {Promise<boolean>} - Verification result
     */
    async verifyDataIntegrity(hash, originalData) {
        try {
            const retrievedData = await this.retrieveData(hash);
            const isMatch = JSON.stringify(retrievedData) === JSON.stringify(originalData);
            
            if (isMatch) {
                console.log('✅ Data integrity verified');
            } else {
                console.warn('⚠️ Data integrity check failed');
            }
            
            return isMatch;
        } catch (error) {
            console.error('❌ Error verifying data integrity:', error);
            return false;
        }
    }

    /**
     * Get user's blockchain data
     * @param {string} userId - User ID
     * @returns {Promise<Array>} - Array of user's blockchain records
     */
    async getUserBlockchainData(userId) {
        try {
            const userData = [];
            for (const [hash, data] of this.storage.entries()) {
                if (data.uid === userId || data.userId === userId) {
                    userData.push({ hash, ...data });
                }
            }
            
            console.log('📋 Retrieved blockchain data for user:', userId);
            return userData;
        } catch (error) {
            console.error('❌ Error retrieving user blockchain data:', error);
            return [];
        }
    }

    /**
     * Get all blockchain data
     * @returns {Array} - All stored data
     */
    getAllData() {
        const allData = [];
        for (const [hash, data] of this.storage.entries()) {
            allData.push({ hash, ...data });
        }
        return allData;
    }

    /**
     * Get blockchain statistics
     * @returns {Object} - Blockchain stats
     */
    getStats() {
        const stats = {
            totalBlocks: this.storage.size,
            userData: 0,
            kycData: 0,
            emergencyAlerts: 0,
            heatmapData: 0
        };

        for (const data of this.storage.values()) {
            switch (data.type) {
                case 'kyc':
                    stats.kycData++;
                    break;
                case 'emergency':
                    stats.emergencyAlerts++;
                    break;
                case 'heatmap':
                    stats.heatmapData++;
                    break;
                default:
                    stats.userData++;
            }
        }

        return stats;
    }

    /**
     * Generate a simple hash for data
     * @param {Object} data - Data to hash
     * @returns {string} - Generated hash
     */
    generateHash(data) {
        const str = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
    }

    /**
     * Clear all data (for testing)
     */
    clearAll() {
        this.storage.clear();
        console.log('🗑️ All blockchain data cleared');
    }

    /**
     * Export blockchain data
     * @returns {string} - JSON string of all data
     */
    exportData() {
        const allData = this.getAllData();
        return JSON.stringify(allData, null, 2);
    }

    /**
     * Import blockchain data
     * @param {string} jsonData - JSON string of data
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.storage.clear();
            
            data.forEach(item => {
                const { hash, ...itemData } = item;
                this.storage.set(hash, itemData);
            });
            
            console.log('✅ Blockchain data imported successfully');
        } catch (error) {
            console.error('❌ Error importing blockchain data:', error);
        }
    }
}

// Initialize simple blockchain manager
const blockchainManager = new SimpleBlockchainManager();

// Export for global access
window.blockchainManager = blockchainManager;
