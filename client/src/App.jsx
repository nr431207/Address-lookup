import React from 'react';
import Form from './Form';
import Diary from './Diary';
import { isInputValid } from '../utils/utils';
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
      isEditMode: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
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

  handleContentChange(e) {
    this.setState({ content: e.target.value })
  }

  handleDate(e) {
    this.setState({ date: e.target.value })
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

  handleEdit(e) {
    this.setState({ isEditMode: !this.state.isEditMode })
  }

  handleEditSubmit(e) {
    e.preventDefault();
    const { date, title, content, isEditMode } = this.state;
    console.log(title, content, date)
    if (!isInputValid(date, title, content)) {
      alert('one or more of fields is empty, please complete all fields')
    } else {
      this.setState({ isEditMode: !isEditMode })
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: date
        })
      };
      fetch(`http://localhost:${process.env.PORT || 4000}/put/${e.target.value}`, requestOptions)
        .then(response => response.json())
        .then((body) => console.log(body))
        .catch(error => {
          console.log('error: ', error)
        });
      this.fetchData();
    }

  }

  handleSubmit(e) {
    const { date, title, content, showFormModal } = this.state;
    e.preventDefault();
    if (!isInputValid(date, title, content)) {
      alert('one or more of fields is empty, please complete all fields')
    } else {
      this.setState({ showFormModal: !showFormModal })
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          date: date
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
      data,
      showFormModal,
      isEditMode
    } = this.state
    return (
      showFormModal ? <div>
        <Form
          onClose={this.onAddClick}
          onSubmit={this.handleSubmit}
          handleTitleChange={this.handleTitleChange}
          handleContentChange={this.handleContentChange}
          handleDate={this.handleDate}
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
                handleEdit={this.handleEdit}
                handleEditSubmit={this.handleEditSubmit}
                isEditMode={isEditMode}
                handleTitleChange={this.handleTitleChange}
                handleContentChange={this.handleContentChange}
              />
            )
          })}
          <div><button onClick={this.onAddClick}>Add a diary</button></div>
        </div>
    )
  }

}
export default App;