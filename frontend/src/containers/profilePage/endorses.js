import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import IPCONFIG from '../../IPCONFIG';

class Endorses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      newEndorse: '',
      endorses: this.props.profile.user.endorsedSkills,
    };
  }
  changeEndorse = event => {
    this.setState({
      ...this.state,
      newEndorse: event.target.value,
    });
  };
  handleAdd = event => {
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        IPCONFIG + 'api/Endorses',
        {
          UserId: this.props.id,
          EndorserId: user.id,
          SkillName: this.state.newEndorse,
        },
        { headers: { Authorization: 'Bearer ' + user.token } }
      )
      .then(result => {
        this.setState({
          ...this.state,
          newEndorse: '',
          endorses: [
            ...this.state.endorses,
            { skillName: this.state.newEndorse, count: 1, canEndorse: false },
          ] ,
        });
        this.togglePopup();
      });
  };
  handlePlusEndorse = skillName => {
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        IPCONFIG + 'api/Endorses',
        {
          UserId: this.props.id,
          EndorserId: user.id,
          SkillName: skillName,
        },
        { headers: { Authorization: 'Bearer ' + user.token } }
      )
      .then(result => {
        var index = this.getIndex(skillName);
        var endorse = this.state.endorses[index];
        endorse.count = endorse.count + 1;
        endorse.canEndorse = false;
        this.setState({
          ...this.state,
          endorses: [
            ...this.state.endorses.slice(0, index),
            endorse,
            ...this.state.endorses.slice(index + 1),
          ],
        });
      });
  };
  handleDelete = skillName => {
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .delete(IPCONFIG + 'api/Endorses', {
        params: {
          UserId: this.props.id,
          EndorserId: user.id,
          SkillName: skillName,
        },
        headers: { Authorization: 'Bearer ' + user.token },
      })
      .then(result => {
        var index = this.getIndex(skillName);
        if (user.id === this.props.id) {
          this.setState({
            ...this.state,
            endorses: [
              ...this.state.endorses.slice(0, index),
              ...this.state.endorses.slice(index + 1),
            ],
          });
        } else {
          var endorse = this.state.endorses[index];
          endorse.count = endorse.count - 1;
          endorse.canEndorse = true;
          this.setState({
            ...this.state,
            endorses: [
              ...this.state.endorses.slice(0, index),
              endorse,
              ...this.state.endorses.slice(index + 1),
            ],
          });
        }
      })
  };
  getIndex = skillName => {
    for (var i = 0; i < this.state.endorses.length; i++) {
      if (this.state.endorses[i].skillName === skillName) {
        return i;
      }
    }
    return -1;
  };
  showPopup() {
    const endorse = this.state.newEndorse;
    return this.state.showPopup ? (
      <div className="popup">
        <div className="popup_inner">
          <h1>Pridėti bruožą</h1>
          <input
            type="text"
            className="form-control"
            name="endorse"
            value={endorse}
            onChange={this.changeEndorse.bind(this)}
          />
          <br />
          <Button onClick={this.handleAdd}>Pridėti</Button>
          <Button onClick={this.togglePopup.bind(this)}>Uždaryti</Button>
        </div>
      </div>
    ) : (
      ''
    );
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  checkIfOwnerForEndorseEditing() {
    if (this.props.id === JSON.parse(localStorage.getItem('user')).id)
      return (
        <div>
          <Button onClick={this.togglePopup.bind(this)} bsStyle="primary" className="label label-info">
            Pridėti bruožą
          </Button>
          <br />
          <br />
        </div>
      );
  }
  ShowEndoresments() {
    if (this.state.endorses === undefined) {
      return <div>Kraunama</div>;
    } else {
      return this.state.endorses.map((skill, id) => (
        <div key={id} id="profile-font">
          <Row>
            <div className="col-sm-1 center">
            <span className="label label-warning">{skill.count}</span>
            </div>
            <div className="col-sm-6">
            <span className="label label-primary">{skill.skillName}</span>
            </div>
            <div className="col-sm-1">{this.checkIfOwnerForEndorse(skill)}</div>
            <div className="col-sm-4"> </div>
          </Row>
        </div>
      ));
    }
  }
  checkIfOwnerForEndorse = skill => {
    if (this.props.id !== JSON.parse(localStorage.getItem('user')).id)
      if (skill.canEndorse)
        return (
          <Button
            onClick={() => {
              this.handlePlusEndorse(skill.skillName);
            }}
            className="label label-success"
            bsSize="xsmall"
          >
            <Glyphicon glyph="glyphicon glyphicon-plus" />
          </Button>
        );
      else
        return (
          <Button
            onClick={() => {
              this.handleDelete(skill.skillName);
            }}
            className="label label-danger"
            bsSize="xsmall"
          >
            <Glyphicon glyph="glyphicon glyphicon-minus" />
          </Button>
        );
    else
      return (
        <Button
          onClick={() => {
            this.handleDelete(skill.skillName);
          }}
          className="label label-danger"
          bsStyle="primary"
          bsSize="xsmall"
        >
          Ištrinti
        </Button>
      );
  };

  render = props => (
    <div>
      {props}
      {this.checkIfOwnerForEndorseEditing()}
      {this.ShowEndoresments()}
      {this.showPopup()}
    </div>
  );
}

const mapStateToProps = state => ({
  login: state.login,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Endorses);
