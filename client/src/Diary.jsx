import React, { useState } from 'react';
import { truncateText, createDate } from '../utils/utils';
import * as style from './style.css';
import cx from 'classnames';

const Diary = (props) => {
  console.log(props.diary)

  const [isDiaryOpen, toggleDiary] = useState(false);
  const [isEditMode, toggleEdit] = useState(false);

  const { title, content, id, creationDate } = props.diary;
  const { handleEditSubmit, handleDelete } = props;


  return (
    <div onClick={() => { toggleDiary(!isDiaryOpen) }} className={cx(style.container, style.grow)}>
      <div className={style.box}>
        <div>
          <div>
            {isEditMode ? <input type='text' onChange={} value={title}></input> : <h3>{title}</h3>}
            <div>{creationDate}</div>
          </div>
          {isEditMode ? <textarea type='text' onChange={} value={content}></textarea> : <div>{isDiaryOpen ? content : truncateText(content)}</div>}
        </div>
        <span> <button onClick={handleDelete} value={id} className={style.margin}>Delete</button>
          {isEditMode ? <button onClick={(e) => { handleEditSubmit(e); toggleEdit(!isEditMode) }} value={id}>Submit Change</button> : <button onClick={() => { toggleEdit(!isEditMode) }}>Edit</button>}
        </span>
      </div>
    </div>

  )
}
export default Diary;