import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize the state with empty quotes ''
    this.state = {
    news:[],
    SearchAny:"",
    SearchDates: "",
  }
}

  // a method that, when called, changes the value of this.state.value
 handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

 handleSubmitSearch =(e) => {
    // always put this line in on submits, it prevents the page from reloading and wiping your state
    e.preventDefault();
    this.fetchAny(this.state.SearchAny)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }

  handleSubmitDate =(e) => {
    // always put this line in on submits, it prevents the page from reloading and wiping your state
    e.preventDefault();
    this.fetchDate(this.state.SearchDates)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }

  fetchAny = () => {
    fetch (`http://hn.algolia.com/api/v1/search?query=&tags=story`)
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

    fetchAuthor = () => {
      fetch (`http://hn.algolia.com/api/v1/search_by_date?query=$tags=story`)
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
            <button onClick={this.handleSubmitSearch}>Search</button>
          </form>
          <form>
            <input
            type = 'text'
            name= 'SearchDates'
            placeholder="Search by Dates"
            value={this.state.SearchDates}
            onChange={this.handleChange}></input>
            <button onclick={this.handleSubmitDate}>Search</button>
          </form>
          </div>
          <div className="results-show">
          {this.state.news.map ((news, index) => (
            <div>
              <div key={index}>
                <p><a href={news.url}>{news.title}</a> by {news.dates}</p>
                <p>Published: {news.created_at}</p>
              </div>
            </div>
          ))}
        </div>
          </div>
      );
          }
  }
    
  

export default App;
