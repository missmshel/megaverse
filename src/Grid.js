const Polyanet = require('./classes/Polyanet');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Creates the Grid

class Grid {
    constructor(api) {
        this.api = api;
    }

    async createPolyanetCross() {

      /* Alternative option for solving Phase 1 Grid problem that isn't reliant on manual coding*/
      // const goalMapLength = 11;
      // const goalMapBorderLeft = 1;
      // const goalMapBorderRight = 9;

      // Iterate over the entire grid to determine placement of polyanets
      // let polyanetCoordinates = [];
      // for (let row = 0; row < goalMapLength; row++) {
      //   for (let column = 0; column < goalMapLength; column++) {
      //     const rowDiff = row + 1;
      //     const columnDiff = goalMapLength - column;
      //     if (row > goalMapBorderLeft && row < goalMapBorderRight) {
      //       if (row === column || rowDiff === columnDiff) {
      //           polyanetCoordinates.push([row, column]);
      //       }
      //     }
      //   }
      // }

      const polyanetCoordinates = [
        [2, 2], [2, 8],
        [3, 3], [3, 7],
        [4, 4], [4, 6],
        [5, 5], 
        [6, 4], [6, 6],
        [7, 3], [7, 7],
        [8, 2], [8, 8]
      ];

      const batchSize = 3; // send requests in batches of 3 to avoid overloading system
      const delayBetweenBatches = 500; // 500 millisecond delaye between batches

      // Process the coordinates in batches to avoid rate limiting
      await processInBatches(polyanetCoordinates, batchSize, delayBetweenBatches, async ([row, column]) => {
        const polyanet = new Polyanet(row, column);
        await polyanet.create(this.api);
        });  
          console.log('Polyanet cross grid created successfully.');
    }
}

// Utility function to process requests in batches
async function processInBatches(items, batchSize, delay, callback) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(callback));
    await sleep(delay);
  }
}


module.exports = Grid;