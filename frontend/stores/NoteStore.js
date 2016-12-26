var Store = require('flux/utils').Store;
var _notes = [];
var NoteConstants = require('../constants/NoteConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteStore = new Store(AppDispatcher);
var APIUtil = require('../util/APIUtil.js');


var resetNotes = function(notes){

  _notes = [];
  if(notes === null){
    _notes = [];
  }else {
    _notes = notes.slice(0);

  }
  
};
var addNote = function(note){

  _notes.push(note);
};

NoteStore.all = function () {
  return _notes.slice(0);
};
NoteStore.empty = function(){
  _notes = [];
};

NoteStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case NoteConstants.ReceiveNotes:
      var result = resetNotes(payload.results);
      NoteStore.__emitChange();
      break;
    case NoteConstants.AddNote:
      var r2 = addNote(payload.result);
      NoteStore.__emitChange();
      break;

  }
};

Window.exports = NoteStore;
module.exports = NoteStore;
