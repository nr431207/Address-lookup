import {
  truncateText,
  isTextShort,
  isInputValid,
  isTitleLong,
  isContentLong,
  getModalBodyMessage
} from '../client/utils/utils';
import {
  example,
   text
  } from './example';

describe('truncateText', () => {
  it('should truncate text input', () => {
    expect(truncateText(text)).toEqual('Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over2000 years old. Richard McClintock, a Latin professor  ...')
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
    let body = JSON.stringify({title:"gg",content:"ooo",creationDate:"2020-04-30"})
    expect(isInputValid(body)).toEqual(true);
  });

  it('should return false if content is empty',() => {
    let body = JSON.stringify({title:"gg",content:"",creationDate:"2020-04-30"})
    expect(isInputValid(body)).toEqual(false)
  });

});

describe('isTitleLong', () => {
  it('should return true if title is larger than 45 charachters',() => {
    let body = {title: text}
    expect(isTitleLong(body)).toEqual(true)
  });

  it('should return false if title is not larger than 45 charachters',() => {
    let body = {title: 'hi'}
    expect(isTitleLong(body)).toEqual(false)
  });
});

describe('isContentLong', () => {
  it('should return true if content is larger than 8000 charachters',() => {
    let body = {content: example}
    expect(isContentLong(body)).toEqual(true)
  });

  it('should return false if content is not larger than 8000 charachters',() => {
    let body = {content: 'hi'}
    expect(isContentLong(body)).toEqual(false)
  });

});

describe('getModalBodyMessage', () => {
  it('should return Are you sure you want to delete this content? if body length is 0',() => {
    let isIncomplete = false, isTitleLong= isTitleLong, isContentLong=isContentLong, emptyBody = {}
    expect(getModalBodyMessage(isIncomplete, isTitleLong, isContentLong, emptyBody)).toEqual('Are you sure you want to delete this content?')
  });
  it('should return Content field is empty! if isIncomplete is true and content is empty',() => {
    let isIncomplete = true, isTLong= isTitleLong, isCLong=isContentLong, body1 = JSON.stringify({title:"i",content:"",creationDate:"2020-04-30"})
    expect(getModalBodyMessage(isIncomplete, isTLong, isCLong, body1)).toEqual('Content field is empty!')
  });
  it('should return Title is too long! if title is long',() => {
    let isIncomplete = true, isT2long= isTitleLong, isCCLong=isContentLong,body2 = JSON.stringify({
      title:`${text}`,
      content:"i am here",
      creationDate:"2020-02-02"
    });
    expect(getModalBodyMessage(isIncomplete, isT2long, isCCLong, body2)).toEqual('Title is too long!')
  });
  it('should return Content is too long! if content is too long',() => {
    let isIncomplete = true, isTitleLong2= isTitleLong, isContentLong2=isContentLong, body3 = JSON.stringify({
      title:"hi",
      content:`${example}`,
      creationDate:"2020-02-02"
    });
    expect(getModalBodyMessage(isIncomplete, isTitleLong2, isContentLong2, body3)).toEqual('Content is too long!')
  });
});
