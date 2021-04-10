import * as usersService from '../../services/usersService';

import { Component } from 'react'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    onRegister(e) {
        e.preventDefault();
        const { email, password, confirmPassword, username } = e.target;

        if(!this.validateEmail(email.value)) {
            this.displayError('Invalid email!');
        } else if (username.value.length <= 2 || username.value.length > 26) {
            this.displayError('Username must be between 2 and 26 characters long!');
        } else if (password.value.length < 6) {
            this.displayError('Password must be at least 6 characters long!');
        } else if (password.value !== confirmPassword.value) {
            this.displayError('Passwords do not match!');
        } else {
            const user = {
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                username: username.value,
            };
            usersService.registerUser(user)
                .then(res => {
                    if(res === 'User with this email already exists') {
                        this.displayError(res);
                    } else {
                        this.props.history.push('/user/login')
                    }
                })
        }
    }

    displayError(errorMessage) {
        this.setState({
            error: errorMessage
        })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    componentDidMount() {
        const loggedInUser = localStorage.getItem('BagheeraCatUserId');
        if (loggedInUser) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={this.onRegister.bind(this)}>
                        <h4>Create a new account.</h4>
                        <hr />
                        <span className="error">{this.state.error}</span>
                        <div className="form-group">
                            <label name="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label name="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label name="password">Password</label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div className="form-group">
                            <label name="Confrim">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" />
                        </div>

                        <input className="button submit" type="submit" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;