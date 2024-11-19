// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for SOLoons
class Soloon extends AstralObject {
    static COLOR_OPTIONS = ['blue', 'red', 'purple', 'white']

    constructor(row, column, color) {
        super(row, column);
        if (!Soloon.COLOR_OPTIONS.includes(color)) {
            throw new Error(`Invalid color choice: ${color}. Color options include ${Soloon.COLOR_OPTIONS.join(', ')}`);
        }
        this.color = color;
    }

    toApiData() {
        return {
            row: this.row,
            column: this.column,
            color: this.color,
        };
    }

    async create(api) {
        return api.postShape('soloons', this.toApiData());
    }

    async delete(api) {
        return await api.deleteShape('soloons', this.row, this.column);
    }
};


module.exports = Soloon;
