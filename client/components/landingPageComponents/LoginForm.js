import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
export const fields = ['emailField', 'passwordField'];

const validate = values => {
  const errors = {};
  if (!values.emailField) {
    errors.emailField = 'Required';
  }
  if (!values.passwordField) {
    errors.passwordField = 'Required';
  }
  return errors;
};

class LoginForm extends Component{
  render () {
  const { fields: { emailField, passwordField }, handleSubmit, submitting } = this.props;
    return (
    <Modal show={ this.props.showLoginModal } className="LoginForm">
      <form onSubmit={ handleSubmit }>
        <div>
          <label>e-mail</label>
          <div>
            <input type="email" {...emailField}/>
          </div>
          {emailField.touched && emailField.error && <div>{emailField.error}</div>}
        </div>
        <div>
          <label>password</label>
          <div>
            <input type="password" {...passwordField}/>
          </div>
          {passwordField.touched && passwordField.error && <div>{passwordField.error}</div>}
        </div>
        <div>
          <Button className="login-button btn-primary" type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} login
          </Button>
          <Button className="login-cancel-button" onClick={ this.props.hideLogin } type="button">
            cancel
          </Button>
        </div>
      </form>
    </Modal>
    )
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'LoginForm',
  fields,
  validate
})(LoginForm);
