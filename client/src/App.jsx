import React, { useState, useEffect, useCallback } from 'react';
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

const App = () => {
  const [data, setData] = useState([]);
  const [idToBeDeleted, setIdToBeDeleted] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [diaryCount, setDiaryCount] = useState(0);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [newDiary, setNewDiary] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:${process.env.PORT || 4000}/diaries`);
      const fetchedData = await response.json();
      const count = fetchedData.length;
      const updatedData = fetchedData.map(item => ({
        ...item,
        showFormModal: false
      }));
      setData(updatedData);
      setDiaryCount(count);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onAddClick = () => {
    setData(prevData => [
      {
        showFormModal: true,
        title: '',
        content: '',
        creationDate: ''
      },
      ...prevData
    ]);
  };

  const handleCancel = () => {
    fetchData();
  };

  const handleEdit = (itemId) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, showFormModal: true } : item
      )
    );
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:${process.env.PORT || 4000}/diaries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    fetchData();
    toggleModal();
  };

  const toggleModal = () => {
    setShowSubmissionModal(!showSubmissionModal);
  };

  const toggleDeleteModal = (id) => {
    setIdToBeDeleted(id);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const diaryData = {
      title: formData.get('title'),
      content: formData.get('content'),
      creationDate: submitDate()
    };

    if (!isInputValid(diaryData) || isTitleLong(diaryData) || isContentLong(diaryData)) {
      setIsIncomplete(true);
      setNewDiary(diaryData);
      toggleModal();
    } else {
      setIsIncomplete(false);
      const headers = { 'Content-Type': 'application/json' };
      const id = formData.get('id');
      const method = id ? 'PUT' : 'POST';
      const url = `http://localhost:${process.env.PORT || 4000}/${id ? `put/${id}` : 'post'}`;

      try {
        await fetch(url, {
          method,
          headers,
          body: JSON.stringify(diaryData)
        });
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container-sm">
      <div className={style.heading}>My Diary Book</div>{`Total diaries: ${diaryCount}`}
      <div><Button variant="primary" onClick={onAddClick}>Add a new diary</Button></div>
      {data.map((diary, index) => (
        <div key={index}>
          {diary.showFormModal ? (
            <Form
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              diary={diary}
            />
          ) : (
            <Diary
              diary={diary}
              showSubmissionModal={showSubmissionModal}
              handleEdit={() => handleEdit(diary.id)}
              toggleDeleteModal={() => toggleDeleteModal(diary.id)}
            />
          )}
        </div>
      ))}
      {showSubmissionModal && (
        <SubmissionModal
          toggleModal={toggleModal}
          handleDelete={() => handleDelete(idToBeDeleted)}
          id={idToBeDeleted}
          isIncomplete={isIncomplete}
          newDiary={newDiary}
        />
      )}
    </div>
  );
};

export default App;
