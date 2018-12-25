export const addNode = (id, node) => ({
    type: 'ADD_NODE',
    id, node
});

export const addSelection = id => ({
    type: 'ADD_SELECTION',
    id
});

export const changeToolSetting = (tool, prop, value) => ({
    type: 'CHANGE_TOOL_SETTING',
    tool, prop, value
});

export const changeTool = tool => ({
    type: 'CHANGE_TOOL',
    tool
});

export const newTouch = (id, x, y) => ({
    type: 'NEW_TOUCH',
    id, x, y
});

export const removeNode = id => ({
    type: 'REMOVE_NODE',
    id
});

export const removeSelection = id => ({
    type: 'REMOVE_SELECTION',
    id
});

export const windowResize = (width, height) => ({
    type: 'WINDOW_RESIZE',
    width, height
});
