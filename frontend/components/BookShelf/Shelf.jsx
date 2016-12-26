var React = require('react');
var ShelfItem = require('./ShelfItem.jsx');

var Shelf = React.createClass({

  generateRandomHex: function(){
    var possible = ["#B87333", "#E3A857", "#EDC9AF", "#FBCEB1", "#3D2B1F", "#654321", "#704214", "#7B3F00", "#964B00", "#826644", "#836953", "#996515"];
    var hex = possible[Math.floor(Math.random() * possible.length)];
    return hex;
  },

  render: function(){
    var theshelf = [];
    var theid;
    var theshelf = this.props.books.map(function(book, index){
      if(index % 2 === 0){
        theid = "book1";
      }else {
        theid = "book2";
      }
      return(<ShelfItem theid={theid} key={index} bookTitle={book.title} book={book} bookColor={this.generateRandomHex()} /> );
    }, this);
    return(
      <section className="Shelf" id={this.props.identifier}>
        <ul id="ShelfBookList">
          {theshelf}
        </ul>
      </section>
    );
  }

})

module.exports = Shelf;
