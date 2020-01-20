import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize the state with empty quotes ''
    this.state = {
    news:[],
    SearchAny:"",
    searchDates: "",
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
    this.fetchDates(this.state.searchDates)
    // after doing something with the data we reset the form value to empty quotes again
    this.setState({value: ''})
  }
//All the handle options I pulled straight from the prework and modified with the fetch functions

  fetchAny = (search) => {
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
// I saw a video on setting up my fetches this syntax was a little different for my beer app but this works well with less lines.

    fetchDates = (search) => {
      fetch (`http://hn.algolia.com/api/v1/search_by_date?query=${search}&tags=story`)
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
            type = 'date'
            name= 'searchDates'
            placeholder="Search by Dates"
            value={this.state.searchDates}
            onChange={this.handleChange}></input>
            <button onClick={this.handleSubmitDate}>Search</button>
          </form>
          </div>
          <div className="results-show">
          {this.state.news.map ((news, index) => (
            <div>
              <div key={index+1}>
                <p><a href={news.url}>{news.title}</a></p>
                <p>{news.story_text}</p>
                <p>Published: {news.created_at}</p>
              </div>
            </div>
          ))}
        </div>
          </div>
      )
          }
  }
  // Finally got my render to work I got held up literally 30minutes on this part cause I had "onclick" instead of "onClick"..... so yea haha....also forgot to change my type to date for the input on the dates fetch.
  

export default App;


