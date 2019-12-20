import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../modules/register';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        Email: '',
        Password: '',
        ConfirmPassword: '',
        FirstName: '',
        LastName: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;

    if (user.Email && user.Password && user.FirstName && user.LastName && user.ConfirmPassword === user.Password) {
      this.props.register(user);
    }
  }
  Loading() {console.log(this.props);
    if (this.props.register.Loading)
      return (
        <img
                alt="Loading..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
      );
  }

  render() {
    const { register } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
      {this.props.registerData.error !== null && <div className="callout callout-danger">
            <h4>Įvyko klaida</h4>
              <p>{this.props.registerData.error}</p>       
          </div>
          }
        <h2>Registracija</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !user.FirstName ? ' has-error' : '')
            }
          >
            <label htmlFor="FirstName">Vardas</label>
            <input
              type="text"
              className="form-control"
              name="FirstName"
              value={user.FirstName}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.FirstName && (
                <div className="help-block">Vardas yra būtinas</div>
              )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.LastName ? ' has-error' : '')
            }
          >
            <label htmlFor="LastName">Pavardė</label>
            <input
              type="text"
              className="form-control"
              name="LastName"
              value={user.LastName}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.LastName && (
                <div className="help-block">Pavardė yra būtina</div>
              )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.Email ? ' has-error' : '')
            }
          >
            <label htmlFor="firstName">Elektroninis paštas</label>
            <input
              type="text"
              className="form-control"
              name="Email"
              value={user.Email}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.Email && (
                <div className="help-block">Reikalingas elektroninis paštas</div>
              )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.Password ? ' has-error' : '')
            }
          >
            <label htmlFor="Password">Slaptažodis</label>
            <input
              type="password"
              className="form-control"
              name="Password"
              value={user.Password}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.Password && (
                <div className="help-block">Reikalingas slaptažodis</div>
              )}
          </div>
          <div
            className={
              'form-group' +
              (submitted && !user.ConfirmPassword ? ' has-error' : '')
            }
          >
            <label htmlFor="ConfirmPassword">Slaptažodžio patvirtinimas</label>
            <input
              type="password"
              className="form-control"
              name="ConfirmPassword"
              value={user.ConfirmPassword}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.ConfirmPassword && (
                <div className="help-block">Reikalinga patvirtinti slaptažodį</div>
              )}
            {submitted &&
              user.ConfirmPassword !== user.Password && (
                <div className="help-block">Prašome pakartoti slaptažodį</div>
              )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Užsiregistruoti</button>
            {/* {register && (
              <img
                alt="Loading..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )} */}
            {this.Loading()}
            <Link to="/login" className="btn btn-link">
              Atšaukti
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registerData: state.register,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
