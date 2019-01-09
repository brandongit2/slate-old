export function currentTool(state = {}, action) {
    if (action.type === 'CHANGE_TOOL') {
        return action.tool;
    } else {
        return state;
    }
}

export function toolSettings(state = {}, action) {
    if (action.type === 'CHANGE_TOOL_SETTING') {
        return {
            ...state,
            [action.tool]: {
                ...state[action.tool],
                [action.prop]: action.value
            }
        };
    } else {
        return state;
    }
}
