import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize the state with empty quotes ''
    this.state = {
    news:[],
    Search:"",
    SearchDate: "",
  }
}

  // a method that, when called, changes the value of this.state.value
  handleChange(e) {
    this.setState({value: e.target.value});
  }

 handleSubmitsearch(e) {
    // always put this line in on submits, it prevents the page from reloading and wiping your state
    e.preventDefault();
    this.fetchWords(this.state.search)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }

  handleSubmitdate(e) {
    // always put this line in on submits, it prevents the page from reloading and wiping your state
    e.preventDefault();
    this.fetchWords(this.state.searchDate)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }









  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          {/* they value of the input is tied to this.state.value so when a user types the handleChange method changes this.state.value to match*/}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default App;
