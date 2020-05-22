import * as actions from '../constants/actionTypes';

const initialState = {
  data: [],
  idToBeDeleted: null,
  showSubmissionModal: false,
  diaryCount: 0,
  isIncomplete: false,
  newDiary: {},
  loading: false,
  error: null
}

const rootReducer = (state=initialState, action) => {
  switch(action.type) {
    case actions.FETCH_DATA_PENDING:
    return {
      ...state,
      loading: true
    }
    case actions.FETCH_DATA_ERROR:
    return {
      ...state,
      error: true
    }
    case actions.FETCH_DATA_SUCCESS:
    let count = 0;
      let data = action.payload.data.forEach(item => {
        count++
        item.showFormModal = false
      });
    return {
      ...state,
      data,
      diaryCount: count
    }
    case actions.TOGGLE_DELETE_MODAL:
      return {
        ...state, 
        showSubmissionModal: !showSubmissionModal, 
        idToBeDeleted: action.payload.id
      }

      case actions.ADD_ITEM :
      state.data.unshift({
      showFormModal: true,
      title: '',
      content: '',
      creationDate: ''
    })
      return {
        ...state, 
        data
      }

      case actions.EDIT_ITEM:
      let newData = state.data.map(item => {
          if (item.id === action.payload.id) {
            item.showFormModal = true;
          }
          return item;
      })
      return {
        ...state,
        data: newData
      }
    default:
  return state;
  }
}

export default rootReducer;