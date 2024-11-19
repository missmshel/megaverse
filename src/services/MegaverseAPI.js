const axios = require('axios');
require('dotenv').config();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MegaverseAPI {
    constructor() {
        this.megaURL = process.env.MEGA_URL;
        this.candidateId = process.env.CANDIDATE_ID;
        this.nodeEnv = process.env.NODE_ENV || 'production';
    }

    // Polyanet POST and DELETE 
    async postPolyanet(row, column, retries = 3) {
        
        // Simulate success in dev mode for Phase 1
        if (this.nodeEnv === 'development') {
            console.log(` [DEV MODE] Polyanet created at row ${row}, column ${column}`);
            return;
        }

        try {
            const response = await axios.post(`${this.megaURL}polyanets`, {
                candidateId: this.candidateId,
                row,
                column,
            }, {
                maxRedirects: 5,
            });
            console.log(`Polyanet created at row ${row}, column ${column}`);
        } catch (error) {
            if (error.response && error.response.status === 429 && retries > 0) {
                console.error(`Rate limit exceeded. Retrying in 2 seconds...`);
                await sleep(2000); // Wait for 2 seconds before retrying
                return this.postPolyanet(row, column, retries - 1);
              } else {
                console.error('Error creating Polyanet:', error.message);
              }
        }
    } 

    async deletePolyanet(row, column) {
        try {
            const response = await axios.delete(`${this.megaURL}poyanets`, {
                candidateId: this.candidateId,
                row,
                column,
            });
            console.log(`Polyanet deleted at row ${row}, column ${column}`);
        } catch (error) {
            console.error('Error deleting Polyanet:', error.message);
        }
    }

    // Soloon POST and DELETE
    async postSoloon(row, column, color, retries = 3) {
        try {
            const response = await axios.post(`${this.megaURL}soloons`, {
                candidateId: this.candidateId,
                row,
                column,
                color,
            }, {
                maxRedirects: 5,
            });
            console.log(`${color} Soloon created at row ${row}, column ${column}`);
        } catch (error) {
            if (error.response && error.response.status === 429 && retries > 0) {
                console.error(`Rate limit exceeded. Retrying in 2 seconds...`);
                await sleep(2000); // Wait for 2 seconds before retrying
                return this.postSoloon(row, column, color, retries - 1);
              } else {
                console.error('Error creating Polyanet:', error.message);
              }
        }
    } 

    async deleteSoloon(row, column) {
        try {
            const response = await axios.delete(`${this.megaURL}soloons`, {
                candidateId: this.candidateId,
                row,
                column,
            });
            console.log(`Soloon deleted at row ${row}, column ${column}`);
        } catch (error) {
            console.error('Error deleting Polyanet:', error.message);
        }
    }


    // Cometh POST and DELETE
    async postCometh(row, column, direction, retries = 3) {
        try {
            const response = await axios.post(`${this.megaURL}comeths`, {
                candidateId: this.candidateId,
                row,
                column,
                direction
            }, {
                maxRedirects: 5,
            });
            console.log(`Cometh created at row ${row}, column ${column} facing ${direction}`);
        } catch (error) {
            if (error.response && error.response.status === 429 && retries > 0) {
              console.error(`Rate limit exceeded. Retrying in 2 seconds...`);
              await sleep(2000); // Wait for 2 seconds before retrying
              return this.postCometh(row, column, direction, retries - 1);
            } else {
              console.error('Error creating Polyanet:', error.message);
            }
        }
    } 

    async deleteCometh(row, column) {
        try {
            const response = await axios.delete(`${this.megaURL}comeths`, {
                candidateId: this.candidateId,
                row,
                column,
            });
            console.log(`Cometh deleted at row ${row}, column ${column}`);
        } catch (error) {
            console.error('Error deleting Cometh:', error.message);
        }
    }

    // Goal Map call
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