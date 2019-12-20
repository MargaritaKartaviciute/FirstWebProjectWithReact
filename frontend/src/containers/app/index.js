import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Offers from '../offers';
import LoginPage from '../loginPage';
import RegisterPage from '../registerPage';
import EditProfile from '../profilePage/editProfile';
import AddOffer from '../offers/addOffer';
import ProfilePage from '../profilePage';
import PrivateRoute from '../_components/privateRoute';
import NavigationBar from '../navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { takeTokenFromLocalStorage } from '../../modules/login';
import { withRouter } from 'react-router-dom';
import ShowOffer from '../offers/showOffer';
import OffersMap from '../maps/allOffersMap';
import Users from '../profilePage/allUsers';
import UserOffers from '../offers/myOffers';
import EditOffer from '../offers/editOffer';

class App extends React.Component {
  componentDidMount = () => {
    this.props.takeTokenFromLocalStorage();
  };

  render() {
    return (
      <div>
        <NavigationBar />
        <Switch className="field">
          <PrivateRoute exact path="/" component={Offers} />
          <PrivateRoute exact path="/offers" component={Offers} />
          <PrivateRoute exact path="/add-offer" component={AddOffer} />
          <PrivateRoute exact path={'/profile/:id'} component={ProfilePage} />
          <PrivateRoute exact path={'/offer/:id'} component={ShowOffer} />
          <PrivateRoute exact path={'/map'} component={OffersMap} />
          <PrivateRoute exact path={'/users'} component={Users} />
          <PrivateRoute exact path={'/user-offers/:id'} component={UserOffers}/>
          <PrivateRoute exact path={'/offer-edit/:id'} component={EditOffer} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      takeTokenFromLocalStorage,
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
