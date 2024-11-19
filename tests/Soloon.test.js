const Soloon = require('../src/classes/Soloon');
const MegaverseAPI = require('../src/services/MegaverseAPI');
jest.mock('../src/services/MegaverseAPI');

describe('Soloon', () => {
    let api;

    beforeEach(() => {
        api = new MegaverseAPI();
    });

    test('should create a soloon via API', async () => {
        const soloon = new Soloon(2, 3, 'blue');
        await soloon.create(api);

        expect(api.postShape).toHaveBeenCalledWith('soloons', { row: 2, column: 3, color: 'blue' });
    });

    test('should throw error for invalid color', () => {
        expect(() => new Soloon(2, 3, 'invalidColor')).toThrow('Invalid color choice: invalidColor. Color options include blue, red, purple, white');
    });
});
