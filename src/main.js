const MegaverseAPI = require('./services/MegaverseAPI');
const Grid = require('./Grid');

(async () => {
    const api = new MegaverseAPI();
    const grid = new Grid(api);

    await grid.createFromGoalMap();
})();