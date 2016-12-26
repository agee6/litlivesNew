var React = require('react');
var PropTypes = React.PropTypes;

var SearchListItem = React.createClass({
  click: function(event){
    event.preventDefault();
    this.props.clickOption(this.props.book);
  },
  render: function() {
    return (
      <li onClick={this.click} className="searchGuess" value={this.props.book.volumeInfo.title}>{this.props.book.volumeInfo.title}</li>
    );
  }

});

module.exports = SearchListItem;
