const pool = require('../config/db');

exports.getAllCountries = async (req, res) => {
  try {
    const [countries] = await pool.query(`
      SELECT 
        id, name, visa_requirements, 
        processing_time, image_url,
        popular_destinations,
        created_at
      FROM countries
      ORDER BY name ASC
    `);
    res.json({ countries });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch countries',
      details: err.message 
    });
  }
};

exports.getCountryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [[country]] = await pool.query(`
      SELECT 
        c.*,
        GROUP_CONCAT(s.title) AS available_services
      FROM countries c
      LEFT JOIN services s ON FIND_IN_SET(c.id, s.available_countries)
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    res.json({ country });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};