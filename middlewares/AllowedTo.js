const AllowedTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ error: 'No access' });
    }
    next();
  };
};

module.exports = AllowedTo;
