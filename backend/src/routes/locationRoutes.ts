import { Router } from 'express';
import { shareLocation, getAllLocations } from '../controllers/locationController';

const router = Router();

// POST: Share current location
router.post('/share-location', shareLocation);

// GET: Fetch all locations
router.get('/locations', getAllLocations);

export default router;
