exports.to = promise =>
  promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);


exports.isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

exports.formatError = (reqName, errMessage, err) => {
  const error = {}

  error[reqName] = errMessage
  error.original = err

  return error
}