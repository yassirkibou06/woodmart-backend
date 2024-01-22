const moongoose = require('mongoose');

const categorySchema = new moongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
},
{
    timestamps: true
}
);


module.exports = moongoose.model('Category', categorySchema);
