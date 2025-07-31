const pool = require('../config/db');

exports.getAllApplications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Application not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application' });
  }
};

exports.createApplication = async (req, res) => {
  const { applicantName, serviceId, countryId, status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO applications (applicant_name, service_id, country_id, status) VALUES (?, ?, ?, ?)',
      [applicantName, serviceId, countryId, status]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating application' });
  }
};

exports.updateApplication = async (req, res) => {
  const { applicantName, serviceId, countryId, status } = req.body;
  try {
    await pool.query(
      'UPDATE applications SET applicant_name = ?, service_id = ?, country_id = ?, status = ? WHERE id = ?',
      [applicantName, serviceId, countryId, status, req.params.id]
    );
    res.json({ message: 'Application updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await pool.query('DELETE FROM applications WHERE id = ?', [req.params.id]);
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application' });
  }
};
