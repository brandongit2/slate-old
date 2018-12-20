export const changeProperty = (tool, prop, value) => ({
    type: 'CHANGE_PROPERTY',
    tool,
    prop,
    value
});

export const changeTool = tool => ({
    type: 'CHANGE_TOOL',
    tool
});

export const newTouch = (id, x, y) => ({
    type: 'NEW_TOUCH',
    id,
    x,
    y
});

export const windowResize = (width, height) => ({
    type: 'WINDOW_RESIZE',
    width,
    height
});
