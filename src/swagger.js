module.exports = (req, res) => {

  if(!req.body) {
    return res.status(400).json({
      code: 400,
      error: 'Bad Request',
      msg: 'Invalid input.'
    })
  }

}
