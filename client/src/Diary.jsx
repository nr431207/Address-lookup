import React, { useState } from 'react';
import { truncateText } from '../utils/utils';
import * as style from './style.css';
import cx from 'classnames';

const Diary = (props) => {
  const [isDiaryOpen, toggleDiary] = useState(false);
  const { title, content, id } = props.diary
  const { isEditMode, handleEdit, handleTitleChange, handleContentChange, handleEditSubmit, handleDelete } = props;

  return (
    <div onClick={() => { toggleDiary(!isDiaryOpen) }} className={cx(style.container, style.grow)}>
      <div className={style.box}>
        {isEditMode ?
          <div>
            <input type='text' onChange={handleTitleChange} value={title}></input>
            <textarea type='text' onChange={handleContentChange} value={content}></textarea>
          </div>
          :
          <div>
            <h3 onClick={handleEdit}>{title}</h3>
            <div onClick={handleEdit}>{isDiaryOpen ? content : truncateText(content)}</div>
          </div>
        }
        <div>
          <button onClick={handleDelete} value={id} className={style.margin}>Delete</button>
        </div>
        <div>
          {isEditMode ? <button onClick={handleEditSubmit} value={id}>Submit Change</button> : <button onClick={handleEdit}>Edit</button>}
        </div>
      </div>
    </div>

  )
}
export default Diary;