import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        ),
        updating: true
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id),
        updating: false
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
        updating: false
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true
      };
    case userConstants.UPDATE_SUCCESS:
      // swap new user with old from state
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.user.id
            ? action.user
            : user
        ),
        updating: false
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false
      };
    default:
      return state
  }
}