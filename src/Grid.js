const Polyanet = require('./classes/Polyanet');
const Cometh = require('./classes/Cometh');
const Soloon = require('./classes/Soloon');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* Final solution. Does encounter occasional "Rate limit exceeded. Retrying in 2 seconds..." message, but still accurately generates the map solution */
class Grid {
  constructor(api) {
      this.api = api;
  }

  async createFromGoalMap() {

      // Step 1: Fetch the goal map to determine the grid requirements
      const goalMapResponse = await this.api.getGoalMap();
      if (!goalMapResponse || !goalMapResponse.goal) {
          console.error('Unable to fetch the goal map!');
          return;
      }

      const goalMap = goalMapResponse.goal;
      const numRows = goalMap.length;
      const numCols = goalMap[0]?.length || 0;

      const batchSize = 5; // Number of requests to send at once
      const delayBetweenBatches = 1000; // 500 ms delay between batches

      // Step 2: Iterate over the goal map and determine which entities to create
      let entitiesToCreate = [];
      for (let row = 0; row < numRows; row++) {
          for (let column = 0; column < numCols; column++) {
              const cell = goalMap[row][column];

              if (cell === 'POLYANET') {
                  entitiesToCreate.push(new Polyanet(row, column));
              } else if (cell.endsWith('_SOLOON')) {
                  const color = cell.split('_')[0].toLowerCase(); // Extract the color
                  entitiesToCreate.push(new Soloon(row, column, color));
              } else if (cell.endsWith('_COMETH')) {
                  const direction = cell.split('_')[0].toLowerCase(); // Extract the direction
                  entitiesToCreate.push(new Cometh(row, column, direction));
              }
          }
      }

      // Step 3: Process the creation of entities in batches
      await processInBatches(entitiesToCreate, batchSize, delayBetweenBatches, async (entity) => {
          await entity.create(this.api);
      });

      console.log('Goal map megaverse created successfully.');
  }
}

// Utility function to process requests in batches
async function processInBatches(items, batchSize, delay, callback) {
  for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);

      for (const item of batch) {
        try {
          await callback(item);
          await sleep(200); // small delay between each request within the batching
        } catch (error) {
          console.error(`Error creating ${entity} at row $item.row}, column {item.column}`)
        }
      }

      await sleep(delay); // delay between batches
  }
}

/* ~~  Alternate Phase 2 solution. This is the tortoise solution. Takes its time with a controlled loop with delay. Accurately generates map solution, but time cost isn't worth it. ~~


class Grid {
    constructor(api) {
        this.api = api;
    }

    async createFromGoalMap() {
        // Step 1: Fetch the goal map to determine the grid requirements
        const goalMapResponse = await this.api.getGoalMap();
        if (!goalMapResponse || !goalMapResponse.goal) {
            console.error('Unable to fetch the goal map!');
            return;
        }

        const goalMap = goalMapResponse.goal;
        const numRows = goalMap.length;
        const numCols = goalMap[0]?.length || 0;

        // Step 2: Iterate over the goal map and create entities sequentially
        for (let row = 0; row < numRows; row++) {
            for (let column = 0; column < numCols; column++) {
                const cell = goalMap[row][column];
                try {
                    await this.createEntityFromCell(cell, row, column);
                    await sleep(500); // Delay between creating each entity to avoid rate limits
                } catch (error) {
                    console.error(`Failed to create entity at row ${row}, column ${column}: ${error.message}`);
                }
            }
        }

        console.log('Goal map megaverse created successfully.');
    }

    // Method to determine which entity to create based on the cell content
    async createEntityFromCell(cell, row, column) {
        if (cell === 'POLYANET') {
            const polyanet = new Polyanet(row, column);
            await polyanet.create(this.api);
        } else if (cell.endsWith('_SOLOON')) {
            // Extract the color from the cell
            const color = cell.split('_')[0].toLowerCase();
            if (Soloon.COLOR_OPTIONS.includes(color)) {
                const soloon = new Soloon(row, column, color);
                await soloon.create(this.api);
            } else {
                console.warn(`Invalid Soloon color "${color}" at row ${row}, column ${column}`);
            }
        } else if (cell.endsWith('_COMETH')) {
            // Extract the direction from the cell
            const direction = cell.split('_')[0].toLowerCase();
            if (Cometh.DIRECTION_OPTIONS.includes(direction)) {
                const cometh = new Cometh(row, column, direction);
                await cometh.create(this.api);
            } else {
                console.warn(`Invalid Cometh direction "${direction}" at row ${row}, column ${column}`);
            }
        }
    }
}

*/

/*  ~~ Original Phase 1 manual coded solution. Prior to writing out the goalMap functionality ~~

class Grid {
    constructor(api) {
        this.api = api;
    }

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

*/

module.exports = Grid;