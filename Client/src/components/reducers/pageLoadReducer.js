const initialValues = {
    data: {},
    loading: false
}
export const pageLoadReducer = (state = initialValues, action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            return {
                ...state,
                data: { ...action.data }
            };
        case 'LOAD_SLOW':
            return {
                ...state, loading: true
            }
        case 'LOAD_STOP':
            return {
                ...state, loading: false
            }
        default:
            return state;
    }
};