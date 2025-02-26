import mongoose from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Doctor name is required."],
  },
  login: {
    type: String,
    required: [true, "Login is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  medicalSpecialty: {
    type: String,
    required: [true, "Medical Specialty is required."],
  },
  medicalRegistration: {
    type: String,
    required: [true, "Medical Registration is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email contact is required."],
    validator: function (v) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      // regex validando email
    },
    message: (props) =>
      `${props.value} This is not a valid email address. Please use the format example@domain.com`,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    validade: {
      validator: function (v) {
        return /^\d{2} 9\d{4}-\d{4}$/.test(v);
        // regex validando telefone
      },
      message: (props) =>
        `${props.value} This is not a valid phone value. Please use the following format 99 91234-4567`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const doctor = mongoose.model("Doctor", doctorSchema);

export default doctor;
