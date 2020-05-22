import React from 'react';
import Diary from './Diary';
import Form from './Form';
import {
  isInputValid,
  isTitleLong,
  submitDate,
  isContentLong
} from '../utils/utils';
import SubmissionModal from './SubmissionModal';
import Button from 'react-bootstrap/Button';
import * as style from './style.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      idToBeDeleted: null,
      showSubmissionModal: false,
      diaryCount: 0,
      showAlert: false,
      isIncomplete: false,
      newDiary: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  async fetchData() {
    try {
      const response = await fetch(`http://localhost:${process.env.PORT || 4000}/diaries`);
      const data = await response.json();
      let count = 0;
      data.forEach(item => {
        count++
        item.showFormModal = false
      });
      this.setState({
        data,
        diaryCount: count
      })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  onShowAlert() {
    this.setState({ showAlert: !this.state.showAlert });
  }

  onAddClick() {
    const data = this.state.data;
    data.unshift({
      showFormModal: true,
      title: '',
      content: '',
      creationDate: ''
    })
    this.setState({ data });
  }

  handleCancel() {
    this.fetchData();
  }

  handleEdit(itemId) {
    const data = this.state.data.map(item => {
      if (item.id === itemId) {
        item.showFormModal = true;
      }
      return item;
    })
    this.setState({ data })
  }

  handleDelete(id) {
    let itemId = id.currentTarget.getAttribute('value');
    fetch(`http://localhost:${process.env.PORT || 4000}/diaries/${itemId}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response);
    this.fetchData();
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showSubmissionModal: !this.state.showSubmissionModal });
  }

  toggleDeleteModal(id) {
    this.setState({
      showSubmissionModal: !this.state.showSubmissionModal,
      idToBeDeleted: id.currentTarget.getAttribute('value')
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = JSON.stringify({
      title: data.get('title'),
      content: data.get('content'),
      creationDate: submitDate()
    })
    if (!isInputValid(body) || isTitleLong(JSON.parse(body)) || isContentLong(JSON.parse(body))) {
      this.setState({
        isIncomplete: true,
        newDiary: body
      })
      this.toggleModal();
    } else {
      this.setState({ isIncomplete: false })
      const headers = { 'Content-Type': 'application/json' }
      if (data.get('id')) {
        fetch(`http://localhost:${process.env.PORT || 4000}/put/${data.get('id')}`, {
          method: 'PUT',
          headers,
          body
        })
          .then(response => response.json())
          .then(body => body)
          .catch(error => error);
      } else {
        fetch(`http://localhost:${process.env.PORT || 4000}/post`, {
          method: 'post',
          headers,
          body
        })
          .then(response => response.json())
          .then(body => body)
          .catch(error => {
            console.log(error)
          })
      }
      this.fetchData();
    }
  }

  render() {
    const { data, showSubmissionModal, isIncomplete, newDiary, diaryCount } = this.state;
    return (
      <div className="container-sm">
        <div className={style.heading}>My Diary Book</div>{`Total diaries: ${diaryCount}`}
        <div><Button variant="primary" onClick={this.onAddClick}>Add a new diary</Button></div>
        {data.map((diary, index) => {
          return (
            <div key={index}>
              {diary.showFormModal ?
                <Form
                  handleSubmit={this.handleSubmit}
                  handleCancel={this.handleCancel}
                  diary={diary}
                />
                :
                <Diary
                  diary={diary}
                  showSubmissionModal={showSubmissionModal}
                  handleEdit={this.handleEdit.bind(this, diary.id)}
                  toggleDeleteModal={this.toggleDeleteModal}
                />}
            </div>
          )
        })}
        {showSubmissionModal &&
          <SubmissionModal
            toggleModal={this.toggleModal}
            handleDelete={this.handleDelete}
            id={this.state.idToBeDeleted}
            isIncomplete={isIncomplete}
            newDiary={newDiary}
          />}
      </div>
    )
  }
}

export default App;