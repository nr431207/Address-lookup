import React from 'react';
import { truncateText } from '../utils/utils';
import * as style from './style.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // http://api.plos.org/search?q=title:%22Drosophila%22%20and%20body:%22RNA%22&fl=id,abstract&wt=json&indent=on

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
  }

  render() {
    return (
      <div>
        <h2>Welcome to your diary</h2>
        {this.state.data.map((article, index) => {
          return index < 21 &&
            <div key={index} className={style.box}>
              <div>
                <h3>{article.title}</h3>
                <div>{truncateText(article.body)}</div>
                {console.log(article.body)}
                <button>Delete</button>
              </div>
            </div>
        })}
        <button>Add</button>
      </div>
    )
  }

}
export default App;