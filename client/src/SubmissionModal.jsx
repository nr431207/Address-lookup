import React, { useState } from 'react';
import { isTitleLong, isContentLong, getModalBodyMessage } from '../utils/utils';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import './style.css';
import * as style from './style.css';

const SubmissionModal = ({ handleDelete, id, isIncomplete, toggleModal, newDiary }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{isIncomplete ? 'Form Incomplete' : 'Confirm Delete'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, newDiary)}</Modal.Body>
      <Modal.Footer>
        {isIncomplete ?
          <Button variant="primary" onClick={toggleModal}>
            Ok
            </Button> :
          <div>
            <Button variant="primary" className={style.margin} onClick={toggleModal}>
              Close
              </Button>
            <Button variant="primary" className={style.margin} value={parseInt(id)} onClick={handleDelete}>Confirm</Button>
          </div>
        }

      </Modal.Footer>
    </Modal>
  );
}

export default SubmissionModal;