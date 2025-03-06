// services/MentorService.js
const API_URL = import.meta.env.VITE_API_URL;

class MentorService {
  constructor() {
    this.API_URL = API_URL;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  // Get the authorization header with token
  getAuthHeader() {
    const token = sessionStorage.getItem('token');
    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`
    };
  }

  // Get mentor profile
  async getMentorProfile() {
    try {
      const response = await fetch(`${this.API_URL}/mentors/profile`, {
        method: 'GET',
        headers: this.getAuthHeader()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch mentor profile:', error);
      throw error;
    }
  }

  // Update mentor profile
  async updateMentorProfile(updates) {
      console.log("Sending profile update:", JSON.stringify(updates));
    try {
      const response = await fetch(`${this.API_URL}/mentors/profile`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update mentor profile:', error);
      throw error;
    }
  }

  // Update specific field
  async updateField(field, value) {
    return this.updateMentorProfile({ [field]: value });
  }

  // Upload CV
  async uploadCV(file) {
    try {
      const formData = new FormData();
      formData.append('cv', file);

      const token = localStorage.getItem('authToken');

      const response = await fetch(`${this.API_URL}/upload-cv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to upload CV:', error);
      throw error;
    }
  }

  // Get mentor expertise
  async getMentorExpertise() {
    try {
      const response = await fetch(`${this.API_URL}/expertise`, {
        method: 'GET',
        headers: this.getAuthHeader()
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch mentor expertise:', error);
      throw error;
    }
  }

  // Update mentor expertise
  async updateExpertise(expertise) {
    try {
      const response = await fetch(`${this.API_URL}/expertise`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify({ expertise })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update mentor expertise:', error);
      throw error;
    }
  }
}

// Create a singleton instance
const mentorService = new MentorService();
export default mentorService;