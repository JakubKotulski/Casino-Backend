const getLogedUser = (req, res) => {
  console.log(req.user)
  res.json(req.user);
};

module.exports = { getLogedUser };
