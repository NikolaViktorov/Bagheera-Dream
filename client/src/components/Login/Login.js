import * as usersService from '../../services/usersService';

import { Component } from 'react'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    async onLogin(e) {
        e.preventDefault();
        const { email, password } = e.target;

        if(!this.validateEmail(email.value)) {
            this.displayError('Invalid email!');
        } else {
            const user = {
                email: email.value,
                password: password.value,
            };
            const userData = await usersService.loginUser(user);
            if (userData.error !== undefined) {
                this.displayError(userData.error);
            } else {
                localStorage.setItem('BagheeraCatUserId', userData.UserId);
                localStorage.setItem('BagheeraCatUserName', userData.Username);
                this.props.history.push('/');
                window.location.reload();
            }
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
                    <form onSubmit={this.onLogin.bind(this)}>
                        <h4>Log in your account.</h4>
                        <hr />
                        <span className="error">{this.state.error}</span>
                        <div className="form-group">
                            <label name="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label name="password">Password</label>
                            <input type="password" name="password" id="password" />
                        </div>

                        <input className="button submit" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;