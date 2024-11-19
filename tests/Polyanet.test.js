const Polyanet = require('../src/classes/Polyanet');
const MegaverseAPI = require('../src/services/MegaverseAPI');
jest.mock('../src/services/MegaverseAPI');

describe('Polyanet', () => {
    let api;

    beforeEach(() => {
        api = new MegaverseAPI();
    });

    test('should create a polyanet via API', async () => {
        const polyanet = new Polyanet(1, 1);
        await polyanet.create(api);

        expect(api.postShape).toHaveBeenCalledWith('polyanets', { row: 1, column: 1 });
    });

    test('should delete a polyanet via API', async () => {
        const polyanet = new Polyanet(1, 1);
        await polyanet.delete(api);

        expect(api.deleteShape).toHaveBeenCalledWith('polyanets', 1, 1);
    });
});
