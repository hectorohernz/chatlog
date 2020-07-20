import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: null,
      style: "dark-mode"
    };
    this.fetchTweets = this.fetchTweets.bind(this);
  }

  componentDidMount() {
    this.fetchTweets();
  }
  async fetchTweets() {
    const tweets = await axios.get('/api/feed');
    this.setState({ tweets: tweets.data })
  }


  render() {
    let renderJsx;
    if (this.state.tweets === null) {
      renderJsx = <section className="loading">
        <div class="lds-ripple"><div></div><div></div></div>
      </section>
    } else {
      renderJsx =
        <section>

          <section className="create-container">
            <div className="create-post">
             <h4>Create a Post</h4>
            </div>
          </section>

          <header className={`${this.state.style}`}>
            <h1>KIN</h1>
            <i class="fas fa-plus-square"></i>
          </header>

          <section className={`feed ${this.state.style}`}>
            {this.state.tweets.map(tweet =>
              <div className="tweet">
                <h3><i class="fas fa-user"></i>{tweet.name}</h3>
                <p><i class="fas fa-comment"></i>{tweet.tweet}</p>
              </div>
            )}
          </section>
        
        </section>
    }
    return (
      <>
        {renderJsx}
      </>
    )
  }
}

export default App;
