import React, { useState } from 'react';
import { isTitleLong, isContentLong, getModalBodyMessage } from '../utils/utils';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import * as style from '../src/style.css';
const SubmissionModal = ({ handleDelete, diary, isIncomplete, handleShowSubmissionModal, newDiary }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{isIncomplete ? 'Form Incomplete' : 'Confirm Delete'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, JSON.parse(newDiary))}</Modal.Body>
      <Modal.Footer>
        {isIncomplete ?
          <Button variant="primary" onClick={handleShowSubmissionModal}>
            Ok
            </Button> :
          <div>
            <Button variant="primary" className={style.margin} onClick={handleShowSubmissionModal}>
              Close
              </Button>
            <Button variant="primary" className={style.margin} value={diary.id} onClick={handleDelete}>Confirm</Button>
          </div>
        }

      </Modal.Footer>
    </Modal>
  );
}

export default SubmissionModal;