export const truncateText = text => {
  if(text.length > 20) {
    let copy = text;
    copy = copy.slice(0, 20) + '...'
    return copy
  }
  return text
}

export const isInputValid = (title, content) => {
  if(title === '' || content === '') return false
    return true
}

export const createDate = () => {
  let newDate = new Date(),
  date = newDate.getDate(),
  month = newDate.getMonth() + 1,
  year = newDate.getFullYear();
  return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
}