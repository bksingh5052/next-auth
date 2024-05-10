import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState >= 1) {
        console.log(mongoose.connection.readyState)
      return;
    }
    console.log(mongoose.connection.readyState)
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "Database connection error, Please make sure DB is up and running " +
          error
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Somthing went wrong while connecting to the database");
    console.log(error);
  }
}
