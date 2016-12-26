var React = require('react');
var BookSearchStore = require('../stores/BookSearchStore.js');
var APIUtil = require('../util/APIUtil.js');
var IndexItem = require('./IndexItem.jsx');


var InitialBookIndex = React.createClass({

  getInitialState: function(){
    return({bookIndex: BookSearchStore.initialData()});
  },
  componentDidMount: function(){
    APIUtil.getInitialBookIndex();
    this.iIndex = BookSearchStore.addListener(this._onChange);
  },
  componentWillUnmount: function(){
    this.iIndex.remove();
  },
  _onChange: function(){
    this.setState({bookIndex:BookSearchStore.initialData()})
  },
  render: function(){
    var bookOptions;
    var that = this;

    bookOptions = this.state.bookIndex.map(function(book, index){
        return(<IndexItem key={index} book={book} whenChosen={this.props.whenChosen}/>);
    }, this);
    return(
      <div id="BookArea">
        <div className="book-list">
          {bookOptions}
        </div>

      </div>

    );
  }
})

module.exports = InitialBookIndex;
