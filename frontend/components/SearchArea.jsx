var React = require('react');
var BookSearchBar = require('./BookSearchBar.jsx');


var SearchArea = React.createClass({


  render: function(){
    return(


      <section id="popupbody">

          <BookSearchBar whenChosen={this.props.whenChosen} />

      </section>
    )
  }
})

module.exports = SearchArea;
