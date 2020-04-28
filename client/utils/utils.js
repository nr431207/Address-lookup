export const truncateText = text => {
  if(text.length > 20) {
    let copy = text;
    copy = copy.slice(0, 20) + '...'
    return copy
  }
  return text
}

export const isInputValid = (title, content, date) => {
  if(title === '' || content === '' || date === '') return false
    return true
}