export const loadData = data => dispatch => {
    dispatch({
        type: 'LOAD_DATA',
        data
    })
};
export const loadSlow = data => dispatch => {
    dispatch({
        type: 'LOAD_SLOW',
        data
    })
};
export const loadStop = data => dispatch => {
    dispatch({
        type: 'LOAD_STOP',
        data
    })
};