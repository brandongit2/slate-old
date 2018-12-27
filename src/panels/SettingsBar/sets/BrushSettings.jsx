import PropTypes from 'prop-types';
import React from 'react';

export const BrushSettings = ({currentSettings, updateSettings}) => (
    <table>
        <tbody>
            <tr>
                <td className="label">
                    <label htmlFor="brushSize">brush size:</label>
                </td>
                <td>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        name="brushSize"
                        defaultValue={currentSettings.brush.size}
                        onChange={e => {
                            updateSettings('brush', 'size', e.target.value);
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td className="label">
                    <label htmlFor="colourSelected">color:</label>
                </td>
                <td>
                    <input
                        type="color"
                        name="colourSelected"
                        defaultValue={currentSettings.brush.color}
                        onChange={e => {
                            updateSettings('brush', 'color', e.target.value);
                        }}
                    />
                </td>
            </tr>
        </tbody>
    </table>
);

BrushSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
