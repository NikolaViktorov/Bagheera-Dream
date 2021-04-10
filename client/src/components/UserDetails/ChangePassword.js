import { Component } from 'react'

import * as usersService from '../../services/usersService';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    componentDidMount() {
        const curUserId = localStorage.getItem('BagheeraCatUserId');
        if (!curUserId) {
            this.props.history.push('/user/login');
        }
    }

    async onChangePassword(e) {
        e.preventDefault();
        const { curPass, newPass, confirmNewPass } = e.target;

        const curUserId = localStorage.getItem('BagheeraCatUserId');
        if (!curUserId) {
            this.props.history.push('/user/login');
        }
        const res = await usersService.checkPassword(curUserId, curPass.value);
        console.log(res);
        if (res === false) {
            this.displayError('You entered your current password wrong!');
        } else if (newPass.value.length < 6) {
            this.displayError('The new password should be at least 6 characters long!');
        } else if (newPass.value !== confirmNewPass.value) {
            this.displayError('The new password should match the confrim new password!');
        } else {
            await usersService.changePassword(curUserId, newPass.value);
            usersService.logoutUser();
            this.props.history.push('/user/login');
        }
    }

    displayError(errorMessage) {
        this.setState({
            error: errorMessage
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={this.onChangePassword.bind(this)}>
                        <h4>Change your password.</h4>
                        <hr />
                        <span className="error">{this.state.error}</span>
                        <div className="form-group">
                            <label name="curPass">Current password</label>
                            <input type="password" name="curPass" id="curPass" />
                        </div>
                        <div className="form-group">
                            <label name="newPass">New password</label>
                            <input type="password" name="newPass" id="newPass" />
                        </div>
                        <div className="form-group">
                            <label name="confirmNewPass">Confirm new password</label>
                            <input type="password" name="confirmNewPass" id="confirmNewPass" />
                        </div>

                        <input className="button submit" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default ChangePassword;