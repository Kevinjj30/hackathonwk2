import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize the state with empty quotes ''
    this.state = {
    news:[],
    SearchAny:"",
    SearchDate: "",
  }
}

  // a method that, when called, changes the value of this.state.value
 handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

 handleSubmitsearch =(e) => {
    // always put this line in on submits, it prevents the page from reloading and wiping your state
    e.preventDefault();
    this.fetchany(this.state.SearchAny)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }

  handleSubmitdate =(e) => {
    // always put this line in on submits, it prevents the page from reloading and wiping your state
    e.preventDefault();
    this.fetchdate(this.state.SearchDate)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }

  fetchany = (search) => {
    fetch (`http://hn.algolia.com/api/v1/search?query=${search}&tags=story`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length > 0) {
        this.setState({news: data.hits})
      } else {
        this.setState("No results found. Please search again.")
      }
    })
    .catch(error => console.log("Parsing failed: ", error))
  }

    fetchdate = (search) => {
      fetch (`http://hn.algolia.com/api/v1/search?query=${search}&tags=story`)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length > 0) {
          this.setState({news: data.hits})
        } else {
          this.setState("No results found. Please search again.")
        }
      })
      .catch(error => console.log("Parsing failed: ", error))
    }




  render() {
    return (
      <div className= "body-container">
      <div className="form-container">
        <form>
          <input
            type= "text"
            name='SearchAny'
            placeholder="Search News"
            value={this.state.SearchAny}
            onChange={this.handleChange}
          ></input>
          <button onClick={this.handleSubmitsearch}>Search</button>
        </form>
        </div>
        </div>
    );
  }
} 
  

export default App;
