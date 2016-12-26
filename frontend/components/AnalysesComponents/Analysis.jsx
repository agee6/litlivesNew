

var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RadioGroup = require('react-radio-group');
var APIUtil = require('../../util/APIUtil.js');

// components


var Note = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return({ownedByUser: AnalysisStore.owner()});
  },

  render: function() {
    var editArea = edit();
    if(this.state.ownedByUser){

    }

    return (
      <div className="NoteArea">
        <div className="dispay-notes" style={NoteStyle}>
          <div className="note-header">
            <div className="NoteBookTitle" id="statement">Notes on </div><div className="NoteBookTitle" id="book-title-note"> {banana}</div>


          </div>
          <div className="note-area" >
            <div className="inner-note">
              <div className="notes">
                {noteDisplay}

              </div>
              <Editor submitNote={this.submitNote} passUpState={this.passUpState}/>

            </div>

          </div>
        </div>

      </div>
    );
  }

});

module.exports = Note;
