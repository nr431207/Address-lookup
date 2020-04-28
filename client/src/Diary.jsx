import React, { useState } from 'react';
import { truncateText, createDate } from '../utils/utils';
import * as style from './style.css';
import cx from 'classnames';

const Diary = (props) => {
  const [isDiaryOpen, toggleDiary] = useState(false);
  const { title, content, id, creationDate } = props.diary;

  return (
    <div onClick={() => { toggleDiary(!isDiaryOpen) }} className={cx(style.container, style.grow)}>
      <div className={style.box}>
        <div>
          <div>
            <h3>{title}</h3>
            <div>{creationDate}</div>
          </div>
          <div>{isDiaryOpen ? content : truncateText(content)}</div>
        </div>
        <span> <button onClick={props.handleDelete} value={id} className={style.margin}>Delete</button>
        </span>
      </div>
    </div>

  )
}
export default Diary;