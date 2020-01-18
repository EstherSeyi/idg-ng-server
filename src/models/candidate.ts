import mongoose from 'mongoose';
import uuidV4 from 'uuid/v4';

const CandidateSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    name: {
      type: String,
      minlength: 2,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    marital_status: {
      type: String,
      trim: true,
    },
    family: {
      type: Number,
      trim: true,
    },
    age_group: {
      type: Number,
      trim: true,
    },
    children: {
      type: Number,
      trim: true,
    },
    date_added: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

CandidateSchema.pre('save', async function() {
  if (this.isNew) {
    this.id = uuidV4();
  }
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
export default Candidate;
