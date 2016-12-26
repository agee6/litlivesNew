var React = require('react');
var PropTypes = React.PropTypes;
var APIUtil = require('../../util/APIUtil.js');


var NoteItem = React.createClass({

  deleteClick:function(){
    APIUtil.deleteNote(this.props.note.id);
  },


  render: function() {
    var chapterText, pageText;
    if(this.props.note.chapter === undefined || this.props.note.chapter === null){
        chapterText = "";
    }else{
      chapterText = "Chapter: " + this.props.note.chapter;
    }
    if(this.props.note.page === undefined || this.props.note.page === null){
        pageText = "";
    }else{
      pageText = "Page: " + this.props.note.page;
    }


    return (
      <div className="IndividualNote">
          <h4 className="NoteTitle">{this.props.note.title}</h4>
          <p className="NoteBody">{this.props.note.body}</p>
          <div className="NoteFooter">{chapterText + " " + pageText}</div>
          <button className="NoteDelete" onClick={this.deleteClick}>Delete Note</button>
      </div>
    );
  }

});

module.exports = NoteItem;
