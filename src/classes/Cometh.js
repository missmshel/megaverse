// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for POLYanets
class Cometh extends AstralObject {
    constructor(row, column, direction) {
        super(row, column);
        this.direction = direction;
    }

    async create(api) {
        return api.postSoloon(this.row, this.column, this.direction);
    }
};


module.exports = Cometh;
