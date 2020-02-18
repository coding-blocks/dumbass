module.exports.ResponseError = function (name, message) {
  if (!name)
    throw new Error('You must specify a name for the error you dumb-twat!')

  this.name = name
  this.message = message
  return this
}