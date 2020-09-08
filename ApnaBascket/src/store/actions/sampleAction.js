import Constants from '../../constants';

export const hideErrorAction = () => async dispatch => {
    dispatch({
        type: ERROR,
        payload: '',
    })
}

export const hidesuccessAction = () => async dispatch => {
    dispatch({
        type: SUCCESS,
        payload: '',
    })
}