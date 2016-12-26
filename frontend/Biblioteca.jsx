var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Search = require('./components/Search.jsx');
var Desk = require('./components/Desk.jsx');
var APIUtil = require('./util/APIUtil.js');
var root = document.getElementById('reactContent');
// var cb = root.getAttribute("data-has-book");
var History = require('react-router').History;
var Navbar = require('./components/Navbar.jsx');
var UserStore = require('./stores/UserStore.js');
var ApiActions = require('./actions/api_actions');
// var Analyses = require('./components/AnalysesComponents/Analyses.jsx');
// var AnalysisShow = require('./components/AnalysesComponents/AnalysisShow.jsx');
var SearchResults = require('./components/SearchResults.jsx');

var App = React.createClass({
  mixins:[History],
  getInitialState: function(){
    return({loggedIn: UserStore.loggedIn()});
  },
  componentDidMount: function(){
    APIUtil.getCurrentUser();
    if(this.state.loggedIn){
      APIUtil.getUserBooks();
      APIUtil.getCurrentBook();
    }
    UserStore.addListener(this._onChange);
    this.history.push({pathname: "/Search"});

  },
  _onChange: function(){
    if(UserStore.loggedIn()){
      APIUtil.getUserBooks();
      APIUtil.getCurrentBook();
    }else{
      // ApiActions.emptyShelves();
      // ApiActions.deleteCurrentBook();

    }

    this.setState({loggedIn: UserStore.loggedIn()});
  },
  render: function(){
    return (
      <div>
        <Navbar />

        {this.props.children}
      </div>
    );
  }
});
var routes = (
  <Route path="/" component={App}>
    <Route path="/Search" component={Search}/>
    <Route path="/Desk" component={Desk} />

    <Route path="/SearchResults" component={SearchResults} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router>{routes}</Router>, root);
});


//to add:
// <Route path="/Analyses" >
//   <IndexRoute component={Analyses} />
//   <Route path="/:id" component={AnalysisShow} />
// </Route>
