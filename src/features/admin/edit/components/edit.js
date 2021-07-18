import React from 'react';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import SelectField from '@material-ui/core/Select';
import TextArea from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';


const styles = {
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    flexWithMarginTop10: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10
    },
    marginTop30: {
        marginTop: 30
    },
    textAreaMaxWidth: {
        width: '100%'
    },
    errorMessageColor: {
        color: 'red'
    }
}


class AdminEdit extends React.Component {
    render() {
        const { initialValues, handleSubmit, closeEditDialog } = this.props;
        return (
            <div>
                <DialogTitle>Edit Product </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Selected Product
                    </DialogContentText>
                    <Divider />
                    <Formik
                        validationSchema={
                            yup.object({
                                name: yup.string().required('*Name required'),
                                price: yup.number().required('*Price required').positive(),
                                stockQuantity: yup.number().required('*Quantity required').positive().integer(),
                                category: yup.string().required('*Category required'),
                                description: yup.string().required('*Description required'),
                            })
                        }
                        initialValues={initialValues}
                        onSubmit={async (values) => {
                            return new Promise(res => setTimeout(() => {
                                handleSubmit(values);
                            }, 500))
                        }}
                    >
                        {({ values, errors, isSubmitting, isValid }) => (
                            <Form >
                                <div style={styles.flexContainer}>
                                    <Field type="text" name="name" as={TextField} label="Name" />
                                    <Field type="text" name="price" as={TextField} label="Price" />
                                </div>
                                <div style={styles.flexContainer}>
                                    <div style={styles.errorMessageColor}>
                                        <ErrorMessage name="name" />
                                    </div>
                                    <div style={styles.errorMessageColor}>
                                        <ErrorMessage name="price" />
                                    </div>
                                </div>
                                <div style={styles.flexContainer}>
                                    <Field type="text" name="stockQuantity" as={TextField} label="Quantity" />
                                    <Field name="category" value={values.category} style={{ width: '200px' }} as={SelectField}  >
                                        <MenuItem value={1}>Regular</MenuItem>
                                        <MenuItem value={2}>Special</MenuItem>
                                    </Field>
                                </div>
                                <div style={styles.flexContainer}>
                                    <div style={styles.errorMessageColor}>
                                        <ErrorMessage name="stockQuantity" />
                                    </div>
                                    <div style={styles.errorMessageColor}>
                                        <ErrorMessage name="category" />
                                    </div>
                                </div>
                                <div style={styles.flexWithMarginTop10}>
                                    <Field style={{ width: '100%' }} name="description" as={TextArea} label="Description" />
                                </div>
                                <div style={styles.errorMessageColor}>
                                    <ErrorMessage name="description" />
                                </div>


                                <DialogActions style={{ marginTop: 30 }}>
                                    <Button variant="contained" onClick={closeEditDialog} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button disabled={!isValid || isSubmitting} variant="contained" type="submit" onClick={closeEditDialog} color="primary">
                                        Save
                                    </Button>
                                </DialogActions>



                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </div>
        )
    }
}

export default AdminEdit;