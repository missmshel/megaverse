// import AstralObject class
const AstralObject = require('./AstralObject');

// Subclass of AstralObject for POLYanets
class Polyanet extends AstralObject {
    async create(api) {
        return api.postPolyanet(this.row, this.column);
    }
};


module.exports = Polyanet;
