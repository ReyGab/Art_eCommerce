import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import AdminAdd from '../components/new';

import Dialog from '@material-ui/core/Dialog';



class AdminAddContainer extends React.Component {
    onSetDefaultValues() {
        return {
            initialValues: {
                name: '',
                stockQuantity: '',
                price: '',
                images: '',
                category: '',
                description: ''
            }
        }
    }

    onSave(values) {
        const { actions: { addNewProduct } } = this.props;
        addNewProduct(values);
    }

    render() {
        const { openAddProductDialog, onCloseAddProductDialog } = this.props;
        return (
            <Dialog fullWidth={true} maxWidth="sm" open={openAddProductDialog} onClose={onCloseAddProductDialog}>
                <AdminAdd
                    {...this.onSetDefaultValues()}
                    handleSubmit={this.onSave.bind(this)}
                    openAddProductDialog={openAddProductDialog}
                    onCloseAddProductDialog={onCloseAddProductDialog} />
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return state.adminAddReducer
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddContainer);