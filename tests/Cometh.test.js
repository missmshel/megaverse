const Cometh = require('../src/classes/Cometh');
const MegaverseAPI = require('../src/services/MegaverseAPI');
jest.mock('../src/services/MegaverseAPI');

describe('Cometh', () => {
    let api;

    beforeEach(() => {
        api = new MegaverseAPI();
    });

    test('should create a cometh via API', async () => {
        const cometh = new Cometh(3, 4, 'up');
        await cometh.create(api);

        expect(api.postShape).toHaveBeenCalledWith('comeths', { row: 3, column: 4, direction: 'up' });
    });

    test('should throw error for invalid direction', () => {
        try {
            new Cometh(3, 4, 'invalidDirection');
        } catch (error) {
            expect(error.message).toBe('Invalid direction. Valid directions are up, down, right, left');
        }
    });
});
