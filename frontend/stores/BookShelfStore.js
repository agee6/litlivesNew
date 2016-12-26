var Store = require('flux/utils').Store;
var _books = {read: [], toRead: [], reading: []};
var BookShelfConstants= require('../constants/BookShelfConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var BookShelfStore = new Store(AppDispatcher);

var resetBooks = function(results){
  _books = {};
  _books = results;
};
var addBook = function(book){
  if(book.read === "read"){
    _books.read.push(book);
  }else if(book.read === "toRead"){
    _books.toRead.push(book);
  }else {
    _books.reading.push(book);
  }

};

BookShelfStore.all = function () {

  return _books;
};
BookShelfStore.empty = function(){
  _books = {read: [], toRead: [], reading: []};
};
BookShelfStore.read = function(){

  return _books.read;

};
BookShelfStore.toRead = function(){

    return _books.toRead;

};
BookShelfStore.reading = function(){

    return _books.reading;

};

BookShelfStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case BookShelfConstants.ReceiveUserBooks:

      var result = resetBooks(payload.books);
      BookShelfStore.__emitChange();
      break;
    case BookShelfConstants.ReceiveAddedBook:
      var added = addBook(payload.book);
      BookShelfStore.__emitChange();
      break;
    case BookShelfConstants.EmptyShelves:
      BookShelfStore.empty();
      BookShelfStore.__emitChange();
      break;
  }
};

window.BookShelfStore = BookShelfStore;

module.exports = BookShelfStore;
