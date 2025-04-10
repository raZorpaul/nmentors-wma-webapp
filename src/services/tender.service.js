const API_URL = import.meta.env.VITE_API_URL;

class TenderService {
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

    //Fetch Active Tenders to apply
    async getActiveTenders() {
        try {
            const response = await fetch(`${API_URL}/tenders/active`);
            if (!response.ok) {
                throw new Error(`Error fetching active tenders: ${response.statusText}`);
            }
            const data = await response.json();
            return data.tenders;
        } catch (error) {
            console.error('Error fetching active tenders:', error);
            throw error;
        }
    };

    // Fetch tender details by ID
 async  getTenderDetails (id){
  try {
    const response = await fetch(`${API_URL}/tenders/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching tender details: ${response.statusText}`);
    }
    const data = await response.json();
    return data.tender;
  } catch (error) {
    console.error('Error fetching tender details:', error);
    throw error;
  }
};
}

// Create a singleton instance
const tenderService= new TenderService();
export default tenderService;