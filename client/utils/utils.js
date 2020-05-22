export const truncateText = text => {
  if(text.length > 200) {
    let copy = text;
    copy = copy.slice(0, 200);
    return copy + ' ...';
  }
  return text;
}

export const isTextShort = text => {
  return text.length < 150;
}

export const isInputValid = body => { 
  body = JSON.parse(body);
  if(body.content === '') return false;
  return true;
}

export const isTitleLong = body => {
  return body.title.length > 45;
}

export const isContentLong = body => {
  return body.content.length > 8000;
}

export const getModalBodyMessage = (isIncomplete, isTitleLong, isContentLong, body) => {
  if(body.length) {
    body = JSON.parse(body);
    console.log(body)
  } else {
    return 'Are you sure you want to delete this content?';
  } 
 if(isIncomplete) {
   if(!isTitleLong(body) && !isContentLong(body)) {
     return 'Content field is empty!';
   } else if(isTitleLong(body) && !isContentLong(body)) {
    return 'Title is too long!';
   } else {
     return 'Content is too long!';
   }
 } 
} 

export const trimDate = date => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  date = date.split('-');
  date[2] = date[2].slice(0,2);
  let day = date[2], month = months[parseInt(date[1])-1], year = date[0];
  return `${month} ${day}, ${year}`;
  
}

export const getDate = () => {
  let today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return trimDate(date);
}

export const submitDate = () => {
  let d = new Date(),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();
  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  return [year, month, day].join('-');
};

export const formatDate = date => date.slice(0,10);


