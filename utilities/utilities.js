exports.To = promise =>
  promise
  .then(data => {
    return [null, data];
  })
  .catch(err => {
    return [err]
  });


const isEmpty = value => 
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

exports.IsEmpty = isEmpty


exports.InitialiseObjectFields = (fieldaToinit, data = {}, defaultValue) => {

  fieldaToinit.forEach(field => {
    data[field] = isEmpty(data[field])? defaultValue || null: data[field]
  })
}

exports.ConsoleAndReject = err => {
  console.error(err)
  return Promise.reject(err)
}