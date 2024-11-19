const MegaverseAPI = require('../src/services/MegaverseAPI');
const Grid = require('../src/Grid');

jest.mock('../src/services/MegaverseAPI');

describe('Grid', () => {
    let api;

    beforeEach(() => {
        api = new MegaverseAPI();
    });

    test('should create entities from the goal map', async () => {
        api.getGoalMap.mockResolvedValue({
            goal: [
                ['POLYANET', 'BLUE_SOLOON', 'RIGHT_COMETH'],
                ['RED_SOLOON', 'POLYANET', 'LEFT_COMETH']
            ]
        });

        const grid = new Grid(api);
        await grid.createFromGoalMap();

        expect(api.postShape).toHaveBeenCalledTimes(6);
        expect(api.postShape).toHaveBeenCalledWith('polyanets', { row: 0, column: 0 });
        expect(api.postShape).toHaveBeenCalledWith('soloons', { row: 0, column: 1, color: 'blue' });
        expect(api.postShape).toHaveBeenCalledWith('comeths', { row: 0, column: 2, direction: 'right' });
        expect(api.postShape).toHaveBeenCalledWith('soloons', { row: 1, column: 0, color: 'red' });
        expect(api.postShape).toHaveBeenCalledWith('polyanets', { row: 1, column: 1 });
        expect(api.postShape).toHaveBeenCalledWith('comeths', { row: 1, column: 2, direction: 'left' });
    });

    test('should log error when unable to fetch the goal map', async () => {
        api.getGoalMap.mockResolvedValue(null);

        console.error = jest.fn();

        const grid = new Grid(api);
        await grid.createFromGoalMap();

        expect(console.error).toHaveBeenCalledWith('Unable to fetch the goal map!');
    });
});
