const MegaverseAPI = require('../src/services/MegaverseAPI');
const Grid = require('../src/Grid');
jest.mock('../src/services/MegaverseAPI');

describe('Main Integration', () => {
    let api, grid;

    beforeEach(() => {
        api = new MegaverseAPI();
        grid = new Grid(api);
    });

    test('should create grid from goal map', async () => {
        api.getGoalMap.mockResolvedValue({
            goal: [
                ['POLYANET', 'RED_SOLOON', 'UP_COMETH']
            ]
        });

        await grid.createFromGoalMap();

        expect(api.postShape).toHaveBeenCalledTimes(3);
        expect(api.postShape).toHaveBeenCalledWith('polyanets', { row: 0, column: 0 });
        expect(api.postShape).toHaveBeenCalledWith('soloons', { row: 0, column: 1, color: 'red' });
        expect(api.postShape).toHaveBeenCalledWith('comeths', { row: 0, column: 2, direction: 'up' });
    });
});

