import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    relievingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
