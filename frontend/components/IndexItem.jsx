var React = require('react');
var BookSearchStore = require('../stores/BookSearchStore.js');
var ApiActions = require('../actions/api_actions.js');
var History = require('react-router').History;
var APIUtil = require('../util/APIUtil.js');

var IndexItem = React.createClass({
  mixins: [History],
  onClick: function(event){
    event.preventDefault();
    ApiActions.updateCurrentBook(this.props.book);
    // this.props.whenChosen();
    var bookToSend = this.props.book;
    bookToSend.read = "toRead";
    // APIUtil.createBook(bookToSend);
    var url = "/Desk"
    this.history.push({pathname: url});
    // APIUtil.createBook(this.props.book);
    // this.history.push("/Desk");
  },
  render: function(){
    return(
      <div className="InitialBooks" onClick={this.onClick}><img src={this.props.book.image}></img></div>
    );
  }
})
module.exports = IndexItem;
