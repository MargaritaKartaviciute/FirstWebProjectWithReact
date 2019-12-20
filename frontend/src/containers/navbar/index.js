import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-bootstrap';
import {fetchPhoto} from '../../modules/login';

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      photo: '',
      avatarLoaded: false
    };
  }
  showImage(photo) {
    return <Image src={(this.props.login.avatarLoaded === true ? photo : "https://www.assistia.lk/jobs/wp-content/uploads/2014/07/user-placeholder-300x300.jpg")} className="user-image" />
  }
  showImage2(photo) {
    return <Image
      src={(this.props.login.avatarLoaded === true ? photo : "https://www.assistia.lk/jobs/wp-content/uploads/2014/07/user-placeholder-300x300.jpg")}
      className="img-circle"
      alt="User Image"
    />
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.login.loading && !this.props.login.loading && !this.props.login.error && this.props.login.user) {
      this.props.fetchPhoto(this.props.login.user.id);
    }
  }


  render() {
    if (this.props.login.loggedIn === false) {
      return <div />;
    }
    return (
      <header className="main-header">
        <nav className="navbar navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/offers" className="navbar-brand">
                <b>Rask Kambarioką</b>
              </Link>
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-collapse"
                aria-expanded="true"
              >
                <i className="fa fa-bars" />
              </button>
            </div>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div
              className="navbar-collapse pull-left collapse in"
              id="navbar-collapse"
              aria-expanded="true"
              style={{}}
            >
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <Link
                    to="/offers"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pasiūlymai<span className="caret" />
                  </Link>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <Link to="../../offers">Pasiūlymai</Link>
                    </li>
                    <li>
                      <Link to="/map">Pasiūlymai žemėlapyje</Link>
                    </li>
                    <li>
                      <Link to={'/user-offers/' + this.props.login.user.id}>
                        Mano pasiūlymai
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/users">Naudotojai</Link>
                </li>
              </ul>
            </div>
            {/* Navbar Right Menu */}
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                {/* Messages: style can be found in dropdown.less*/}
                {/* User Account Menu */}
                <li className="dropdown user user-menu">
                  {/* Menu Toggle Button */}
                  <a className="dropdown-toggle" data-toggle="dropdown">
                    {/* The user image in the navbar*/}
                    {this.showImage(this.props.login.user.avatarPhoto === "" ? "https://www.assistia.lk/jobs/wp-content/uploads/2014/07/user-placeholder-300x300.jpg" : this.props.login.user.avatarPhoto)}
                    {/* hidden-xs hides the username on small devices so only the image appears. */}
                    <span className="hidden-xs">
                      {this.props.login.user.firstName}{' '}
                      {this.props.login.user.lastName}
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    {/* The user image in the menu */}
                    <li className="user-header">
                      {this.showImage2(this.props.login.user.avatarPhoto === "" ? "https://www.assistia.lk/jobs/wp-content/uploads/2014/07/user-placeholder-300x300.jpg" : this.props.login.user.avatarPhoto)}
                      <p>
                        {this.props.login.user.firstName}{' '}
                        {this.props.login.user.lastName}
                      </p>
                    </li>
                    {/* Menu Body */}
                    <li className="user-body">{/* /.row */}</li>
                    {/* Menu Footer*/}
                    <li className="user-footer">
                      <div className="pull-left">
                        <Link
                          to={'/profile/' + this.props.login.user.id}
                          className="btn btn-default btn-flat"
                        >
                          Profilis
                        </Link>
                      </div>

                      <div className="pull-right">
                        <Link
                          to={'/login'}
                          className="btn btn-default btn-flat"
                        >
                          Atsijungti
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* /.navbar-custom-menu */}
          </div>
          {/* /.container-fluid */}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchPhoto}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
