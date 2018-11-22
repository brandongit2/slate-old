function touches(state = {}, action) {
    switch (action.type) {
        case 'NEW_TOUCH':
            return {
                ...state,
                [action.id]: [action.x, action.y]
            };
        default:
    }

    return state;
}

export default touches;
