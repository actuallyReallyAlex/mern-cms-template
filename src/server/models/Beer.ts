import mongoose from "mongoose";

const beerSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

function applicationToJSON(): void {
  return this.toObject();
}

beerSchema.methods.toJSON = applicationToJSON;

const Beer = mongoose.model("Beer", beerSchema);

export default Beer;
