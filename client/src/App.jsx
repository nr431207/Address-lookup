import React from 'react';
import Form from './Form';
import Diary from './Diary';
import { isInputValid, createDate } from '../utils/utils';
import cx from 'classnames';
import * as style from './style.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: '',
      content: '',
      date: '',
      showFormModal: false,

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  handleDateChange(e) {
    this.setState({ date: e.target.value })
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value })
  }

  onAddClick() {
    this.setState({ showFormModal: !this.state.showFormModal })
  }

  handleDelete(e) {
    fetch(`http://localhost:${process.env.PORT || 4000}/diaries/${e.target.value}`, {
      method: 'delete'
    })
      .then(response => console.log('this is response => ', response));
    this.fetchData();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, content, showFormModal } = this.state;
    let today = createDate()
    console.log(today)
    if (!isInputValid(title, content)) {
      alert('one or more of fields is empty, please complete all fields')
    } else {
      this.setState({ showFormModal: !showFormModal })
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: today
        })
      };
      fetch(`http://localhost:${process.env.PORT || 4000}/post`, requestOptions)
        .then(response => response.json())
        .then((body) => console.log(body))
        .catch(error => {
          console.log('error: ', error)
        });
      this.fetchData();
    }
  }

  render() {
    const {
      showFormModal,
      data
    } = this.state
    return (
      showFormModal ? <div>
        <Form
          onClose={this.onAddClick}
          onSubmit={this.handleSubmit}
          handleTitleChange={this.handleTitleChange}
          handleContentChange={this.handleContentChange}
          handleDateChange={this.handleDateChange}
        />
      </div> :
        <div>
          <div className={style.heading}>Welcome to your diary</div>
          {data.map((diary, index) => {
            return (
              <Diary
                key={index}
                diary={diary}
                handleDelete={this.handleDelete}
              />
            )
          })}
          <div><button onClick={this.onAddClick}>Add a diary</button></div>
        </div>
    )
  }

}
export default App;