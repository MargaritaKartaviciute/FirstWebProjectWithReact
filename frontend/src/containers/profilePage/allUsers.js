import React from 'react';
import { fetchUsers } from '../../modules/users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormControl } from 'react-bootstrap';
import ReactLoading from 'react-loading';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filter: {
        name: '',
      },
      loaded: false,
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    if (this.state.loaded === false && this.props.users.loading === false) {
      this.setState({
        users: this.props.users.items,
        loaded: true,
      });
    }
  }

  handleFilterChange = (name, option) => {
    this.setState(
      {
        filter: {
          ...this.state.filter,
          [name]: option,
        },
      },
      this.filterItems
    );
  };

  filterItems() {
    let f = this.state.filter;
    this.setState({
      users: this.props.users.items.filter(
        user =>
          user.firstName.toLowerCase().indexOf(f.name) >= 0 ||
          f.name.length === 0 ||
          (user.lastName.toLowerCase().indexOf(f.name) >= 0 ||
            f.name.length === 0)
      ),
    });
  }

  render() {
    if (this.props.users.loading) {
      return (
        <ReactLoading
          type={'bars'}
          color={'#ff4444'}
          height="200px"
          widgth="200px"
        />
      );
    }
    let allUsers = this.state.users;
    return (
      <div>
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Vartotojų lentelė</h3>
            <div className="box-tools">
              <div
                className="input-group input-group-sm"
                style={{ width: 150 }}
              >
                <FormControl
                  type="text"
                  placeholder="Įveskite vardą"
                  onChange={e =>
                    this.handleFilterChange(
                      'name',
                      e.target.value.toLowerCase()
                    )
                  }
                />

                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body table-responsive no-padding">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th>Vartotojas</th>
                  <th>Registracijos Data</th>
                  <th>Paštas</th>
                  <th>Telefono nr.</th>
                  <th>Statusas</th>
                  <th>Aprašymas</th>
                </tr>
                {allUsers.map((user, id) => (
                  <tr key={id} onClick={() => this.props.history.push('/profile/'+user.id)}>
                    <td>
                      {' '}
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.dateRegistered}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      {user.living ===true ? (<span className="label label-primary">Gyvena</span>):(<span className="label label-danger">Ieško būsto</span>)}
                    </td>
                    <td>{user.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* /.box-body */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsers,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Users);
