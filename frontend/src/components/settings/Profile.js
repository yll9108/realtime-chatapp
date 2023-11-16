function Profile({ userProfile }) {
    if (!userProfile) return <div>No profile data available.</div>;

    return (
        <div>
            <h2>Profile</h2>
            <div>
                <label>Name:</label> {userProfile.name}
            </div>
            <div>
                <label>About:</label> {userProfile.about || 'No about information'}
            </div>
            <div>
                <label>Email:</label> {userProfile.email}
            </div>
        </div>
    );
}


export default Profile;
