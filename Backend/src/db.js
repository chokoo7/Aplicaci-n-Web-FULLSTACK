import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost/puntodeventa");

    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};
