import {
  truncateText,
  isTextShort,
  isInputValid,
  isTitleLong,
  isContentLong,
  getModalBodyMessage,
  trimDate,
  submitDate,
} from '../client/utils/utils';
import {
  example,
   text
  } from './example';

describe('truncateText', () => {
  it('should truncate text input', () => {
    expect(truncateText(text)).toEqual('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo ...')
  })
});
describe('isTextShort', () => {
  let str = 'hello';
  it('should return true is length of text is less than 150', () => {
    expect(isTextShort(str)).toBe(true)
  });

  it('should return false if text is longer than 150', () => {
    expect(isTextShort(text)).toBe(false)
  })
});

describe('isInputValid', () => {
  it('should return true if content is not empty',() => {
    let body = {"content": "hi"}
    expect(isInputValid(body)).toEqual(true)
  });

  it('should return false if content is empty',() => {
    let body = {"content": ""}
    expect(isInputValid(body)).toEqual(false)
  });

});

describe('isTitleLong', () => {
  it('should return true if title is larger than 45 charachters',() => {
    expect(isTitleLong(title)).toEqual(true)
  });

  it('should return false if title is not larger than 45 charachters',() => {
    expect(isTitleLong('hi')).toEqual(false)
  });
});

describe('isContentLong', () => {
  it('should return true if content is larger than 8000 charachters',() => {
    expect(isContentLong(example)).toEqual(true)
  });

  it('should return false if content is not larger than 8000 charachters',() => {
    expect(isContentLong('jhi')).toEqual(true)
  });

});

describe('getModalBodyMessage', () => {
  it('should return Are you sure you want to delete this content? if body length is 0',() => {
    let isIncomplete = true, isTitleLong= false, isContentLong=false, emptyBody = {}
    expect(getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, emptyBody)).toEqual('Are you sure you want to delete this content?')
  });
  it('should return Content field is empty! if isIncomplete is true and content is empty',() => {
    let body = {
      "title":"hello all",
      "content":"",
      "creationDate":"2020-02-02"
    }
    let isIncomplete = true, isTitleLong= isTitleLong, isContentLong=isContentLong;
    expect(getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, body)).toEqual('Content field is empty!')
  });
  it('should return Title is too long! if title is long',() => {
    let body = {
      "title":`${text}`,
      "content":"i am here",
      "creationDate":"2020-02-02"
    }
    let isIncomplete = true, isTitleLong= isTitleLong, isContentLong=isContentLong;
    expect(getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, body)).toEqual('Title is too long!')
  });
  it('should return Content is too long! if content is too long',() => {
    let body = {
      "title":"hi",
      "content":`${example}`,
      "creationDate":"2020-02-02"
    }
    let isIncomplete = true, isTitleLong= isTitleLong, isContentLong=isContentLong;
    expect(getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, body)).toEqual('Content is too long!')
  });
});
