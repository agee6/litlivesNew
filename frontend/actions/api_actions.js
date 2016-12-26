var AppDispatcher = require('../dispatcher/dispatcher');
var BookSearchConstants = require('../constants/BookSearchConstants');
var BookShelfConstants = require('../constants/BookShelfConstants');
var NoteConstants = require('../constants/NoteConstants');
var UserConstants = require('../constants/UserConstants');
var AnalysisConstants = require('../constants/AnalysisConstants');

var ApiActions = {

  ReceiveActions: function(bookList){

    AppDispatcher.dispatch({
      actionType: BookSearchConstants.SearchResultsReceived,
      results: bookList.items
    });
  },
  ReceiveInitial: function(bookList){


    AppDispatcher.dispatch({
      actionType: BookSearchConstants.InitialResultsReceived,
      results: bookList
    });
  },
  receiveUserBooks: function(books){

    AppDispatcher.dispatch({
      actionType: BookShelfConstants.ReceiveUserBooks,
      books: books
    });
  },
  ReceiveAddedBook: function(book){
    AppDispatcher.dispatch({
      actionType: BookShelfConstants.ReceiveAddedBook,
      book: book
    });

  },
  updateCurrentBook: function(book){

    AppDispatcher.dispatch({
      actionType: BookSearchConstants.ReceiveCurrentBook,
      book: book
    });
  },
  emptyShelves: function(){

    AppDispatcher.dispatch({
      actionType: BookShelfConstants.EmptyShelves
    });
  },
  deleteCurrentBook: function(){
    AppDispatcher.dispatch({
      actionType: BookSearchConstants.DeleteCurrentBook
    });
  },
  AddToInitial: function(newBookList){
    AppDispatcher.dispatch({
      actionType: BookSearchConstants.AddInitialReceived,
      results: newBookList
    });
  },
  receiveNotes: function(notes){
    AppDispatcher.dispatch({
      actionType: NoteConstants.ReceiveNotes,
      results: notes
    });
  },
  addNote: function(payload){
    AppDispatcher.dispatch({
      actionType: NoteConstants.AddNote,
      result: payload
    });
  },
  receiveUser: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.ReceiveUser,
      results: user
    });
  },
  receiveNewAnalysis: function(analysis){
    AppDispatcher.dispatch({
      actionType: AnalysisConstants.RecieveNewAnalysis,
      results: analysis
    });
  },
  receiveAnalyses: function(analyses){
    AppDispatcher.dispatch({
      actionType: AnalysisConstants.ReceiveAnalyses,
      results: analyses
    });
  },
  receiveAnalysis: function(analysis){
    AppDispatcher.dispatch({
      actionType: AnalysisConstants.ReceiveAnalysis,
      results: analysis
    });
  },
  demandLogin: function(need){
    AppDispatcher.dispatch({
      actionType: UserConstants.UpdateNeeds,
      need: need
    })
  }
};

module.exports = ApiActions;
