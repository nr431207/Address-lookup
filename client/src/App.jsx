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
import { connect } from 'react-redux';
import * as actions from './actions/actionCreators';
import * as style from './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
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
    return (
      <div className="container-sm">
        <div className={style.heading}>My Diary Book</div>{`Total diaries: ${this.props.diaryCount}`}
        <div><Button variant="primary" onClick={this.props.addNewItem}>Add a new diary</Button></div>
        {this.props.data.map((diary, index) => {
          return (
            <div key={index}>
              {diary.showFormModal ?
                <Form
                  handleSubmit={this.handleSubmit}
                  handleCancel={this.props.fetchData}
                  diary={diary}
                />
                :
                <Diary
                  diary={diary}
                  showSubmissionModal={this.props.showSubmissionModal}
                  handleEdit={this.props.handleEdit(diary.id)}
                  toggleDeleteModal={this.props.toggleDeleteModal(id.currentTarget.getAttribute('value'))}
                />}
            </div>
          )
        })}
        {this.props.showSubmissionModal &&
          <SubmissionModal
            toggleModal={this.props.toggleModal}
            handleDelete={this.props.handleDelete(id.currentTarget.getAttribute('value'))}
            id={this.props.idToBeDeleted}
            isIncomplete={this.props.isIncomplete}
            newDiary={this.props.newDiary}
          />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data,
  idToBeDeleted: state.idToBeDeleted,
  showSubmissionModal: state.showSubmissionModal,
  diaryCount: state.diaryCount,
  isIncomplete: state.isIncomplete,
  newDiary: state.newDiary,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  toggleDeleteModal: () => dispatch(actions.toggleDeleteModal()),
  fetchData: () => dispatch(actions.fetchData()),
  addNewItem: () => dispatch(actions.addNewItem()),
  handleEdit: (id) => dispatch(actions.handleEdit(id)),
  deleteItem: (id) => dispatch(actions.deleteItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);