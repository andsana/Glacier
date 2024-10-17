import { model, Schema } from 'mongoose';

const GlacierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  waterSource: String, // Источник воды для ледника
});

const Glacier = model('Glacier', GlacierSchema);

export default Glacier;
