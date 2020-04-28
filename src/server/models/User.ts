import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface ValidateFn<T> {
  (value: T): boolean;
}

const emailValidation: ValidateFn<any> = (value: string): boolean => {
  if (!validator.isEmail(value)) {
    throw new Error("Email is invalid.");
  }
  return true;
};

const userSchema = new mongoose.Schema(
  {
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
      validate: emailValidation,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      trim: true,
      type: String,
    },
  },
  { timestamps: true }
);

function applicationToJSON(): void {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  return userObject;
}

userSchema.methods.toJSON = applicationToJSON;

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user: UserDocument = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to log in.");
  }

  return user;
};

userSchema.pre<UserDocument>("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;