const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const subjectSchema = mongoose.Schema({
  name: String,
  units: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Unit',
      },
    ],
    required: true,
  },
});

subjectSchema.plugin(toJSON);
subjectSchema.plugin(paginate);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
