const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const unitSchema = mongoose.Schema({
  name: String,
  s_no: Number,
  chapters: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chapter',
      },
    ],
    required: true,
  },
});

unitSchema.plugin(toJSON);
unitSchema.plugin(paginate);

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
