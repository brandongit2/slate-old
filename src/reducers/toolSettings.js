function toolSettings(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_TOOL_SETTING':
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

export default toolSettings;
