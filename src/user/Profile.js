import React, { Component } from 'react'

export const isAuthenticated = () => {
    if (typeof (window) == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}

class Profile extends Component {
    state = {
        user: "",
        "redirectToSignin": false
    }

    componentDidMount() {
        console.log("user id from route params", this.props.match.params.userId)
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email : {isAuthenticated().user.email}</p>
            </div>
        )
    }
}

export default Profile
