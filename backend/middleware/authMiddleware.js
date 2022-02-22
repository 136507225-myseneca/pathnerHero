const user = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized ')
  }
}

export { user }
