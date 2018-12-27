import PropTypes from 'prop-types';
import React from 'react';

export const TextSettings = ({currentSettings, updateSettings}) => (
    <table>
        <tbody>
            <tr>
                <td className="label">
                    <label htmlFor="fontSize">font size:</label>
                </td>
                <td>
                    <input
                        type="range"
                        min="6"
                        max="70"
                        name="fontSize"
                        defaultValue={currentSettings.text.fontSize}
                        onChange={e => {
                            updateSettings('text', 'fontSize', e.target.value);
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td className="label">
                    <label htmlFor="color">color:</label>
                </td>
                <td>
                    <input
                        type="color"
                        name="color"
                        defaultValue={currentSettings.text.color}
                        onChange={e => {
                            updateSettings('text', 'color', e.target.value);
                        }}
                    />
                </td>
            </tr>
        </tbody>
    </table>
);

TextSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
