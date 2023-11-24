import React from "react";

function PopUp(props) {
    return props.trigger ? (
        <div className="card">
            <div className="card-header">Change Password</div>
            <div className="card-body">
                <h5 className="card-title">This part will show user email</h5>
                <input placeholder="newPassword" />
                {/* <input>change your password</input> */}
                <button
                    className="btn btn-primary"
                    onClick={() => props.setTrigger(false)}
                >
                    cancel
                </button>
            </div>
        </div>
    ) : (
        ""
    );
}

export default PopUp;
