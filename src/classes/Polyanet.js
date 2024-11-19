// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for POLYanets
class Polyanet extends AstralObject {
    toApiData() {
        return {
            row: this.row,
            column: this.column,
        };
    }

    async create(api) {
        return await api.postShape('polyanets', this.toApiData());
    }

    async delete(api) {
        return await api.deleteShape('polyanets', this.row, this.column);
    }
};


module.exports = Polyanet;
