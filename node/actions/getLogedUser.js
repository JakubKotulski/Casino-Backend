const getLogedUser = (req, res) => {
    res.json(req.user);
}

module.exports = { getLogedUser }