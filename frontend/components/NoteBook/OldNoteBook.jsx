var React = require('react');
var BookPage = require('./NoteBook/BookPage.jsx');
var BookSearchStore = require('../stores/BookSearchStore.js');
var Tabs = require('./NoteBook/Tabs.jsx');
var Note = require('./NoteBook/Note.jsx');
var Reviews = require('./NoteBook/Reviews.jsx');

var Notebook = React.createClass({
  getInitialState: function(){
    return({currentBook:BookSearchStore.currentBook()})
  },
  componentDidMount: function(){
    this.storeIndex = BookSearchStore.addListener(this._onChange);
    $("#flipbook").turn({
		width: 400,
		height: 300,
		autoCenter: true
	});

  },
  componentWillUnmount: function(){
    this.storeIndex.remove();
  },
  _onChange: function(){
    this.setState({currentBook: BookSearchStore.currentBook()});
  },

  render: function(){
    if(this.state.currentBook){
      var customStyle = {
        backgroundImage: 'url(' + this.state.currentBook.image + ')'
      };
      return(

        <section className="Notebook" id="page-flip">
          <div id="r1">
            <div id="p1" style={customStyle}>


            </div>
          </div>
          <div id="p2">
            <BookPage currentBook={this.state.currentBook} changeCurrentBook={this.changeCurrentBook}/>
          </div>
          <div id="r3">
            <div id="p3">

            </div>
          </div>
          <div class="s">
            <div id="s3">
              <div id="sp3">

              </div>
            </div>
          </div>
          <div class="s" id="s4">
            <div id="s2">
              <div>
                <Note />
              </div>
            </div>
          </div>

        </section>
      )
    }else{
      return(
        <div>currently loading</div>
      )
    }
  }

});

module.exports = Notebook;
