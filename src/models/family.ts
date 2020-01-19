import mongoose from 'mongoose';
import uuidV4 from 'uuid/v4';

const FamilySchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    name: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    total_number: {
      type: Number,
      trim: true,
    },
    children: {
      type: Number,
      trim: true,
    },
    lga: {
      type: String,
      trim: true,
    },
    date_added: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

FamilySchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuidV4();
  }
});

const Family = mongoose.model('Family', FamilySchema);
export default Family;
