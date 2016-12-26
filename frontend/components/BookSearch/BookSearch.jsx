var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
// var ReactRouter = require('react-router');
// var History = require('react-router').History;
var DropDown = require('./DropDown.jsx');

var BookSearch = React.createClass({
  // mixins: [LinkedStateMixin],

  getInitialState: function() {
    this.styleSheetShow = document.createElement('style');
    this.styleSheetShow.innerHTML = ".pac-container {display: block;}";
    // this.styleSheetHide = document.createElement('style');
    // this.styleSheetHide.innerHTML = ".pac-container {display: none;}";

    return ({
      book: "",
      placeholder: "What book would you like to Explore?",
      showAutocomplete: false,
      showSpinner: false
    });
  },

  searchBarMoveUp: function() {
    // debugger;
    // this.refs.searchbar.style{{bottom: "10%"}}
    $("#landing-search-bar").css("bottom", "20%");
    setTimeout(function(){
        this.setState({
          showAutocomplete: true
        });
        // debugger;
    }.bind(this), 1800);
    // this.hideAutocomplete();
    // this.tempToken = setTimeout(this.showAutocomplete, 2000);
  },

  // showAutocomplete: function() {
  //   // document.body.appendChild(this.styleSheetShow);
  //   document.body.appendChild(this.styleSheetShow);
  // },
  //
  // hideAutocomplete: function() {
  //   // clearTimeout(this.tempToken);
  //   // document.body.appendChild(this.styleSheetHide);
  // },

  searchBarMoveBack: function() {
    $("#landing-search-bar").css("bottom", "0%");
    // this.hideAutocomplete();

    // setTimeout(function(){
      this.setState({
        showAutocomplete: false
      });
    //     // debugger;
    // }.bind(this), 500);
  },


  handleSearch: function(e) {
    if (arguments.length > 0) {
      e.preventDefault();
    }

    // may use History mixins;
    // this.history.pushState(null, 'search/' + this.state.loc)
    // debugger;

    if (this.state.loc === ""){
      this.setState({
        placeholder: "Please choose a book"
      });
    } else {
      setTimeout(this.redirectToSearch, 2000);
      this.setState({
        showSpinner: true
      })

    }
  },

  redirectToSearch: function() {
    // var loc = this.state.loc.replace(/\W+/g, "-");
    // console.log("pushStatefromsearch");
    // this.props.history.pushState(null, 'search/' + loc);
  },



  handleLocChange: function(e) {
    // console.log(this.refs.locinput.value);
    this.setState({
      book: this.refs.locinput.value
    });
    if (this.refs.locinput.value > 0 ){
      APIUtil.fetchBookResults(this.refs.locinput.value);
    }
    // autocomplete: needs to add a delay using setTimeout and clearTimeout to cancel if the user changes before timeout expires
  },

  render: function() {
    var org1 = (
      <div>
        <form className="form-horizontal" role="form" onSubmit={this.handleSearch}>
          <div className="input-group input-group-lg">
            <input
               type="text"
               className="form-control"

               placeholder= {this.state.placeholder} />
            <span className="input-group-addon">@</span>
          </div>
          <button>Search</button>
        </form>
      </div>
    );

    var design1 = (
      <div className="col-xs-12" id="landing-search-bar">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
              <form  role="form" onSubmit={this.handleSearch}>
                <div className="input-group">
                  <input
                     type="text"
                     className="form-control"

                     placeholder= {this.state.placeholder} />
                   <span className="input-group-button">
                     <button className="btn btn-default" type="button">Search</button>
                   </span>
                </div>
              </form>
          </div>
        </div>
      </div>
    );
    var buttonSubmit = (
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.handleSearch}>Search</button>
      </span>
    );

    var buttonProgress = (
      <span className="input-group-btn">
        <button className="btn btn-default" disabled>
          <div className="three-quarters-loader">
            Loading…
          </div>
        </button>
      </span>
    );
    var design2 = (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="col-xs-offset-2 col-xs-8">
              <form className="input-group" role="form" onSubmit={this.handleSearch}>
                <input
                   type="text"
                   className="form-control center"
                   id="landing-search-input"
                   onChange={this.handleLocChange}
                   placeholder={this.state.placeholder}
                   ref="locinput"
                   onFocus={this.searchBarMoveUp}
                   onBlur={this.searchBarMoveBack}/>

                 {this.state.showSpinner ? buttonProgress : buttonSubmit}

              </form>
            </div>
          </div>
        </div>
      </div>
    );

    var showAutocomplete = (this.state.loc !== "") && this.state.showAutocomplete;
    // console.log("toggle autocomplete: " + showAutocomplete)
    // var showAutocomplete = (this.state.loc !== "");
    return (

      <div className="col-xs-12" id="landing-search-bar" ref="searchbar">
        {design2}
        {showAutocomplete ? <DropDown
                              locinput={this.refs.locinput}
                              handleSearch={this.handleSearch}
                              handleLocChange={this.handleLocChange}/> : "" }
      </div>
    );
  }
});

module.exports = BookSearch;
