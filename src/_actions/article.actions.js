import { articleConstants } from '../_constants';
import { articleService } from '../_services';
import { alertActions } from './';

export const articleActions = {
    register,
    update,
    getAll,
    delete: _delete
};

function register(newArticle) {
    return dispatch => {
        dispatch(request());

        articleService.register(newArticle)
            .then(
                message => { 
                    dispatch(success(newArticle));
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(newArticle) { return { type: articleConstants.REGISTER_REQUEST, newArticle } }
    function success(newArticle) { return { type: articleConstants.REGISTER_SUCCESS, newArticle } }
    function failure(error) { return { type: articleConstants.REGISTER_FAILURE, error } }
}
function update(newArticle) {
    return dispatch => {
        dispatch(request());

        articleService.update(newArticle)
            .then(
                message => { 
                    dispatch(success(newArticle));
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(newArticle) { return { type: articleConstants.UPDATE_REQUEST, newArticle } }
    function success(newArticle) { return { type: articleConstants.UPDATE_SUCCESS, newArticle } }
    function failure(newArticle, error) { return { type: articleConstants.UPDATE_FAILURE, newArticle, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        articleService.getAll()
            .then(
                articles => dispatch(success(articles)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: articleConstants.GETALL_REQUEST } }
    function success(articles) { return { type: articleConstants.GETALL_SUCCESS, articles } }
    function failure(error) { return { type: articleConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        articleService.delete(id)
            .then(
                article => { 
                    dispatch(success(id)),
                    dispatch(alertActions.success('Delete successful'));
                },
                error => {
                    dispatch(failure(id, error.toString()))
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: articleConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: articleConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: articleConstants.DELETE_FAILURE, id, error } }
}