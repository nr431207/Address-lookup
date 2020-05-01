export const truncateText = text => {
  if(text.length > 200) {
    let copy = text;
    copy = copy.slice(0, 200);
    return copy + ' ...'
  }
  return text
}

export const isTextShort = text => {
  return text.length < 150;
}

export const isInputValid = body => { 
  if(JSON.parse(body).content === '') return false;
  return true;
}

export const isTitleLong = body => {
  return body.title.length > 45
}

export const isContentLong = body => {
  return body.content.length > 8000
}

export const getModalBodyMessage = (isIncomplete, isTitleLong, isContentLong, body) => {
  if(body.length) {
    body = JSON.parse(body)
  } else {
    return 'Are you sure you want to delete this content?'
  } 
 if (isIncomplete) {
   if(!isTitleLong(body) && !isContentLong(body)) {
     return 'Content field is empty!'
   } else if(isTitleLong(body) && !isContentLong(body)) {
    return 'Title is too long!'
   } else {
     return 'Content is too long!'
   }
 } 
} 

export const getDate = () => {
  let today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return trimDate(date)
}
