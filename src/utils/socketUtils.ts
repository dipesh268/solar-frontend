
// Enhanced socket functionality with backend integration
class SocketManager {
  private channel: BroadcastChannel;
  private listeners: Map<string, Function[]> = new Map();

  constructor() {
    this.channel = new BroadcastChannel('solar_admin_updates');
    this.setupChannelListener();
  }

  private setupChannelListener() {
    this.channel.onmessage = (event) => {
      const { type, data } = event.data;
      const callbacks = this.listeners.get(type) || [];
      callbacks.forEach(callback => callback(data));
    };
  }

  // Listen for specific events
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  // Remove event listener
  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  // Emit events to all connected browsers
  emit(event: string, data: any) {
    this.channel.postMessage({ type: event, data });
    console.log(`Socket event emitted: ${event}`, data);
  }

  // Store data and notify all browsers
  storeAndBroadcast(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
    this.emit('data_updated', { key, data });
  }

  // Notify about new customer submission
  notifyNewCustomer(customerData: any) {
    this.emit('new_customer', customerData);
  }

  // Notify about customer updates
  notifyCustomerUpdate(customerId: string, updateData: any) {
    this.emit('customer_updated', { customerId, updateData });
  }

  // Close the connection
  close() {
    this.channel.close();
  }
}

// Create singleton instance
export const socketManager = new SocketManager();

// Helper functions for backward compatibility
export const updateSolarLeads = (newLead: any) => {
  const existingData = JSON.parse(localStorage.getItem('solarLeads') || '[]');
  const updatedData = [...existingData, newLead];
  socketManager.storeAndBroadcast('solarLeads', updatedData);
  socketManager.notifyNewCustomer(newLead);
};

export const getSolarLeads = () => {
  return JSON.parse(localStorage.getItem('solarLeads') || '[]');
};

export const clearSolarLeads = () => {
  socketManager.storeAndBroadcast('solarLeads', []);
};

// New helper functions for database integration
export const notifyNewCustomerSubmission = (customerData: any) => {
  socketManager.notifyNewCustomer(customerData);
};

export const notifyQuizCompletion = (customerId: string, quizAnswers: any) => {
  socketManager.notifyCustomerUpdate(customerId, { quizAnswers });
};
