import React from 'react';
import Button from 'react-bootstrap/Button';
import * as style from './style.css';

const Form = ({ handleSubmit, handleCancel, diary }) => {
  const { id, title, content } = diary
  return (
    <div class="container">
      <div class="card-body">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={diary.id} />
          <div class="input-group input-group-sm mb-3">
            <input type="text" name="title" placeholder="Title" defaultValue={title} />
          </div>
          <div class="input-group input-group-sm mb-3">
            <textarea name="content" class="form-control" placeholder="Content" defaultValue={content}></textarea>
          </div>
          <span>
            <Button variant="primary" className={style.margin} type="button" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" className={style.margin} type="submit">Save</Button>
          </span>
        </form>
      </div>
    </div>
  )

}

export default Form;
