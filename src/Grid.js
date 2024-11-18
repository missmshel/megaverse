const Polyanet = require('./classes/Polyanet');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Creates the Grid

class Grid {
    constructor(api) {
        this.api = api;
    }

    // async createFromGoalMap() {
    //     const goalMap = await this.api.getGoalMap();

    //     if (!goalMap) {
    //         console.error('Unable to fetch the goal map!');
    //         return;
    //     }

    //     // Determine the megaverse groalMap grid dimensions
    //     const numMapRows = goalMap.length;
    //     const numMapColumns = goalMap[0]?.length || 0;

    //     console.log(`Goal Map dimensions: ${numMapRows} rows by ${numMapColumns} columns`);

    //     // Iterate over each cell of the goalMap
    //     for (let row = 0; row < numMapRows; row++) {
    //         for (let column = 0; column <= numMapColumns; column++) {
    //              const cell = goalMap[row][column];

                 

    //             }
    //         }
    //     }

    // }

    async createPolyanetCross() {
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

        await processInBatches(polyanetCoordinates, batchSize, delayBetweenBatches, async ([row, column]) => {
            const polyanet = new Polyanet(row, column);
            await polyanet.create(this.api);
          });
      
          console.log('Polyanet cross grid created successfully.');
        }

        // const goalMap = await this.api.getGoalMap();

        // if (!goalMap) {
        //     console.error('Unable to fetch the goal map!');
        //     return;
        // }

        // // Determine the megaverse groalMap grid dimensions
        // const numMapRows = goalMap.length;
        // const numMapColumns = goalMap[0]?.length || 0;

        // console.log(`Goal Map dimensions: ${numMapRows} rows by ${numMapColumns} columns`);

        // // Iterate over each cell of the goalMap
        // for (let row = 0; row < numMapRows; row++) {
        //     for (let column = 0; column <= numMapColumns; column++) {
        //         const cell = goalMap[row][column];
                
        //         if (polyanetCoordinates.includes(cell)) {
        //             const polyanet = new Polyanet(row, column);
        //             await polyanet.create(this.api)
        //         }


        //         }
        // }
        // }

        // for (const [row, column] of polyanetCoordinates) {
        //     const polyanet = new Polyanet(row, column);
        //     await polyanet.create(this.api);
        // }
    // }
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