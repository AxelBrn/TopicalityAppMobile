// Store/Reducers/userReducer.js

const initialState = { user: undefined }

function toggleUser(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_USER':
            const index = state.user
            if (index !== undefined) {
                nextState = {
                    ...state,
                    user: undefined
                }
            }
            else {
                nextState = {
                    ...state,
                    user: action.value
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleUser
