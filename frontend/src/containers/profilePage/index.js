import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile } from '../../modules/profile';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import photo from './photo.js';
import Endorses from './endorses';
import ReactLoading from 'react-loading';
import { Image } from 'react-bootstrap';

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchProfile(
      this.props.match.params.id,
      this.props.login.user.id
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchProfile(
        nextProps.match.params.id,
        this.props.login.user.id
      );
    }
  }

  photoCheck() {
    return this.props.profile.user.avatarPhoto
      ? this.props.profile.user.avatarPhoto
      : photo;
  }
  checkIfOwnerForEditing() {
    if (parseInt(this.props.match.params.id, 10) === this.props.login.user.id)
      return (
        <Button
          bsStyle="primary"
          className="myOffer-newOffer"
          onClick={() => this.props.history.push('/edit-profile')}
        >
          <div className="strip2-tick" />Redaguoti
            </Button>
      );
  }

  render() {
    if (this.props.profile.loading) {
      return (
        <ReactLoading
          type={'bars'}
          color={'#ff4444'}
          height="200px"
          widgth="200px"
        />
      );
    } else if (this.props.profile.user.firstName === null) {
      return <h1>Vartotojas su nurodytu ID adresu nerastas.</h1>;
    }
    return (
      <div className="container">
        <div>
          <div>
            {/* Profile Image */}
            <Row>
              <Col xs={6} md={4}>
                <Row className="box box-primary">
                  <Col xs={12}>
                    <Image className="profile-user-img img-responsive img-circle" src={this.photoCheck()} alt="profile-photo"/>
                    <h3 className="profile-username text-center">{this.props.profile.user.firstName}{' '}
                      {this.props.profile.user.lastName}</h3>
                    <p className="text-muted text-center">{this.props.profile.user.work}</p>
                  </Col>
                </Row>

                {/* /.box-body */}
              </Col>

              {/* /.box */}
              {/* About Me Box */}
              <Col xs={6} md={8} >

                <div className="box box-primary">
                  <div >
                    <h3 className="box-title">Apie mane</h3>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    {this.checkIfOwnerForEditing()}
                    <strong><i className="fa fa-book margin-r-5" /> Išsilavimas</strong>
                    <p className="text-muted">
                      {this.props.profile.user.degree}
                    </p>
                    <hr />
                    <strong><i className="fa fa-mobile-phone margin-r-5" /> Telefono numeris</strong>
                    <p className="text-muted">{this.props.profile.user.phoneNumber}</p>
                    <hr />
                    <strong><i className="fa fa-newspaper-o margin-r-5" /> Elektroninis paštas</strong>
                    <p className="text-muted">{this.props.profile.user.email}</p>
                    <hr />
                    <strong><i className="fa fa-mortar-board margin-r-5" /> Mokymosi įstaiga</strong>
                    <p className="text-muted">{this.props.profile.user.school}</p>
                    <hr />
                    <strong><i className="fa fa-pencil margin-r-5" /> Bruožai</strong>
                    <Endorses
                      profile={this.props.profile.user}
                      id={parseInt(this.props.match.params.id, 10)}
                    />
                    <hr />
                    <strong><i className="fa fa-file-text-o margin-r-5" /> Aprašymas</strong>
                    <p>{this.props.profile.user.description}</p>
                  </div>
                  {/* /.box-body */}
                </div>
              </Col>
            </Row>
          </div>
          {/* /.box */}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  profile: state.profile,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfile,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
