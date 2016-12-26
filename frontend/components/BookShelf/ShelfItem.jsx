var React = require('react');
var BookSearchStore = require('../../stores/BookSearchStore.js');
var ApiActions = require('../../actions/api_actions.js');
var APIUtil = require('../../util/APIUtil.js');



var ShelfItem = React.createClass({
  onClick: function(event){
    event.preventDefault();

    APIUtil.updateUser({current_book: this.props.book.id});
    ApiActions.updateCurrentBook(this.props.book);
    APIUtil.fetchNotes(this.props.book.id);


  },
  generateRandomHex: function(){
    var possible = "0123456789abcdef".split("");
    var hex = "#";
    for (var i = 0; i < 6; i++) {
      hex += possible[Math.floor(Math.random() * 16)];
    }
    return hex;
  },
  render: function(){
    var shelfStyle = { backgroundColor: this.props.bookColor};

    return(
      <li className="ShelfItem hvr-grow" style={shelfStyle} id={this.props.theid} onClick={this.onClick}>{this.props.bookTitle}</li>
    )
  }
})

module.exports = ShelfItem;
