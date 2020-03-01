// Store/Reducers/userReducer.js

const initialState = { user: undefined, articlesALire: [] }

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
        case 'TOGGLE_PLUS_TARD':
            const articlesALireIndex = state.articlesALire.findIndex(item => item.id === action.value.id)
            if (articlesALireIndex !== -1) {
                nextState = {
                    ...state,
                    articlesALire: state.articlesALire.filter( (item, index) => index !== articlesALireIndex)
                }
            }
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    articlesALire: [...state.articlesALire, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleUser
