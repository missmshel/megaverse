// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for comETHs
class Cometh extends AstralObject {
    static DIRECTION_OPTIONS = ['up', 'down', 'right', 'left'];

    constructor(row, column, direction) {
        super(row, column);
        if (!Cometh.DIRECTION_OPTIONS.includes(direction)) {
            throw new Error(`Invalid direction. Valid directions are ${Cometh.DIRECTION_OPTIONS.join(', ')}`);
        }
        this.direction = direction;
    }

    toApiData() {
        return {
            row: this.row,
            column: this.column,
            direction: this.direction,
        };
    }

    async create(api) {
        return await api.postShape('comeths', this.toApiData());
    }

    async delete(api) {
        return await api.deleteShape('comeths', this.row, this.column);
    }
};


module.exports = Cometh;
