import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';

import DashboardNavigation from '../components/DashboardNavigation';

// import authorization from "../redux/actions/authorization";

// Redux 
import { connect } from "react-redux";

// Redux dispatch
import { bindActionCreators } from "redux";




class App extends Component {
  state = {

  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  static propTypes = {
    navOpenState: PropTypes.object,
    onNavResize: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Page
          navigationWidth={this.context.navOpenState.width}
          navigation={<DashboardNavigation/>}
        >
          {this.props.children}
        </Page>        
        
      </div>
    );
  }
}



function mapStateToProps(store) {
  return {
    // ...store.authorization
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({  }, dispatch)
  };
}




export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



