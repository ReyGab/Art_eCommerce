import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';

import auth from '../../../auth';


import Login from '../components/login';

const styles = {
    formContainer: {
        maxWidth: '330px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        padding: '20px',
        marginTop: '30px'
    },
    buttonContainer: {
        marginTop: '50px'
    }
}


class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                password: ''
            }
        }
    }

    componentDidUpdate(prevProps) {
        auth.login(() => {
            prevProps.history.push("/admin-list");
          });
    }

    onSave(values) {
        const { actions: { loginAdmin } } = this.props;
        loginAdmin({
            ...values
        })

    }

    render() {
        return (
            <Login initialValues={this.state.initialValues} handleSubmit={this.onSave.bind(this)} />

        );
    }
}

function mapStateToProps(state) {
    return state.loginReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
