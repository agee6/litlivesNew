var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RadioGroup = require('react-radio-group');
var APIUtil = require('../../util/APIUtil.js');
var NoteStore = require('../../stores/NoteStore.js');
var NoteItem = require('./NoteItem.jsx');
var Modal = require('react-modal');
var Editor = require('../Editor.jsx');

var customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : 20,
    backgroundImage   : 'url(\'http://res.cloudinary.com/litlitves/image/upload/v1458170635/crazyVines_gqglg8.png\')',
    backgroundSize    : 'cover'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundImage       : 'url(\'https://images.unsplash.com/photo-1457298483369-0a95d2b17fcd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=f4fd0823787f85fcb27fd05027766a41\')',
    backgroundSize        : 'cover',
    borderRadius          : '10px'

  }
}

var Note = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return({noteText:"", title: "", pageNumber:null, selectedValue: true, allNotes: NoteStore.all(), chapter: null, modalIsOpen:false})
  },
  saveNote:function(event){
    event.preventDefault();

    var pn = parseInt(this.state.pageNumber);
    var chap = parseInt(this.state.chapter);
    if(isNaN(pn)){
      pn = null;
    }
    if(isNaN(chap)){
      chap = null;
    }

    var noteHash = { body: this.state.noteText, page: pn, public: true,chapter: chap, book_id: this.props.currentBook.id};

    APIUtil.createNote(noteHash);
    this.state.noteText = "";
    this.state.title = "";
    this.state.pageNumber = null;
    this.state.chapter= null;
    this.closeModal();


  },
  submitNote: function(noteText){
    var noteHash = { body: noteText, page: null, public: true,chapter: null, book_id: this.props.currentBook.id};

    APIUtil.createNote(noteHash);
    this.state.noteText = "";
    this.state.title = "";
    this.state.pageNumber = null;
    this.state.chapter= null;

  },
  addNote: function(noteText){
    debugger;
    var noteHash = { body: noteText, page: pn, public: true,chapter: chap, book_id: this.props.currentBook.id};
    this.state.noteText = "";
    this.state.title = "";
    this.state.pageNumber = null;
    this.state.chapter= null;


  },
  handleChange: function(value){
    this.setState({selectedValue: value});
  },
  componentDidMount: function(){
    this.sI = NoteStore.addListener(this._onChange);
    APIUtil.fetchNotes(this.props.currentBook.id);
  },
  componentWillUnmount: function(){
    this.sI.remove();
  },
  _onChange: function(){
    this.setState({allNotes: NoteStore.all()})
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  addNoteSate: function(content){
    debugger;
  },
  passUpState: function(contentState){
    this.currentNoteContent = contentState;
    debugger;
  },

  render: function() {
    var noteDisplay = this.state.allNotes.map(function(note){
      return(<NoteItem note={note} key={note.body} />);
    });
    if (this.state.allNotes.length === 0){
      noteDisplay = (<div className="individual-note-area">No Notes to display</div> )
    }
    var banana = this.props.currentBook.title;
    var NoteStyle = {
      // backgroundImage: 'url(\'' + this.props.currentBook.image + '\')',
      // backgroundSize: 'cover'
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
