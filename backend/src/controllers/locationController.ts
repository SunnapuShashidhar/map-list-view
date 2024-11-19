import { Request, Response } from 'express';
import Location, { ILocation } from '../models/Location';

// POST: Save location
export const shareLocation = async (req: Request, res: Response): Promise<void> => {
    const { userId, latitude, longitude } = req.body;

    try {
        const existingLocation = await Location.findOne({ userId });
        if (existingLocation) {
            existingLocation.updateOne({ $set: { latitude, longitude } });
            res.status(201).json({ message: 'Location updated successfully!' });
        } else {
            const newLocation: ILocation = new Location({ userId, latitude, longitude });
            await newLocation.save();
            res.status(201).json({ message: 'Location shared successfully!' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to save location', error: error.message });
    }
};

// GET: Fetch all locations
export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
    }
};
