var React = require('react');
var History = require('react-router').History;
var APIUtil = require('../util/APIUtil.js');
var RadioGroup = require('react-radio-group');

var BookConfirmation = React.createClass({
  mixins: [History],
  getInitialState:function(){
    return({selectedValue: 'reading'})
  },
  handleChange: function(value){
    this.setState({selectedValue: value});
  },
  yesClick:function(event){
      event.preventDefault();
    var bookToSend = this.props.book;
    bookToSend.read = this.state.selectedValue;
    APIUtil.createBook(bookToSend);
    var url = "/Desk"
    this.history.push({pathname: url});
    //reroute to User Show with Book Display
  },
  noClick:function(event){
      event.preventDefault();
      this.props.close();
    //closeWindow and reset state of parent
  },
  render: function(){
    var chosen = this.props.book;
    return(
      <section className="BookConfirmation">
        <div>
          <h3 className="confirmationQuestion">Is the following the correct book?</h3>
            <h2 className="confirmationTitle">{chosen.title}</h2>
            <h3 className="byLine"> by, {chosen.author}</h3>
            <img className="confirmationImage" src={chosen.image}></img>
              <RadioGroup
                name="fruit"
                selectedValue={this.state.selectedValue}
                onChange={this.handleChange}>
                {Radio => (
                  <div>
                    <label>
                      <Radio value="read" />have read
                    </label>
                    <label>
                      <Radio value="toRead" />to read
                    </label>
                    <label>
                      <Radio value="reading" />reading
                    </label>
                  </div>
                )}
              </RadioGroup>
        </div>
          <button className="Confirmation" id="Yes" onClick={this.yesClick}>Yes</button>
          <button className="Confirmation" id="No" onClick={this.noClick}>Search Again</button>

      </section>
    )
  }

});
module.exports = BookConfirmation;
