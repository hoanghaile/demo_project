export const userReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'USER_GET_ALL':
            return {
                ...state,
                user: payload,
                userLoading: false,
            }
        default:
            return state
    }
}