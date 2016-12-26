var React = require('react');
var PropTypes = React.PropTypes;
var AnalysisStore = require('../../stores/AnalysesStore.js');
var APIUtil = require('../../util/APIUtil.js');
var UserStore = require('../../stores/UserStore.js');
var AnalysisEditor = require('./AnalysisEditor.jsx');
var BookSearchStore = require('../../stores/BookSearchStore.js');


var Analyses = React.createClass({

  getInitialState: function(){
    return({analyses: AnalysisStore.all(), loggedIn: UserStore.loggedIn(), creating: false, title: "", body: "", currentBook: BookSearchStore.currentBook()});
  },
  componentDidMount: function(){
    APIUtil.fetchAnalyses({});
    this.analysesIndex = AnalysisStore.addListener(this._onChange);
    this.userIndex = UserStore.addListener(this._onChange);
  },
  componentWillUnmount: function(){
    this.analysesIndex.remove();
    this.userIndex.remove();
  },
  _onChange: function(){
    this.setState({analyses: AnalysisStore.all(), loggedIn: UserStore.loggedIn()});
  },
  createClick: function(event){
    event.preventDefault();
    console.log("openModal?");
    this.setState({creating: true});

  },
  deskView: function(event){
    event.preventDefault();
    console.log("go to Desk page?");
  },
  submitAnalysis: function(analysisEditor){

  },
  onEditorChange: function(data){
    this.setState({body: data});
  },
  titleChange: function(data){
    this.setState({title: data});
  },
  submitEssay: function(data){
    console.log(data);
    var analysisObj= {body: data, title:this.state.title, book_id: this.state.currentBook.id};
    APIUtil.createAnalysis(analysisObj);
  },
  render: function() {

    var display;

    if(this.state.creating){
      display= <div className="new-analysis">

        <input type="text" className="analysis-title-input" onChange={this.titleChange}  placeholder="Insert Title here..."/>
        <AnalysisEditor onEditorChange={this.onEditorChange} submitEssay={this.submitEssay}/>
      </div>
    }else{
      var createButton, userView;
      var analysisList = this.state.analyses.map(function(analysis){
        return(<AnalysisListItem analysis={analysis} key={analysis.id} />);
      }, this);
      if(this.state.loggedIn){
        createButton = <button className="analysis-header" id="create-button" onClick={this.createClick}>Create New</button>
        // userView = <button className="analysis-header" id="user-view" onClick={this.deskView}>View Your Reviews</button>
      }else {
        createButton = <div />
        userView = <div />
      }
      display= <div className="analysis-index" id="analysis-index-main">
                  <div className="analysis-index" id="analysis-body">
                    {analysisList}
                  </div>
                  <div className="analysis-index" id="analysis-header">
                    {createButton}
                  </div>
                </div>
    }

    return (
      <div className="analysis-display-area">
        {display}
      </div>
    );
  }

});

module.exports = Analyses;
