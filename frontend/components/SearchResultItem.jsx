var React = require('react');
var InitialBookIndex = require('./InitialBookIndex.jsx');
var SearchArea = require('./SearchArea.jsx');
var BookSearchStore = require('../stores/BookSearchStore.js');
var BookConfirmation = require('./BookConfirmation.jsx');
var Modal = require('react-modal');
var BookSearch = require('./BookSearch/BookSearch.jsx');
var APIUtil = require('../util/APIUtil.js');
var History = require('react-router').History;


var customStyles = {

};

var SearchResultsItem = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return({chosen: BookSearchStore.currentBook(), modalIsOpen: false});
  },
  bookChosen: function(){
    // this.openModal();
    var chosen = APIUtil.makeBookObject(this.props.book);
    BookSearchStore.resetCurrentBook(chosen);
    event.preventDefault();
    var bookToSend = BookSearchStore.currentBook();
    bookToSend.read = "toRead";
    // APIUtil.createBook(bookToSend);
    var url = "/Desk"
    this.history.push({pathname: url});
  },
  openModal: function() {
    this.setState({modalIsOpen: true, chosen: BookSearchStore.currentBook()});
  },

  closeModal: function() {
    BookSearchStore.resetCurrentBook(null);
    this.setState({modalIsOpen: false});
  },
  render: function(){
    var imageLink, title, author, numPages,category;
    if(this.props.book.volumeInfo.imageLinks !== undefined){
      imageLink=this.props.book.volumeInfo.imageLinks.thumbnail
    }else{
      imageLink= "http://res.cloudinary.com/litlitves/image/upload/v1474661342/imageNotAvailable_fhql9f.jpg";
    }
    if(this.props.book.volumeInfo.categories !== undefined){
      category= "category: " + this.props.book.volumeInfo.categories[0];
    }else{
      category = null;
    }
    if(this.props.book.volumeInfo.authors !== undefined){
      author = "by, " + this.props.book.volumeInfo.authors[0];

    }


    return(
      <li className="search-result-item" onClick={this.bookChosen}>
        <img className='search-result-image' src={imageLink}/>
        <div className='data-area'>
          <div className='result-title'>{this.props.book.volumeInfo.title}</div>
          <div>{this.props.book.volumeInfo.subtitle}</div>
          <div className="result-author">{author}</div>
          <div className='result-category'>{category}</div>
        </div>
      </li>
    );

  }
});
module.exports = SearchResultsItem;
