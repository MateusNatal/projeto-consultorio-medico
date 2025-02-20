import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({
  // pacientId: {
  //   type: String,
  //   required: [true, "pacient ID is required."],
  // },
  name: {
    type: String,
    required: [true, "pacient name is required."],
  },
  birthDate: {
    type: Date,
    required: [true, "Birth date name is required."],
  },
  email: {
    type: String,
    required: [true, "Email contact is required."],
  },
  phone: {
    type: String,
    required: [true, "Phone number name is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const pacient = mongoose.model("pacient", pacientSchema);
export default pacient;
