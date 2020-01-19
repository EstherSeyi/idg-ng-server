import mongoose from 'mongoose';
import uuidV4 from 'uuid/v4';

const CampSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    name: {
      type: String,
      minlength: 2,
      trim: true,
    },
    state: {
      type: String,
      minlength: 1,
      trim: true,
    },
    lga: {
      type: String,
      minlength: 1,
      trim: true,
    },
  },
  { timestamps: true },
);

CampSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuidV4();
  }
});

const Camp = mongoose.model('Camp', CampSchema);
export default Camp;
