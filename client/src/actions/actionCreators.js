import * as actions from '../constants/actionTypes'

export const toggleDeleteModal = data => ({
  type: actions.TOGGLE_DELETE_MODAL,
  payload: data
})

export const fetchDataPending = () => ({
  type: actions.FETCH_DATA_PENDING
})

export const fetchDataSuccess = data => ({
  type: actions.FETCH_DATA_SUCCESS,
  payload: data
})

export const fetchDataError = error => ({
  type: actions.FETCH_DATA_ERROR,
  payload: error
})

export const fetchData = () => async dispatch => {
  let url = `http://localhost:${process.env.PORT || 4000}/diaries`;
  dispatch(fetchDataPending);
  try { 
    const response = await fetch(url);
    const json = response.json();
    dispatch(fetchDataSuccess(json));
    return json;    
  } catch(error){
    dispatch(fetchDataError(error))
  }
}

export const addNewItem = data => ({
  type: actions.ADD_ITEM,
  payload: data
})

export const handleEdit = (id) => ({
  type: actions.EDIT_ITEM,
  payload: id
})

export const deleteItem = (itemId) => dispatch => {
  let url = `http://localhost:${process.env.PORT || 4000}/diaries/${itemId}`;
  fetch(url, {
      method: 'delete',
      headers: {
        'content-type': 'application/json'
      }
    })
  .then(response => {
    dispatch(fetchData)
    dispatch(toggleDeleteModal(response))
    return response
  });
}
