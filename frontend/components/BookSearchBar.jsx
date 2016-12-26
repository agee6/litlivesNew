var React = require('react');
var APIUtil = require('../util/APIUtil.js');
var BookSearchStore = require('../stores/BookSearchStore.js');
var BookConfirmation = require('./BookConfirmation.jsx');
var SearchListItem = require('./SearchListItem.jsx');
var History = require('react-router').History;


var BookSearchBar = React.createClass({
  mixins: [History],
  getInitialState: function(){

    this.leave = false;
    this.needToLoad = false;


    return({value: "", searchResults: [], showGuesses: false});
  },
  handleChange: function(event){

    this.setState({value: event.target.value});

    if (this.state.value.length > 2 && !this.pending){
      this.pending = true;
      this.loadBar.style.display = 'block';
      this.needToLoad = false;
      APIUtil.fetchBookResults(this.state.value);
      window.setTimeout(function(){
        this.pending = false;
        if(this.needToLoad){
          this.pending = true;
          this.loadBar.style.display = 'block';
          this.needToLoad = false;
          APIUtil.fetchBookResults(this.state.value);
        }
      }.bind(this), 1800);
    }else if(this.state.value.length > 2){
      this.needToLoad = true;
    }else{
      this.needToLoad = false;
      this.loadBar.style.display = 'none';
    }

  },

  componentDidMount: function(){
    this.storeIndex = BookSearchStore.addListener(this._onChange);
    this.pending = false;
    this.loadBar = document.getElementById('loader');
  },
  componentWillUnmount: function(){
    this.storeIndex.remove();
  },
  _onChange: function(){
    if (this.state.value.length > 0 && !this.leave){
      this.loadBar.style.display = 'none';
      this.setState({searchResults: BookSearchStore.all()});
    }else if(this.leave){
      this.leave = false;
      var url = '/SearchResults';
      this.history.push({pathname: url});
    }else{
      this.loadBar.style.display = 'none';
      this.setState({searchResults: []});
    }
  },
  searchBarMoveUp: function() {
    // debugger;
    // this.refs.searchbar.style{{bottom: "10%"}}
    $("#landing-search-bar").css("bottom", "40%");
    this.setState({
      showGuesses: true
    });
    // setTimeout(function(){
    //     // debugger;
    // }.bind(this), 1800);
    // this.hideAutocomplete();
    // this.tempToken = setTimeout(this.showAutocomplete, 2000);
  },
  searchBarMoveBack: function() {
    $("#landing-search-bar").css("bottom", "20%");
    // this.hideAutocomplete();
    // this.setState({
    //   showGuesses: false
    // });

    // setTimeout(function(){
    //   this.setState({
    //     showGuesses: false,
    //   });
    //     // debugger;
    // }.bind(this), 500);
  },
  clickOption: function(book){

    var theChosen = book;
    var chosen = APIUtil.makeBookObject(book);
    BookSearchStore.resetCurrentBook(chosen);
    this.props.whenChosen();

  },
  click: function(event){
    event.preventDefault();
    // var theChosen = this.state.searchResults[0].volumeInfo.title;
    // var chosen = APIUtil.makeBookObject(this.state.searchResults[0]);
    // BookSearchStore.resetCurrentBook(chosen);
    // this.props.whenChosen();

    this.leave = true;
    APIUtil.fetchBookResults(this.state.value);

  },
  removeSearchGuesses: function(){
    this.setState({showGuesses:false});
  },
  render: function(){
    var that = this;
    if (this.state.showGuesses){
      var guesses = this.state.searchResults.map(function(result, index){
        return(<SearchListItem key={result.id} book={result} clickOption={this.clickOption} />);
      }, this);
    }else{
      guesses = null;
    }



    return (
      <div id="landing-search-bar">
        <label id="BookSearchLabel">What book do you want to explore?</label>
        <br/>
        <form className="SearchForm">
          <input id="BookSearchInput"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onFocus={this.searchBarMoveUp}
            onBlur={this.searchBarMoveBack}
            placeholder="enter book title"
            list="search-options"
            autoComplete="off"
            />
          <button id="BookSearchButton" className="hvr-grow-shadow fa fa-search" onClick={this.click}></button>
          <div id="loader" className='loader'></div>
          <ul className="searchGuesses" id="search-options">
            {guesses}
          </ul>

        </form>



      </div>
    );
  }

})
module.exports = BookSearchBar;
