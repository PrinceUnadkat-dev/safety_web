/**
 * Blockchain Module for Smart Turistom
 * Handles user data storage on IPFS using Pinata
 */

class BlockchainManager {
    constructor() {
        this.pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMWRiNzI1OS1kMzI3LTQ0NjAtOTNiMy1iNTdlYjIxODE0MTIiLCJlbWFpbCI6ImZyZWUxMjM0NTU0MzIxMDk4N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTBmNjdiYWU1NTIyMzc4OGIxNjkiLCJzY29wZWRLZXlTZWNyZXQiOiI2YzhlMDNhMjQxYTMxODA4OGE0NGY3OWY4ZjdiYzdhN2YxOWZmMmMzODUyMjU4Y2JkOTk2YTVmM2Q3MGE2YzMyIiwiZXhwIjoxNzg5OTA2NjMwfQ.N7YaqhW9l5u9GJusJjvCntoAU0cVYbsSyLY2eg1Dh-8";
        this.pinataBaseURL = "https://api.pinata.cloud";
        this.isInitialized = true;
        console.log('✅ Blockchain manager initialized with Pinata');
    }

    /**
     * Store user data on IPFS
     * @param {Object} userData - User data to store
     * @returns {Promise<string>} - IPFS hash
     */
    async storeUserData(userData) {
        try {
            const response = await fetch(`${this.pinataBaseURL}/pinning/pinJSONToIPFS`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.pinataJWT}`
                },
                body: JSON.stringify({
                    pinataContent: userData,
                    pinataMetadata: {
                        name: `user-${userData.uid || userData.email}-${Date.now()}`,
                        keyvalues: {
                            type: "user-data",
                            uid: userData.uid || userData.email,
                            email: userData.email
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorData.error || JSON.stringify(errorData)}`);
            }

            const result = await response.json();
            console.log('✅ User data stored in blockchain:', result.IpfsHash);
            console.log('🌐 View on IPFS:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
            
            return result.IpfsHash;
        } catch (error) {
            console.error('❌ Error storing user data in blockchain:', error);
            throw error;
        }
    }

    /**
     * Store KYC data on IPFS
     * @param {Object} kycData - KYC data to store
     * @returns {Promise<string>} - IPFS hash
     */
    async storeKYCData(kycData) {
        try {
            const response = await fetch(`${this.pinataBaseURL}/pinning/pinJSONToIPFS`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.pinataJWT}`
                },
                body: JSON.stringify({
                    pinataContent: kycData,
                    pinataMetadata: {
                        name: `kyc-${kycData.userId || kycData.uid}-${Date.now()}`,
                        keyvalues: {
                            type: "kyc-data",
                            userId: kycData.userId || kycData.uid,
                            status: kycData.status || "pending"
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorData.error || JSON.stringify(errorData)}`);
            }

            const result = await response.json();
            console.log('✅ KYC data stored in blockchain:', result.IpfsHash);
            console.log('🌐 View on IPFS:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
            
            return result.IpfsHash;
        } catch (error) {
            console.error('❌ Error storing KYC data in blockchain:', error);
            throw error;
        }
    }

    /**
     * Store emergency alert on IPFS
     * @param {Object} alertData - Alert data to store
     * @returns {Promise<string>} - IPFS hash
     */
    async storeEmergencyAlert(alertData) {
        try {
            const response = await fetch(`${this.pinataBaseURL}/pinning/pinJSONToIPFS`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.pinataJWT}`
                },
                body: JSON.stringify({
                    pinataContent: alertData,
                    pinataMetadata: {
                        name: `emergency-alert-${Date.now()}`,
                        keyvalues: {
                            type: "emergency-alert",
                            userId: alertData.userId,
                            severity: alertData.severity,
                            timestamp: alertData.timestamp
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorData.error || JSON.stringify(errorData)}`);
            }

            const result = await response.json();
            console.log('✅ Emergency alert stored in blockchain:', result.IpfsHash);
            console.log('🌐 View on IPFS:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
            
            return result.IpfsHash;
        } catch (error) {
            console.error('❌ Error storing emergency alert in blockchain:', error);
            throw error;
        }
    }

    /**
     * Store heatmap data on IPFS
     * @param {Object} heatmapData - Heatmap data to store
     * @returns {Promise<string>} - IPFS hash
     */
    async storeHeatmapData(heatmapData) {
        try {
            const response = await fetch(`${this.pinataBaseURL}/pinning/pinJSONToIPFS`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.pinataJWT}`
                },
                body: JSON.stringify({
                    pinataContent: heatmapData,
                    pinataMetadata: {
                        name: `heatmap-${Date.now()}`,
                        keyvalues: {
                            type: "heatmap-data",
                            createdBy: heatmapData.createdBy,
                            zones: heatmapData.zones?.length || 0
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorData.error || JSON.stringify(errorData)}`);
            }

            const result = await response.json();
            console.log('✅ Heatmap data stored in blockchain:', result.IpfsHash);
            console.log('🌐 View on IPFS:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
            
            return result.IpfsHash;
        } catch (error) {
            console.error('❌ Error storing heatmap data in blockchain:', error);
            throw error;
        }
    }

    /**
     * Retrieve data from IPFS
     * @param {string} hash - IPFS hash
     * @returns {Promise<Object>} - Retrieved data
     */
    async retrieveData(hash) {
        try {
            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
            
            if (!response.ok) {
                throw new Error(`Failed to retrieve data: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Data retrieved from blockchain:', hash);
            return data;
        } catch (error) {
            console.error('❌ Error retrieving data from blockchain:', error);
            throw error;
        }
    }

    /**
     * Verify data integrity
     * @param {string} hash - IPFS hash
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
            // Query Pinata for user's data
            const response = await fetch(`${this.pinataBaseURL}/data/pinList?metadata[keyvalues][uid]={"value":"${userId}","op":"eq"}`, {
                headers: {
                    "Authorization": `Bearer ${this.pinataJWT}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to query user data: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('📋 Retrieved blockchain data for user:', userId);
            return result.rows || [];
        } catch (error) {
            console.error('❌ Error retrieving user blockchain data:', error);
            return [];
        }
    }

    /**
     * Test Pinata connection
     * @returns {Promise<boolean>} - Connection status
     */
    async testConnection() {
        try {
            const response = await fetch(`${this.pinataBaseURL}/data/testAuthentication`, {
                headers: {
                    "Authorization": `Bearer ${this.pinataJWT}`
                }
            });

            if (response.ok) {
                console.log('✅ Pinata connection successful');
                return true;
            } else {
                console.error('❌ Pinata connection failed:', response.status);
                return false;
            }
        } catch (error) {
            console.error('❌ Pinata connection error:', error);
            return false;
        }
    }

    /**
     * Get Pinata account info
     * @returns {Promise<Object>} - Account information
     */
    async getAccountInfo() {
        try {
            const response = await fetch(`${this.pinataBaseURL}/data/userPinnedDataTotal`, {
                headers: {
                    "Authorization": `Bearer ${this.pinataJWT}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to get account info: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('📊 Pinata account info:', data);
            return data;
        } catch (error) {
            console.error('❌ Error getting account info:', error);
            return null;
        }
    }
}

// Initialize blockchain manager
const blockchainManager = new BlockchainManager();

// Export for global access
window.blockchainManager = blockchainManager;