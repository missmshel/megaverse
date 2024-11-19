// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for POLYanets
class Soloon extends AstralObject {
    static COLOR_OPTIONS = ['blue', 'red', 'purple', 'white']

    constructor(row, column, color) {
        super(row, column);
        if (!Soloon.COLOR_OPTIONS.includes(color)) {
            throw new Error(`Invalid color choice: ${color}. Color options include ${Soloon.COLOR_OPTIONS.join(', ')}`);
        }
        this.color = color;
    }

    async create(api) {
        return api.postSoloon(this.row, this.column, this.color);
    }
};


module.exports = Soloon;
