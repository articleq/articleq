import { articleConstants } from '../_constants';

export function articles(state = {}, action) {
  switch (action.type) {
    case articleConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case articleConstants.GETALL_SUCCESS:
      return {
        items: action.articles
      };
    case articleConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case articleConstants.REGISTER_REQUEST:
      return {
        ...state,
        updating: true
      };
    case articleConstants.REGISTER_SUCCESS:
      if (state.items) {
        return {
          ...state,
          items: [...state.items, action.newArticle],
          updating: false
        };
        //Add article when there is no items
      } else {
        return {
          ...state,
          items: [action.newArticle],
          updating: false
        };
      }
    case articleConstants.REGISTER_FAILURE:
      return {
        ...state,
        updating: false
      };
    case articleConstants.DELETE_REQUEST:
      // add 'deleting:true' property to article being deleted
      return {
        ...state,
        items: state.items.map(article =>
          article.id === action.id
            ? { ...article, deleting: true }
            : article
        ),
        updating: true
      };
    case articleConstants.DELETE_SUCCESS:
      // remove deleted article from state
      return {
        items: state.items.filter(article => article.id !== action.id),
        updating: false
      };
    case articleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to article 
      return {
        ...state,
        items: state.items.map(article => {
          if (article.id === action.id) {
            // make copy of article without 'deleting:true' property
            const { deleting, ...articleCopy } = article;
            // return copy of article with 'deleteError:[error]' property
            return { ...articleCopy, deleteError: action.error };
          }

          return article;
        }),
        updating: false
      };
    case articleConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true
      };
    case articleConstants.UPDATE_SUCCESS:
      // swap new article with old from state
      return {
        ...state,
        items: state.items.map(article =>
          article.id === action.newArticle.id
            ? action.newArticle
            : article
        ),
        updating: false
      };
    case articleConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false
      };
    default:
      return state
  }
}