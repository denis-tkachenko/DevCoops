exports.To = promise => {
  return promise.then(data => {
    return data
  })
  .catch(err => {
    return consoleErrAndReject(err)
  });
}

const isEmpty = value => 
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

exports.IsEmpty = isEmpty


exports.InitialiseObjectFields = (fieldaToinit, data = {}, defaultValue = null) => {
  fieldaToinit.forEach(field => {
    data[field] = isEmpty(data[field])? defaultValue: data[field]
  })
}

const consoleErrAndReject = err => {
  console.error(err)
  return Promise.reject(null)
}

exports.ConsoleErrAndReject = consoleErrAndReject