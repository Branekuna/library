const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KittenSchema = new Schema({
    name: {
        type: String,
        require: true 
    },
    date: { type: Date, default: Date.now }
});

KittenSchema.statics.getAll = function () {
    return this.find({});
};

KittenSchema.statics.createKitten = function (name) {
    this.create({name: name}).then((kitten, err) => {
        if(err) {
            console.error(`Error creating a kitten: ${name}, due to: ${err.message}`);
            throw err;
        } else {
            return kitten;
        }
    }).catch(err => {
        console.log("error creatingn kitten ", err);
    });
};

module.exports = Kitten = mongoose.model('kitten', KittenSchema);