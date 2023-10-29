import React from 'react';

function Settings() {
    return (
        <div>
            <h2>Settings</h2>
            <div>
                <h3>Privacy</h3>
                <div>
                    <label>Profile:</label>
                    <input type="checkbox" />
                </div>
                <div>
                    <label>Status:</label>
                    <input type="checkbox" />
                </div>
                <div>
                    <label>About:</label>
                    <input type="checkbox" />
                </div>
            </div>
        </div>
    );
}


export default Settings;
