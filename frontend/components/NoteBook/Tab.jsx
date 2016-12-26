var React = require('react');
var PropTypes = React.PropTypes;


var Tab = React.createClass({
  
  tabClick:function(event){
    event.preventDefault();
    this.props.clickFunc(this.props.tabName);
  },

  render: function() {
    return (
        <li className="tab" id={this.props.tabName} onClick={this.tabClick}>{this.props.tabName}</li>
    );
  }

});

module.exports = Tab;
