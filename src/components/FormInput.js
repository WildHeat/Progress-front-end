import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const FormInput = ({ label, name, value, placeholder, type, onChange, error }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={classnames('form-control form-control-lg', {'is-valid':error})}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback alert alert-danger">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

FormInput.defaultProps = {
  type: 'text',
}

export default FormInput;
