function currentTool(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_TOOL':
            return action.tool;
        default:
    }

    return state;
}

export default currentTool;
