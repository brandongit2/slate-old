export function wndw(state = {}, action) {
    if (action.type === 'WINDOW_RESIZE') {
        return {
            width:  action.width,
            height: action.height
        };
    } else {
        return state;
    }
}
