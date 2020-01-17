import mongoose, { DocumentQuery } from 'mongoose';
import uuidV4 from 'uuid/v4';
import { hash } from 'bcryptjs';
import { IUserDocument } from '../typings/user';

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    name: {
      type: String,
      trim: true,
      maxlength: 150,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      minlength: 8,
      maxlength: 254,
      lowercase: true,
      validate: [
        // @ts-ignore
        (email: string): boolean => User.where('email', email).none(),
        'email is already being used.',
      ],
    },
    password: {
      type: String,
      minlength: 7,
      maxlength: 100,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUserDocument>('save', async function() {
  if (this.isNew) {
    this.id = uuidV4();
  }
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

UserSchema.query.none = async function(
  this: DocumentQuery<any, IUserDocument>,
): Promise<boolean> {
  return (await this.countDocuments()) === 0;
};

const User = mongoose.model<IUserDocument>('User', UserSchema);
export default User;
