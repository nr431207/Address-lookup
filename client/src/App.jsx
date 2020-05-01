import React from 'react';
import Diary from './Diary';
import Form from './Form';
import {
  isInputValid,
  submitDate,
  isTitleLong,
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
    this.handleShowSubmissionModal = this.handleShowSubmissionModal.bind(this);
  }

  fetchData() {
    fetch(`http://localhost:${process.env.PORT || 4000}/diaries`)
      .then(res => res.json())
      .then(data => {
        let count = 0;
        data.forEach(item => {
          count++
          item.showFormModal = false
        });
        this.setState({
          data,
          diaryCount: count
        })
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.fetchData()
  }

  onShowAlert() {
    this.setState({ showAlert: !this.state.showAlert })
  }

  onAddClick() {
    const data = this.state.data
    data.unshift({
      showFormModal: true,
      title: '',
      content: '',
      creationDate: ''
    })
    this.setState({ data })
  }

  handleCancel() {
    this.fetchData();
  }

  handleEdit(itemId) {
    const data = this.state.data.map(item => {
      if (item.id === itemId) {
        item.showFormModal = true;
      }
      return item
    })
    this.setState({ data })
  }

  handleDelete(e) {
    fetch(`http://localhost:${process.env.PORT || 4000}/diaries/${e.target.value}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response);
    this.fetchData();
    this.handleShowSubmissionModal();

  }

  handleShowSubmissionModal() {
    this.setState({ showSubmissionModal: !this.state.showSubmissionModal })
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
      this.handleShowSubmissionModal()
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
          .then((body) => console.log(body))
          .catch(error => {
            console.log('error: ', error)
          });
      } else {
        fetch(`http://localhost:${process.env.PORT || 4000}/post`, {
          method: 'post',
          headers,
          body
        })
          .then(response => response.json())
          .then((body) => console.log(body))
          .catch(error => {
            console.log('error: ', error)
          });
      }
      this.fetchData();
    }
  }

  render() {
    const { data, showSubmissionModal, isIncomplete, newDiary, diaryCount } = this.state;
    return (
      <div class="container-sm">
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
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit.bind(this, diary.id)}
                  handleShowSubmissionModal={this.handleShowSubmissionModal}
                />}
              {showSubmissionModal &&
                <SubmissionModal
                  handleShowSubmissionModal={this.handleShowSubmissionModal}
                  handleDelete={this.handleDelete}
                  diary={diary}
                  isIncomplete={isIncomplete}
                  newDiary={newDiary}
                />}
            </div>
          )
        })}
      </div>
    )
  }

}
export default App;