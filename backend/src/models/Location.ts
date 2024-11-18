import mongoose, { Schema, Document } from 'mongoose';

// Define the location interface
export interface ILocation extends Document {
    userId: string;
    latitude: number;
    longitude: number;
    timestamp: Date;
}

// Define the location schema
const LocationSchema: Schema = new Schema({
    userId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Create the location model
const Location = mongoose.model<ILocation>('Location', LocationSchema);

export default Location;
