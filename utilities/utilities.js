exports.to = promise =>
  promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);


const isEmpty = value => 
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

exports.isEmpty = isEmpty
  
exports.formatLogicError = (reqName, errMessage, err) => {
  const error = {}

  error[reqName] = errMessage
  error.original = err

  return error
}

exports.initialiseObjectFields = (fieldaToChack, data = {}, defaultValue) => {
  fieldaToChack.forEach(field => {
    data[field] = !isEmpty(data[field])? data[field]: defaultValue || null
  })
}