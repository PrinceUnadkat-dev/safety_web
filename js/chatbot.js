/**
 * Chatbot Module for Smart Turistom
 * Uses OpenRouter API for Indian tourism-related queries
 */

class ChatbotManager {
    constructor() {
        this.apiKey = "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";
        this.apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    /**
     * Initialize chatbot
     */
    init() {
        this.createChatbotUI();
        this.setupEventListeners();
        console.log('✅ Chatbot initialized');
    }

    /**
     * Create chatbot UI
     */
    createChatbotUI() {
        // Create chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.className = 'fixed bottom-4 right-4 z-50';
        chatbotContainer.innerHTML = `
            <!-- Chat Button -->
            <button id="chatbot-toggle" class="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
            </button>

            <!-- Chat Window -->
            <div id="chatbot-window" class="hidden fixed bottom-20 right-4 w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span class="text-sm">🤖</span>
                        </div>
                        <div>
                            <h3 class="text-white font-semibold">Tourism Assistant</h3>
                            <p class="text-xs text-gray-400">Ask about Indian tourism</p>
                        </div>
                    </div>
                    <button id="chatbot-close" class="text-white/60 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-lg p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Messages -->
                <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto space-y-4 max-h-64">
                    <div class="flex items-start space-x-2">
                        <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-xs">🤖</span>
                        </div>
                        <div class="bg-white/5 rounded-lg p-3 max-w-xs">
                            <p class="text-sm text-white">Namaste! I'm your Indian tourism assistant. Ask me about places to visit, safety tips, or anything related to tourism in India! 🇮🇳</p>
                        </div>
                    </div>
                </div>

                <!-- Input -->
                <div class="p-4 border-t border-white/10">
                    <div class="flex space-x-3">
                        <input type="text" id="chatbot-input" placeholder="Ask about Indian tourism..." class="flex-1 bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm backdrop-blur-sm hover:border-white/25 hover:bg-white/10">
                        <button id="chatbot-send" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-xs text-white/50 mt-3 font-medium">💡 Ask about places, safety, culture, or travel tips in India</p>
                </div>
            </div>
        `;

        document.body.appendChild(chatbotContainer);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggle?.addEventListener('click', () => this.toggleChat());
        close?.addEventListener('click', () => this.closeChat());
        send?.addEventListener('click', () => this.sendMessage());
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    /**
     * Toggle chat window
     */
    toggleChat() {
        const window = document.getElementById('chatbot-window');
        if (window) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                window.classList.remove('hidden');
                document.getElementById('chatbot-input')?.focus();
            } else {
                window.classList.add('hidden');
            }
        }
    }

    /**
     * Close chat window
     */
    closeChat() {
        const window = document.getElementById('chatbot-window');
        if (window) {
            window.classList.add('hidden');
            this.isOpen = false;
        }
    }

    /**
     * Send message
     */
    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input?.value.trim();
        
        if (!message) return;

        // Add user message to UI
        this.addMessage(message, 'user');
        input.value = '';

        // Check if message is India tourism related
        if (!this.isIndiaTourismRelated(message)) {
            this.addMessage("I can only help with Indian tourism-related questions. Please ask about places to visit, safety tips, culture, or travel information in India! 🇮🇳", 'bot');
            return;
        }

        // Show typing indicator
        this.addTypingIndicator();

        try {
            const response = await this.getChatbotResponse(message);
            this.removeTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage("Sorry, I'm having trouble connecting. Please try again later.", 'bot');
            console.error('Chatbot error:', error);
        }
    }

    /**
     * Check if message is India tourism related
     */
    isIndiaTourismRelated(message) {
        const indiaKeywords = [
            'india', 'indian', 'delhi', 'mumbai', 'bangalore', 'kolkata', 'chennai', 'hyderabad',
            'goa', 'kerala', 'rajasthan', 'himachal', 'kashmir', 'assam', 'meghalaya', 'arunachal',
            'tourism', 'travel', 'visit', 'place', 'safety', 'culture', 'food', 'hotel', 'temple',
            'fort', 'palace', 'beach', 'mountain', 'hill', 'river', 'festival', 'monument',
            'taj mahal', 'red fort', 'gateway of india', 'golden temple', 'lotus temple',
            'north east', 'northeast', 'guwahati', 'shillong', 'tawang', 'cherrapunji'
        ];

        const messageLower = message.toLowerCase();
        return indiaKeywords.some(keyword => messageLower.includes(keyword));
    }

    /**
     * Get chatbot response from OpenRouter API
     */
    async getChatbotResponse(message) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Smart Turistom'
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful Indian tourism assistant. Provide accurate, helpful information about tourism in India including places to visit, safety tips, cultural information, and travel advice. Keep responses concise and friendly. Always mention that you specialize in Indian tourism.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    /**
     * Add message to chat
     */
    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start space-x-2 ${sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`;

        const avatar = sender === 'user' ? '👤' : '🤖';
        const bgColor = sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/5';

        messageDiv.innerHTML = `
            <div class="w-6 h-6 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs">${avatar}</span>
            </div>
            <div class="${sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/5'} rounded-lg p-3 max-w-xs">
                <p class="text-sm text-white">${message}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Add typing indicator
     */
    addTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-start space-x-2';
        typingDiv.innerHTML = `
            <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs">🤖</span>
            </div>
            <div class="bg-white/5 rounded-lg p-3 max-w-xs">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Remove typing indicator
     */
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize chatbot
const chatbot = new ChatbotManager();

// Export for global access
window.chatbot = chatbot;
