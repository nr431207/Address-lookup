import React from 'react';
import * as style from './style.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const {
      handleContentChange,
      handleDate,
      onSubmit,
      handleTitleChange,
      onClose
    } = this.props

    return (
      <div className={style.form}>
        <div className={style.heading}>Complete your diary</div>
        <form onSubmit={onSubmit}>
          <label><span>Title <span className={style.required}>*</span></span><input type="text" className={style.input} onChange={handleTitleChange} /></label>
          <label><span>Date <span className={style.required}>*</span></span><input type="date" className={style.input} onChange={handleDate} /></label>
          <label><span>Content <span className={style.required}>*</span></span><textarea className={style.textarea} onChange={handleContentChange}></textarea></label>
          <label><span> </span><input type="submit" value="Submit" /><button onClick={onClose}>Cancel</button></label>
        </form>
      </div>)
  }
}
