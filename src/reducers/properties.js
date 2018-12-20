function properties(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_PROPERTY':
            return {
                ...state,
                [action.tool]: {
                    ...state[action.tool],
                    [action.prop]: action.value
                }
            };
        default:
    }

    return state;
}

export default properties;
