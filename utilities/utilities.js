const to = promise => {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

const isEmpty = (value) => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

module.exports = {
  to,
  isEmpty
}