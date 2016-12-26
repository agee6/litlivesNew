var React = require('react');
var PropTypes = React.PropTypes;

var AnalysisListItem = React.createClass({

  click: function(event){
    event.preventDefault();
    //go to show page
  }

  render: function() {
    return (
      <div className="analysis-list-item" id="outside-box" onClick={this.click}>
        <div className="analysis-list-item" id="image-preview">

        </div>
        <div className="analysis-list-item" id="analysis-title-preview">{this.props.analysis.title}
          <div className="analysis-list-item" id="analysis-subtitle-preview">
                {this.props.analysis.subtitle}
          </div>

        </div>
        <div className="analysis-list-item" id="short-preview">
               
        </div>
      </div
      </div>
    );
  }

});

module.exports = AnalysisListItem;
