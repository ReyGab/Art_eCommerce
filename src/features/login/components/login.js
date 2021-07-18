import React from 'react';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import { object, string } from "yup";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
    errorColor: {
        color: 'red'
    },
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
        marginTop: '50px',
        width: '300px',
        height: 'auto'
    },
    loginButton: {
        width: '330px'
    }
}


class Login extends React.Component {
    render() {
        const { initialValues, handleSubmit } = this.props;
        return (
            <Formik
                validationSchema={
                    object({
                        password: string().required('*Password required').string
                    })
                }
                initialValues={initialValues}
                onSubmit={async (values) => {
                    return new Promise(res => setTimeout(() => {
                        handleSubmit(values);
                    }, 500))
                }}
            >
            {({ values, errors, isSubmitting }) => (
                <Form style={styles.formContainer}>
                    <Field type="password" name="password" as={TextField} label="Password" />
                    <div style={styles.errorColor}>
                        <ErrorMessage name="password"/>
                    </div>

                    <div style={styles.buttonContainer}>
                    <Button style={styles.loginButton} variant="contained" type="submit" color="primary">
                        Login
                    </Button>
                    </div>
                   

                </Form>
            )}
            </Formik>
        )
    }

}


export default Login;