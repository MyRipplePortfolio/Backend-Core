exports.getPortfolio = async (req, res) => {
  try {
    const id = req.params.id;
    // your portfolio logic here
    res.json({ message: `Portfolio of user ${id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}