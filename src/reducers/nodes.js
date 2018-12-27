function nodes(state = {}, action) {
    switch (action.type) {
        case 'ADD_NODE':
            return {
                ...state,
                [action.id]: action.node
            };
        case 'REMOVE_NODE': {
            let newState = JSON.parse(JSON.stringify(state)); // Clones state
            delete newState[action.id];
            return newState;
        }
        default:
    }

    return state;
}

export default nodes;
