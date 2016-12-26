var React = require('react');
var Notebook = require('./Notebook.jsx');
var BS = require('./BS.jsx');

var Desk = React.createClass({

  render: function(){

    return(
      <section className="Desk" id="Desk">
        <Notebook  />

        <BS />
      </section>

    )
  }
})
module.exports = Desk;
