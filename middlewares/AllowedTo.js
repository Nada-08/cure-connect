
const AllowedTo = (allowedRole) => {
    return (req, res, next) => {
        if (req.role !== allowedRole) return res.status(403).json({ error: 'No access' })
        next()
    }
}

module.exports = AllowedTo