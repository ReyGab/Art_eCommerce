import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';

import Dialog from '@material-ui/core/Dialog';

import AdminEdit from '../components/edit';



class AdminEditContainer extends React.Component {

    onSetDefaultValues() {
        const { selectedProduct } = this.props;
        return {
            initialValues: {
                id: selectedProduct.id,
                name: selectedProduct.name,
                stockQuantity: selectedProduct.stock_quantity,
                price: selectedProduct.price,
                images: selectedProduct.images,
                category: selectedProduct.category_id,
                description: selectedProduct.description
            }
        }
    }

    onSave(values) {
        const { actions: { editProductItem } } = this.props;
        editProductItem(values);
    }

    render() {
        const { onCloseEditDialog, openEditDialog } = this.props;
        return(
            <Dialog fullWidth={true} maxWidth="sm" open={openEditDialog} onClose={onCloseEditDialog}>
                <AdminEdit {...this.onSetDefaultValues()} handleSubmit={this.onSave.bind(this)} closeEditDialog={onCloseEditDialog}/>
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return state.adminEditReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditContainer);