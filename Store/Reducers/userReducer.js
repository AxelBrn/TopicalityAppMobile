// Store/Reducers/userReducer.js

const initialState = { user: undefined, articlesALire: [] }

function toggleUser(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CONNECT_USER':
            nextState = {
                ...state,
                user: action.value
            }
            return nextState || state

        case 'TOGGLE_PLUS_TARD':
            const articlesALireIndex = state.articlesALire.findIndex(item => item.id === action.value.id)
            if (articlesALireIndex !== -1) {
                nextState = {
                    ...state,
                    articlesALire: state.articlesALire.filter( (item, index) => index !== articlesALireIndex)
                }
            }
            else {
                nextState = {
                    ...state,
                    articlesALire: [...state.articlesALire, action.value]
                }
            }
            return nextState || state
        case 'DISCONNECT_USER':
            const index = state.user
            if (index !== undefined) {
                nextState = {
                    ...state,
                    user: undefined
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleUser
