import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class Signin extends Component {
    state = {
        email: "",
        password: "",
        error: "",
        redirectToReferer: false,
        loading: false
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
        this.setState({
            error: ""
        })
    }
    authenticate = (jwt, next) => {
        if (typeof (window) != "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }
    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading : true})
        const { email, password, error } = this.state
        let user = {
            email,
            password,
            error
        }
        console.log(user)
        this.signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false })
            }
            else {
                this.authenticate(data, () => {
                    console.log(data)
                    this.setState({
                        redirectToReferer: true
                    })
                })
            }
        })
    }
    signin = user => {
        return fetch("`${process.env.REACT_APP_API_URL}`localhost:8080/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(error => {
            console.log(error)
        })

    }
    render() {

        if (this.state.redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>
                <div className="alert alert-danger" style={{ display: this.state.error ? "" : "none" }}>
                    {this.state.error}
                </div>
                {this.state.loading ? (
                    <div className = "jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )
                }
                <div className="alert alert-info" style={{ display: this.state.open ? "" : "none" }}>
                    Sign in Successsful.
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit </button>
                </form>
            </div>
        )
    }
}
export default Signin
