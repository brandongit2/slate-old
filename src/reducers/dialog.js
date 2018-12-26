function dialog(state = {}, action) {
    switch (action.type) {
        case 'SHOW_DIALOG':
            return {
                visible: true,
                title:   action.title,
                content: action.content
            };
        case 'HIDE_DIALOG':
            console.log('hiding dialog');
            return {
                ...state,
                visible: false
            };
        default:
    }

    return state;
}

export default dialog;
