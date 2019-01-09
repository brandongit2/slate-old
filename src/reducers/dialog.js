export function isDialogVisible(state = {}, action) {
    switch (action.type) {
        case 'SHOW_DIALOG':
            return true;
        case 'HIDE_DIALOG':
            return false;
        default:
            return state;
    }
}

export function dialog(state = {}, action) {
    switch (action.type) {
        case 'SHOW_DIALOG':
            return {
                title:   action.title,
                content: action.content
            };
        case 'HIDE_DIALOG':
            return {
                title:   '',
                content: ''
            };
        default:
            return state;
    }
}
