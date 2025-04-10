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
        return this.updateMentorProfile({[field]: value});
    }

    // Upload CV
    async uploadCV(file) {
        try {
            const formData = new FormData();
            formData.append('cv', file);

            // const token = sessionStorage.getItem('token');

            const response = await fetch(`${this.API_URL}/mentors/upload-cv`, {
                method: 'POST',
                body: formData
            });

            // if (!response.ok) {
            //     throw new Error(`Error ${response.status}: ${response.statusText}`);
            // }

            return await response.json();
        } catch (error) {
            console.error('Failed to upload CV:', error);
            throw error;
        }
    }

    //delete file
    async deleteFile(fileKey) {
    try {
        // Create the JSON payload with the fileKey
        const payload = { fileKey };

        // Make the DELETE request to the backend
        const response = await fetch(`${this.API_URL}/mentors/delete-file`, {
            method: 'DELETE', // Use DELETE method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(payload), // Convert the payload to a JSON string
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        console.error('Failed to delete CV:', error);
        throw error;
    }
}

async uploadCertificates(files) {
    try {
        const formData = new FormData();

        // Loop through the files and append each one to the FormData object
        for (const file of files) {
            formData.append('certificates', file); // 'certificates' is the field name expected by the backend
        }

        const response = await fetch(`${this.API_URL}/mentors/upload-certificates`, {
            method: 'POST',
            body: formData,
        });

        // Check if the response is not OK
        if (!response.ok) {
            const errorData = await response.json(); // Parse error response
            throw new Error(
                `Error ${response.status}: ${errorData.message || response.statusText}`
            );
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        console.error('Failed to upload certificates:', error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
}


    // Update mentor expertise
    async updateExpertise(expertise) {
        try {
            const response = await fetch(`${this.API_URL}/expertise`, {
                method: 'PUT',
                headers: this.getAuthHeader(),
                body: JSON.stringify({expertise})
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

    //create a password
    async createPassword({token, password}) {
        try {
            console.log(`${this.API_URL}/mentors/create-password`, token, password);
            const response = await fetch(`${this.API_URL}/mentors/create-password`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({token, password}),
            });
            // eslint-disable-next-line no-debugger
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Error ${response.status}`);
            }

            console.log(data);
            return data;
        } catch (error) {
            console.error("Failed to set password:", error);
            throw error;
        }
    }



}


// Create a singleton instance
const mentorService = new MentorService();
export default mentorService;