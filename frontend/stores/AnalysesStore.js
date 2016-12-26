var Store = require('flux/utils').Store;
var _analyses = [];
var AnalysesConstants= require('../constants/AnalysisConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var AnalysesStore = new Store(AppDispatcher);

var resetAnalyses = function(results){
  _analyses = results;
};
var addAnalysis = function(anal){
  _analyses.push(anal);
};

AnalysesStore.all = function () {

  return _analyses;
};
AnalysesStore.empty = function(){
  _analyses =  [];
};


AnalysesStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case AnalysesConstants.ReceiveAnalyses:

      var result = resetAnalyses(payload.results);
      AnalysesStore.__emitChange();
      break;
    case AnalysesConstants.ReceiveNewAnalysis:
      var added = addAnalysis(payload.results);
      AnalysesStore.__emitChange();
      break;
    case AnalysesConstants.ReceiveAnalysis:
      // AnalysesStore.empty();
      AnalysesStore.__emitChange();
      break;
  }
};


module.exports = AnalysesStore;
