// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for POLYanets
class Cometh extends AstralObject {
    static DIRECTION_OPTIONS = ['up', 'down', 'right', 'left'];

    constructor(row, column, direction) {
        super(row, column);
        if (!Cometh.DIRECTION_OPTIONS.includes(direction)) {
            throw new Error(`Invalid direction. Valid directions are ${Cometh.DIRECCTION_OPTIONS.join(', ')}`);
        }
        this.direction = direction;
    }

    async create(api) {
        return api.postCometh(this.row, this.column, this.direction);
    }
};


module.exports = Cometh;
