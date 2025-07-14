const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const decorationSchema = new Schema({
    title: String,
    description: String,
    sizes: [{ // Array of objects
        size: String,
        price: Number
    }],
    imageUrl: String,
    tags: [String]
});

const Decoration = mongoose.model('Decoration', decorationSchema);
module.exports = Decoration;