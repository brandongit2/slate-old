// DIALOG

export const showDialog = (title, content) => ({
    type: 'SHOW_DIALOG',
    title, content
});

export const hideDialog = () => ({
    type: 'HIDE_DIALOG'
});

// NODES

export const addGroup = (parentGroup, id, displayName, groupType, expanded) => ({
    type: 'ADD_GROUP',
    parentGroup, id, displayName, groupType, expanded
});

export const addNode = (parentGroup, id, displayName, svgObject) => ({
    type: 'ADD_NODE',
    parentGroup, id, displayName, svgObject
});

export const removeThing = id => ({
    type: 'REMOVE_THING',
    id
});

export const renameGroup = (groupId, newName) => ({
    type: 'RENAME_GROUP',
    groupId, newName
});

export const renameThing = (id, newName) => ({
    type: 'RENAME_NODE',
    id, newName
});

export const moveThing = (id, parent, index) => ({
    type: 'MOVE_THING',
    id, parent, index
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
