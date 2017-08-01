const { Identity, Maybe } = require('ramda-fantasy')
const { Just, Nothing } = Maybe

const { convert } = require('./swagger/parser')

const validate = x => (!x.project || !x.paths) ? Nothing() : Just(x)

module.exports = (req, res) => {
  const response = Maybe(req.body)
    .chain(validate)
    .map(convert)
    .getOrElse({
      code: 400,
      error: 'Bad Request',
      msg: 'Invalid input.'
    })

  res.status(response.code || 200).json(response)
}
