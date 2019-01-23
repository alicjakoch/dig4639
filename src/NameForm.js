import React, { Component } from 'react';
class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: '',statetrue: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('A name was submitted: '+  this.state.value);
        let alicja = /^[a-zA-Z]+( [a-zA-Z]+)*/;


        if(alicja.test(this.state.value)){
          this.setState({statetrue: true});
          alert('mabuhay'+this.state.value);
        }
        else{
          alert ('invalid use corrent info');
        }
        event.preventDefault();
      }
//
//this.functioname = this.functionname.bind(this))
//
      render() {
          return (
            <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>


          <input type="submit" value="Submit" />
        </form>
          );
      }
    }

 export default NameForm;
