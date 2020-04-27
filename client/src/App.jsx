import React from 'react';
import { truncateText } from '../utils/utils';
import * as style from './style.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: '',
      content: '',
      date: '',
      isAdding: false
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  fetchData() {
    fetch(`http://localhost:${process.env.PORT || 4000}/diaries`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.fetchData()
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isAdding: !this.state.isAdding })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        date: this.state.date
      })
    };
    fetch(`http://localhost:${process.env.PORT || 4000}/post`, requestOptions)
      .then(response => response.json())
      .then((body) => console.log(body))
      .catch(error => {
        this.setState({ errorMessage: error });
        console.error('There was an error!', error);
      });
    this.fetchData();
  }

  handleAdd() {
    this.setState({ isAdding: !this.state.isAdding })
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }
  handleContentChange(e) {
    this.setState({ content: e.target.value })
  }
  handleDate(e) {
    this.setState({ date: e.target.value })
  }
  handleDelete(e) {
    console.log('hi => ', e.target.value)
    fetch(`http://localhost:${process.env.PORT || 4000}/diaries/${e.target.value}`, {
      method: 'delete'
    })
      .then(response => console.log('this is response => ', response));
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h2>Welcome to your diary</h2>
        {this.state.data.map((diary, index) => {
          return index < 21 &&
            <div key={index} className={style.box}>
              <div>
                <h3>{diary.title}</h3>
                <div>{truncateText(diary.content)}</div>
                <button onClick={this.handleDelete} value={diary.id}>Delete</button>
              </div>
            </div>
        })}
        {this.state.isAdding ? <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input placeholder="title" onChange={this.handleTitleChange}></input>
            </div>
            <div>
              <textarea placeholder="how was today?" onChange={this.handleContentChange}></textarea>
            </div>
            <div>
              <input type="date" onChange={this.handleDate}></input>
            </div>
            <button>Submit</button>
          </form>
        </div> : ''}
        <div><button onClick={this.handleAdd}>Add a diary</button></div>
      </div>
    )
  }

}
export default App;