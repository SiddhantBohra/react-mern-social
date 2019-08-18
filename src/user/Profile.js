import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
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
        const userId = this.props.match.params.userId;
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(response => {
            return response.json()
        })
            .then(data => {
                console.log("data", data)
                if (data.error) {
                    console.log("ERROR")
                }
                else {
                    this.setState({
                        user: data
                    })
                    console.log("State", isAuthenticated().user)
                }
            })
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-6">
                    <h2 className="mt-5 mb-5">Profile</h2>
                    <p>Hello {isAuthenticated().user.name}</p>
                    <p>Email : {isAuthenticated().user.email}</p>
                    <p>{`Joined : ${new Date(this.state.user.created).toDateString()}`}</p>
                </div>
                <div>
                    {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
                        <div className="d-inline-block mt-5">
                            <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${this.state.user._id}`}>Edit Profile</Link>
                            <button className= "btn btn-raised btn-danger">Delete Profile</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Profile
