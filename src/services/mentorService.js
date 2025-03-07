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

  // Register a new mentor
  async registerMentor(mentorData) {
    try {
      console.log("API_URL:", this.API_URL);
      console.log("Sending registration data:", JSON.stringify(mentorData));
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(mentorData)
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        console.error("Error status:", response.status);
        console.error("Error response:", responseText);
        throw new Error(`Error ${response.status}: ${responseText || response.statusText}`);
      }

      // Parse the text response back to JSON
      const responseData = responseText ? JSON.parse(responseText) : {};
      return responseData;
    } catch (error) {
      console.error('Failed to register mentor:', error);
      throw error;
    }
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

      // Add this to see the raw response
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        console.error("Error status:", response.status);
        console.error("Error response:", responseText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Parse the text response back to JSON
      const responseData = responseText ? JSON.parse(responseText) : {};
      return responseData;
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

      const token = sessionStorage.getItem('token');

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

  //CHECK EMAIL
  async checkEmail(email) {
    console.log(this.API_URL)
  try {
    const response = await fetch(`${this.API_URL}/auth/check-email?email=${encodeURIComponent(email)}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json(); // Parse JSON response properly
  } catch (error) {
    console.error("Failed to check email:", error);
    throw error;
  }
}
}

// Create a singleton instance
const mentorService = new MentorService();
export default mentorService;