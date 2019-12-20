import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from '../../modules/login';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      Email: '',
      Password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { Email, Password } = this.state;
    if (Email && Password) {
      this.props.login(Email, Password);
    }
  }

  render() {
    const { loggingIn } = this.props.login;
    const { Email, Password, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
      {this.props.loginData.error && <div className="callout callout-danger">
            <h4>Įvyko klaida</h4>
              <p>{this.props.loginData.error}</p>       
          </div>
          }
        <h2>Prisijungimas</h2>
        <form className="fonas" name="form" onSubmit={this.handleSubmit}>
          <div
            className={'form-group' + (submitted && !Email ? ' has-error' : '')}
          >
            <label htmlFor="Email">Elektroninis paštas</label>
            <input
              type="text"
              className="form-control"
              name="Email"
              value={Email}
              onChange={this.handleChange}
            />
            {submitted &&
              !Email && <div className="help-block">Reikalingas elektroninis paštas</div>}
          </div>
          <div
            className={
              'form-group' + (submitted && !Password ? ' has-error' : '')
            }
          >
            <label htmlFor="Password">Slaptažodis</label>
            <input
              type="Password"
              className="form-control"
              name="Password"
              value={Password}
              onChange={this.handleChange}
            />
            {submitted &&
              !Password && (
                <div className="help-block">Reikalingas skaptažodis</div>
              )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Prisijungti</button>
            {loggingIn && (
              <img
                alt="Loading..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )}
            <Link to="/register" className="btn btn-link">
              Prisiregistruoti
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginData: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
