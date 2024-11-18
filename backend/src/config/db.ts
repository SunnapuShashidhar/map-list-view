import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://admin1:_mgZjqTr6TZxQhu@shashidhar.32vvw8h.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;