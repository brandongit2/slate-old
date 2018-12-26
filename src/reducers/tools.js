function tools(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_TOOL':
            return {
                ...state,
                current: action.tool
            };
        case 'CHANGE_TOOL_SETTING':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.tool]: {
                        ...state[action.tool],
                        [action.prop]: action.value
                    }
                }
            };
        default:
    }

    return state;
}

export default tools;
