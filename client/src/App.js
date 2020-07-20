import React from 'react';
import './App.css';
import axios from 'axios';
import AOS from 'aos'; 
import 'aos/dist/aos.css';
import { uuid } from 'uuidv4';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: null,
      style: "dark-mode",
      create: false,
      name: "",
      tweet: ""

    };
    this.fetchTweets = this.fetchTweets.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.fetchTweets();
    AOS.init({
      duration : 1000
    });
    AOS.refresh();
  }
  async fetchTweets() {
    const tweets = await axios.get('/api/feed');
    this.setState({ tweets: tweets.data })
  }

  async submitHandler(e) {
    // Use a out-sourced function from actions to make an api call with axios
    e.preventDefault();
    const { tweet, name } = this.state;
    const body = {
      tweet: tweet,
      name: name
    };

    const config = {
      headers: {
        'Content-Type': "application/json"
      }
    };
    try {
      await axios.post("/api/post", body, config);
      this.setState({create:false});
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    };
  };



  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let renderJsx;
    let activePost;

    if(this.state.create === true){
      activePost = 
      <>
      <section className="create-container"  data-aos="zoom-in">
        <button className="close-btn" onClick={ () => this.setState({create:false})}><i className="fas fa-times"></i></button>
        <div className="create-post">
          <h4>Create a Post</h4>
          <form className="create-post-form" onSubmit={this.submitHandler}>
            <input type="text" name="name" placeholder="Enter Name" onChange={this.changeHandler} required />
            <input type="text" name="tweet" placeholder="Tweet" onChange={this.changeHandler}  required/>
            <input type="submit" />
          </form>
        </div>
      </section>
    </>
    } 



    if (this.state.tweets === null) {
      renderJsx = <section className="loading">
        <div className="lds-ripple"><div></div><div></div></div>
      </section>
    } else {
      renderJsx =
        <>
          {activePost}
          <header className={`${this.state.style}`}>
            <h1>KIN</h1>
            <i className="fas fa-plus-square" onClick={ () => this.setState({create:true})}></i>
          </header>

          <section className={`feed ${this.state.style}`}>
            {this.state.tweets.map(tweet =>
              <div className="tweet" key={uuid()}>
                <h3><i className="fas fa-comment"></i>{tweet.tweet}</h3>
                <p><i className="fas fa-user"></i>{tweet.name}</p>
              </div>
            )}
          </section>
        </>
    }
    return (
      <>
        {renderJsx}
      </>
    )
  }
}

export default App;
