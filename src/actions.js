// id is used internally; name is displayed in UI
export const addLayer = (id, layerType, name, nodes, props = {}) => ({
    type: 'ADD_LAYER',
    id, layerType, name, nodes, props
});

export const addToLayer = (id, node) => ({
    type: 'ADD_TO_LAYER',
    id, node
});

export const addNode = (id, node) => ({
    type: 'ADD_NODE',
    id, node
});

export const changeToolSetting = (tool, prop, value) => ({
    type: 'CHANGE_TOOL_SETTING',
    tool, prop, value
});

export const changeTool = tool => ({
    type: 'CHANGE_TOOL',
    tool
});

export const hideDialog = () => ({
    type: 'HIDE_DIALOG'
});

export const newTouch = (id, x, y) => ({
    type: 'NEW_TOUCH',
    id, x, y
});

export const removeLayer = id => ({
    type: 'REMOVE_LAYER',
    id
});

export const removeFromLayer = (id, node) => ({
    type: 'REMOVE_FROM_LAYER',
    id, node
});

export const removeNode = id => ({
    type: 'REMOVE_NODE',
    id
});

export const renameLayer = (id, name) => ({
    type: 'RENAME_LAYER',
    id, name
});

export const showDialog = (title, content) => ({
    type: 'SHOW_DIALOG',
    title, content
});

export const switchLayer = id => ({
    type: 'SWITCH_LAYER',
    id
});

export const windowResize = (width, height) => ({
    type: 'WINDOW_RESIZE',
    width, height
});
