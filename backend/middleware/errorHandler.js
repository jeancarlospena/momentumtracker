const errorHandler = (error, req, res, next) => {
  console.log('its got to the error handler')
  return res.status(400).json({ error: error.message })
}

module.exports = errorHandler