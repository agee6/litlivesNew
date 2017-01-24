var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var APIUtil = require('./util/APIUtil.js');
var root = document.getElementById('reactContent');
// var cb = root.getAttribute("data-has-book");
// var History = require('react-router').History;
var AddForm = require('./AddBook.jsx');
var UserStore = require('./stores/UserStore.js');
var ApiActions = require('./actions/api_actions');
// var Analyses = require('./components/AnalysesComponents/Analyses.jsx');
// var AnalysisShow = require('./components/AnalysesComponents/AnalysisShow.jsx');

var App = React.createClass({
  // /mixins:[History],
  getInitialState: function(){
    return({showAddForm: false});
  },
  componentDidMount: function(){

  },
  _onChange: function(){


  },
  addClick: function(){
    console.log("banana"); 
    this.setState({showAddForm:true})
  },

  render: function(){
    if(this.state.showAddForm){
      var addForm = <AddForm />
    }else{
      var addForm = <div />
    }

    return (
      <div>
        <h2>"This is React!!!!"</h2>
        <div onClick={this.addClick}>"Add book"</div>
        {addForm}
        <div>What in the actual banana is going on</div>
      </div>
    );
  }
});
var routes = (
  <Route path="/" component={App}>

  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<App />, root);
});
