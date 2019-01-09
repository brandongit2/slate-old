// DIALOG

export const showDialog = (title, content) => ({
    type: 'SHOW_DIALOG',
    title, content
});

export const hideDialog = () => ({
    type: 'HIDE_DIALOG'
});

// NODES

export const addGroup = (parentGroup, id, displayName, groupType) => ({
    type: 'ADD_GROUP',
    parentGroup, id, displayName, groupType
});

export const addNode = (parentGroup, id, displayName, svgObject) => ({
    type: 'ADD_NODE',
    parentGroup, id, displayName, svgObject
});

export const removeGroup = id => ({
    type: 'REMOVE_GROUP',
    id
});

export const removeNode = id => ({
    type: 'REMOVE_NODE',
    id
});

export const renameGroup = (groupId, newName) => ({
    type: 'RENAME_GROUP',
    groupId, newName
});

export const renameNode = (nodeId, newName) => ({
    type: 'RENAME_NODE',
    nodeId, newName
});

export const moveNode = (nodeId, parent, index) => ({
    type: 'MOVE_NODE',
    nodeId, parent, index
});

export const switchNode = id => ({
    type: 'SWITCH_NODE',
    id
});

// TOOLS

export const changeTool = tool => ({
    type: 'CHANGE_TOOL',
    tool
});

export const changeToolSetting = (tool, prop, value) => ({
    type: 'CHANGE_TOOL_SETTING',
    tool, prop, value
});

// MISCELLANEOUS

export const windowResize = (width, height) => ({
    type: 'WINDOW_RESIZE',
    width, height
});
