import React, { Component } from 'react';
class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: '',statetrue: false,nameAvailable:false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        let alicja = /[^a-zA-Z]/;


        if(!alicja.test(event.target.value)){
          this.setState({statetrue: true});
          //alert('mabuhay'+this.state.value);
        }
        else{
          this.setState({statetrue:false});
          //alert ('invalid use corrent info');
        }
          this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        //alert('A name was submitted: '+  this.state.value);
          if(this.state.statetrue)
            this.setState({nameAvailable:true})
        event.preventDefault();
      }
//
//this.functioname = this.functionname.bind(this))
//
      render() {
          return (
            <div>
            {(this.state.nameAvailable && this.state.value!="") ? <div>{this.state.value }Hello</div> :
            <form onSubmit={this.handleSubmit}>

          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          {(!this.state.statetrue&&this.state.value!='')?<div>error</div>:null }
        </form>}

        </div>
          );
      }
    }

 export default NameForm;
