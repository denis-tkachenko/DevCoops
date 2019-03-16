import React from 'react'
import PropTypes from 'prop-types'

const TextFieldGroup = ({name, placeholder, value, error, info, type, onChange, disabled}) => {
  return (
    <div className="form-group">
      <input 
        type={type}
        className={"form-control form-control-lg " + (error? "is-invalid": '')}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error? <div className="invalid-feedback">{error}</div>: ''}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired, 
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup