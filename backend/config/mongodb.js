import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Event listener for successful connection
    mongoose.connection.on('connected', () => {
      console.log('DB Connected');
    });

    // Event listener for errors
    mongoose.connection.on('error', (err) => {
      console.error(`DB connection error: ${err.message}`);
    });

    // Connect to MongoDB with additional options to avoid deprecation warnings
    await mongoose.connect(`${process.env.MONGODB_URI}/rental`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
