const SchoolModel = require('../models/schoolModel');

// Helper function to calculate distance between 2 points
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    SchoolModel.add(name, address, parseFloat(latitude), parseFloat(longitude), (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'School added successfully', id: result.insertId });
    });
};

exports.listSchools = (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
    }

    SchoolModel.getAll((err, schools) => {
        if (err) return res.status(500).json({ error: err });

        // Add distance to each school
        const sorted = schools.map(school => ({
            ...school,
            distance: getDistance(userLat, userLon, school.latitude, school.longitude)
        }))
            .sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    });
};
