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
        const userId = this.props.match.params.userId;
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
            method : "GET",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization :   `Bearer ${isAuthenticated().token}`
            }
        }).then(response =>{
           return response.json()
        })
        .then(data =>{
            console.log("data",data)
            if(data.error)
            {
                console.log("ERROR")
            }
            else{
                this.setState({
                    user : data
                })
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email : {isAuthenticated().user.email}</p>
                <p>{`Joined : ${new Date(this.state.user.created).toDateString()}`}</p>
            </div>
        )
    }
}

export default Profile
