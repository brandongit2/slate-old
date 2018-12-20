function wndw(state = {}, action) {
    switch (action.type) {
        case 'WINDOW_RESIZE':
            return {
                ...state,
                width:  action.width,
                height: action.height
            };
        default:
    }

    return state;
}

export default wndw;
