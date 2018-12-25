export function nodes(state = {}, action) {
    switch (action.type) {
        case 'ADD_NODE':
            return {
                ...state,
                [action.id]: action.node
            };
        case 'REMOVE_NODE': {
            let newState = state;
            delete newState[action.id];
            return newState;
        }
        default:
    }

    return state;
}

export function selections(state = [], action) {
    switch (action.type) {
        case 'ADD_SELECTION':
            return state.concat(action.id);
        case 'REMOVE_SELECTION':
            return state.filter(item => item !== action.id);
        case 'DESELECT_ALL':
            return [];
        default:
    }

    return state;
}
