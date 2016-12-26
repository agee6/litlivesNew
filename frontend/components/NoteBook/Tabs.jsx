var React = require('react');
var Tab = require('./Tab.jsx');

var Tabs = React.createClass({



  render: function() {
    var tabList = this.props.tabOptions.map(function(tab){
      return(<Tab clickFunc={this.props.clickFunction} tabName={tab} key={tab}/> );
    }, this)

    return (
      <div>
        <ul className="tabsList">
          {tabList}
        </ul>
      </div>
    );
  }

});

module.exports = Tabs;
