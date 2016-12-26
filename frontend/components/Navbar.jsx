var React = require('react');
var History = require('react-router').History;
var APIUtil = require('../util/APIUtil.js');
var Modal = require('react-modal');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserStore = require('../stores/UserStore.js');
var ApiActions = require('../actions/api_actions.js');
var BookSearchStore = require('../stores/BookSearchStore.js');
var customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    backgroundImage   : 'url(\'http://res.cloudinary.com/litlitves/image/upload/v1458170635/crazyVines_gqglg8.png\')',
    zIndex            : 20,
    backgroundSize    : 'cover',
    // opacity           : 0.6
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
    borderRadius          : '10px',
    filter                : 'blur(\'4px\')',
    width                 : '300px',
    backgroundBlendMode   : 'darken',


  }
};

var quotes = [
  "\"We read to know we are not alone.\" -C.S.Lewis",
  "\"A reader lives a thousand lives before he dies\" -George R.R. Martin",
  "\"You can never get a cup of tea large enough, or a book long enough to suit me\" -C.S.Lewis",
  "\"It is what you read when you don't have to that determines what you will be when you can't help it.\" -Oscar Wilde"
]

var Navbar = React.createClass({
  mixins: [History, LinkedStateMixin],
  getInitialState: function(){
    this.toWhere = "/Search";
    return({loggedIn: UserStore.loggedIn(), username: null, password: null, modalIsOpen: false, message: ""})
  },
  componentDidMount: function(){
    this.userIndex = UserStore.addListener(this._onChange);
  },
  searchClick:function(event){

    this.history.push({pathname: "/Search"});
  },
  deskClick:function(event){
    if(this.state.loggedIn){
      this.history.push({pathname: "/Desk"});

    }else{
      this.setState({modalIsOpen: true, message: "login to continue"});
      this.toWhere = "/Desk";
    }
  },
  analysesClick: function(event){
    event.preventDefault();
    this.history.push({pathname: "/Analyses"});
  },
  openModal: function() {
    this.setState({modalIsOpen: true, chosen: BookSearchStore.currentBook()});
  },

  closeModal: function() {

    this.setState({modalIsOpen: false, message: ""});
  },
  signOutClick: function(event){

    APIUtil.logoutUser();

      ApiActions.emptyShelves();
      ApiActions.deleteCurrentBook();


    this.history.push({pathname: "/Search"});
  },
  signClick: function(event){
    event.preventDefault();
    this.clicked = true;

    if(this.state.password !== null && this.state.password.length >= 6){
      APIUtil.signIn(this.state.username, this.state.password);
    }
    else{
      this.state.password = "";
      this.setState({message: "invalid password, must be at least 6 digits please try again"});
    }

  },
  _onChange: function(){


    if(UserStore.loggedIn()){
      this.closeModal();
      this.setState({loggedIn: UserStore.loggedIn()});
      this.history.push({pathname: this.toWhere});

    }else{
      if(this.clicked){
        this.setState({message:"unsuccessful, please try again", loggedIn: UserStore.loggedIn()});
      }else {
        if(UserStore.needsToLogin()){
          this.openModal();
          this.setState({loggedIn: UserStore.loggedIn(), message: "login to continue"});
        }

      }
    }

  },
  signUpClick: function(event){
    event.preventDefault();

    this.clicked = true;
    if(this.state.username !== "" && this.state.password !== ""){
      APIUtil.createUser(this.state.username, this.state.password)
    }
    else {
      this.setState({message: "invalid password please try again"});
    }

  },
  logInAsGuest:function(event){
    event.preventDefault();

    this.clicked = true;
    APIUtil.signIn("guest_user", "password");
  },
  render: function() {
    var signB;
    var un;
    var cb;

    if(this.state.loggedIn){
      signB = <li className="nav-right" id="NavUser" onClick={this.signOutClick}>Sign Out</li>;
      un = UserStore.currentUser().username;
      if(BookSearchStore.currentBook() !== null){
        // cb = <div className="userNameLabel" id="bookTitle"> is currently exploring {BookSearchStore.currentBook().title}</div>;
        cb= {backgroundImage: "url(" + BookSearchStore.currentBook().image + ")"};
      }else {
        cb = null;
      }

    }
    else{
      signB = <li className="nav-right" id="NavUser" onClick={this.openModal}>Sign in/up!</li>
    }
    var quoteToUse = quotes[Math.floor(Math.random() * quotes.length)];

    return (
      <div className="Navbar">
        <nav className="header-nav group" >

           <div className="header-logo" onClick={this.searchClick}>
             <div className="logo-image">LL</div>

           </div>
           <div className='quote'> {quoteToUse}</div>

           <ul className="header-list group">

             <li className="nav-right" id="NavSearch" onClick={this.searchClick}>Search</li>
             <li className="nav-right" id="NavDesk" onClick={this.deskClick}>Desk</li>
             {signB}
           </ul>


         </nav>
         <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >


           <p className="loginMessage"> {this.state.message}</p>

            <form className="NoteForm">
              <div className="UserNameArea">

                <input type="text" className="UserNameInput" valueLink={this.linkState('username')} placeholder="enter a valid username"/>

              </div>
              <div className="PasswordArea">

                <input type="password" className="PasswordInput" placeholder="enter a 6 digit password" valueLink={this.linkState('password')} />

              </div>

              <div className="LoginButtonArea">
                <button className="SignButton" onClick={this.signClick}>Sign In!</button>
                <button className="SignButton" onClick={this.signUpClick}>Sign Up!</button>
                <div className="DividingOr">----------OR----------</div>
                <button className="SignButton" onClick={this.logInAsGuest}>Login as Guest</button>

              </div>

              </form>


            <button onClick={this.closeModal}>close</button>

          </Modal>
      </div>
    );
  }

});

// to add
//<li className="nav-right" id="NavAnal" onClick={this.analysesClick}>Essays</li>

module.exports = Navbar;
