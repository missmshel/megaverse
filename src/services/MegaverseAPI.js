const axios = require('axios');
require('dotenv').config();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MegaverseAPI {
    constructor() {
        this.megaURL = process.env.MEGA_URL;
        this.candidateId = process.env.CANDIDATE_ID;
        this.nodeEnv = process.env.NODE_ENV || 'production';
    }

    // Generic POST method for creating entity (Cometh, Polyanet, or Soloon)
    async postShape(shape, data, retries = 3) {
        // Simulate success in dev mode
        if (this.nodeEnv === 'development') {
            console.log(` [DEV MODE] ${shape} created at row ${data.row}, column ${data.column}`);
            return;
        }

        const url = `${this.megaURL}${shape}`;

        try {
        console.log(`Attempting to create ${shape} with data:`, data);
            const response = await axios.post(
                url,
                {   
                    candidateId: this.candidateId,
                    ...data
                },
                {
                    maxRedirects: 5,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(`${shape} created successfully at row ${data.row}, column ${data.column}`);
        } catch (error) {
            if (error.response && error.response.status === 429 && retries > 0) {
                console.error(`Rate limit exceeded for ${shape}. Retrying in 2 seconds...`);
                await sleep(2000); // Wait for 2 seconds before retrying
                return this.postShape(shape, data, retries - 1);
            } else if (error.response && error.response.status === 400) {
                console.error(`400 Bad Request for ${shape}: Check if the data is properly formatted. Row: ${data.row}, Column: ${data.column}, Details:`, data);
            } else {
                console.error(`Error creating ${shape}:`, error.message);
            }
        }
    } 

    // Generic DELETE method for deleting any entity (Cometh, Polyanet, Soloon)
    async deleteShape(shape, row, column) {
        try {
            const response = await axios.delete(`${this.megaURL}${shape}`, {
                data: {
                    candidateId: this.candidateId,
                    row,
                    column,
                }
            });
            console.log(`${shape} deleted at row ${row}, column ${column}`);
        } catch (error) {
            console.error(`Error deleting ${shape}:`, error.message);
        }
    }
        
    // Goal Map call to fetch goal map object
    async getGoalMap() {
        try {
          const response = await axios.get(`${this.megaURL}map/${this.candidateId}/goal`);
          return response.data;
        } catch (error) {
          console.error('Error fetching goal map:', error);
        }
      }
}

module.exports = MegaverseAPI;