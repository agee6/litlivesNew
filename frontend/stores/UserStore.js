var Store = require('flux/utils').Store;
var _users = [];
var needsToLogin = false;
var UserConstants = require('../constants/UserConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var UserStore = new Store(AppDispatcher);


var resetUser = function(user){
  _users = [];
  _users[0] = user;
};
var updateNeeds = function(need){
  needsToLogin = need;
};
UserStore.loggedIn = function(){
  if(_users[0] === undefined || _users[0] === null){
    return false;
  }else{
    return true;
  }
};
UserStore.needsToLogin = function(){
  return needsToLogin;
};

UserStore.currentUser = function () {
  return _users[0];
};
UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.RegisterUser:
      var result = resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.LogoutUser:
      var logout = resetUser(null);
      UserStore.__emitChange();
      break;
    case UserConstants.ReceiveUser:
      var r2 = resetUser(payload.results);
      UserStore.__emitChange();
      break;
    case UserConstants.UpdateNeeds:
      var d2 = updateNeeds(payload.need);
      UserStore.__emitChange();
      break;
  }
};
window.UserStore = UserStore;

module.exports = UserStore;
