const MegaverseAPI = require('../src/services/MegaverseAPI');
const axios = require('axios');
jest.mock('axios');

describe('MegaverseAPI', () => {
    let api;

    beforeEach(() => {
        api = new MegaverseAPI();
        api.candidateId = 'test-candidate-id';
        api.megaURL = 'http://testurl.com/';
    });

    test('should successfully create a polyanet', async () => {
        axios.post.mockResolvedValue({});

        await api.postShape('polyanets', { row: 1, column: 1 });

        expect(axios.post).toHaveBeenCalledWith(
            'http://testurl.com/polyanets',
            { candidateId: 'test-candidate-id', row: 1, column: 1 },
            { maxRedirects: 5, headers: { 'Content-Type': 'application/json' } }
        );
    });

    test('should handle 400 error on postShape', async () => {
        axios.post.mockRejectedValue({ response: { status: 400 } });

        console.error = jest.fn();

        await api.postShape('polyanets', { row: 1, column: 1 });

        expect(console.error).toHaveBeenCalledWith(
            '400 Bad Request for polyanets: Check if the data is properly formatted. Row: 1, Column: 1, Details:', { row: 1, column: 1 }
        );
    });

    test('should successfully delete a polyanet', async () => {
        axios.delete.mockResolvedValue({});

        await api.deleteShape('polyanets', 1, 1);

        expect(axios.delete).toHaveBeenCalledWith(
            'http://testurl.com/polyanets',
            {
                data: {
                    candidateId: 'test-candidate-id',
                    row: 1,
                    column: 1,
                }
            }
        );
    });
});
