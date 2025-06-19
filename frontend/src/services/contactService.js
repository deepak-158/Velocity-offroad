
import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const CONTACT_API = `${API_URL}/contact`;

// LocalStorage key for contact submissions
const CONTACT_STORAGE_KEY = 'racing_contact_submissions';

/**
 * Save a new contact form submission
 * @param {Object} formData - The form data to save
 * @returns {Promise} - Resolves with success message or rejects with error
 */
export const saveContactSubmission = async (formData) => {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Please fill in all required fields (name, email, message)');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Try to submit via API first
    try {
      const response = await axios.post(CONTACT_API, {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      });
      
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      };
    } catch (apiError) {
      console.log('API submission failed, falling back to local storage');
      
      // Fallback to localStorage if API is not available
      const submission = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      // Get existing submissions
      const existingSubmissions = getStoredSubmissions();
      
      // Add new submission
      existingSubmissions.push(submission);
      
      // Store updated submissions
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existingSubmissions));
      
      return {
        success: true,
        message: 'Thank you for your message! We have saved it locally and will process it soon.'
      };
    }
  } catch (error) {
    console.error('Error saving contact submission:', error);
    throw new Error(error.message || 'Failed to submit contact form. Please try again later.');
  }
};

/**
 * Get stored contact submissions from localStorage
 * @returns {Array} - Array of contact submissions
 */
const getStoredSubmissions = () => {
  try {
    const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading stored submissions:', error);
    return [];
  }
};

/**
 * Get all contact form submissions
 * @returns {Promise<Array>} - Array of contact submissions
 */
export const getContactSubmissions = async () => {
  try {
    // Try to fetch from API first
    const response = await axios.get(CONTACT_API);
    return response.data;
  } catch (apiError) {
    console.log('API fetch failed, returning local submissions');
    // Fallback to localStorage
    return getStoredSubmissions();
  }
};

/**
 * Clear all contact form submissions
 * @returns {Promise<boolean>} - Success status
 */
export const clearContactSubmissions = async () => {
  try {
    // Try to clear via API first
    await axios.delete(CONTACT_API);
    
    // Also clear local storage
    localStorage.removeItem(CONTACT_STORAGE_KEY);
    
    return true;
  } catch (apiError) {
    console.log('API clear failed, clearing local storage only');
    // Fallback to clearing localStorage only
    localStorage.removeItem(CONTACT_STORAGE_KEY);
    return true;
  }
};

/**
 * Open WhatsApp chat with the team
 */
export const openWhatsAppChat = () => {
  window.open('https://wa.me/919845123456', '_blank');
  return true;
};