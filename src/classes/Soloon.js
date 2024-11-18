// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for POLYanets
class Soloon extends AstralObject {
    constructor(row, column, color) {
        super(row, column);
        this.color = color;
    }

    async create(api) {
        return api.postSoloon(this.row, this.column, this.color);
    }
};


module.exports = Soloon;
