import React, { Component } from 'react'

class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: "",
        "open" : false
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
    clickSubmit = event => {
        event.preventDefault()
        const { name, email, password, error } = this.state
        let user = {
            name,
            email,
            password,
            error
        }
        console.log(user)
        this.signup(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error })
            }
            else {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    "open" : true
                })
            }
        })
    }
    signup = user => {
        return fetch("http://localhost:8080/signup", {
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
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className = "alert alert-danger" style = {{display : this.state.error ? "" : "none"}}>
                {this.state.error}
                </div>
                <div className = "alert alert-info" style = {{display :this.state.open ?"" : "none" }}>
                New Account Successfully Created!!Please Sign in.
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name}></input>
                    </div>
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
export default Signup
