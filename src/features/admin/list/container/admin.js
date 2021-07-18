import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';
import Container from '@material-ui/core/Container';
import PrimarySearchAppBar from '../../../../shared-components/app-bar';
import AdminList from '../components/admin';
import EditAdminContainer from '../../edit/container/edit';
import BasicDialog from '../../../../shared-components/basic-dialog';
import Fab from '@material-ui/core/Fab';
import AddProductIcon from '@material-ui/icons/AddCircleOutline';
import AdminAddContainer from '../../new/container/new';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const styles = {
    container: {
        marginTop: 30
    },
    addButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px'
    }
}

const basicDialogOpts = {
    dialogTitle: '',
    dialogContentText: '',
    actions: [],
    openBasicDiag: false,
    onCloseBasicDiag: null
}

class AdminListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeader: [
                'Name',
                'Price',
                'Quantity',
                'Category',
                'Description',
                ''
            ],
            actionMenuItems: [
                {
                    label: 'EDIT',
                    action: this.onOpenEditDialog.bind(this),
                    icon: <EditIcon />
                },
                {
                    label: 'DELETE',
                    action: this.onOpenDeleteDialog.bind(this),
                    icon: <DeleteIcon />
                },
            ],
            openEditDialog: false,
            selectedProduct: null,
            basicDialogOpts: basicDialogOpts,
            openAddDialog: false
        }
    }

    componentDidMount() {
        const { actions: { getProductList } } = this.props
        getProductList();
    }

    onOpenEditDialog(handleClose, product) {
        this.setState({
            openEditDialog: true,
            selectedProduct: product
        })
    }

    onCloseEditDialog() {
        this.setState({
            openEditDialog: false
        })
    }

    onCloseBasicDiag() {
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                dialogTitle: '',
                dialogContentText: '',
                actions: [
                ],
                openBasicDiag: false,
                onCloseBasicDiag: null
            }
        })
    }

    onOpenDeleteDialog(handleClose, product) {
        const { actions: { deleteProductItem } } = this.props;
        this.setState({
            selectedProduct: product,
            basicDialogOpts: {
                ...basicDialogOpts,
                dialogTitle: 'Delete Selected Product',
                dialogContentText: `Are you sure you want to delete ${product.name}?`,
                actions: [
                    {
                        label: 'CANCEL',
                        action: this.onCloseBasicDiag.bind(this),
                        color: 'primary'
                    },
                    {
                        label: 'DELETE',
                        action: deleteProductItem.bind(this, product, this.onCloseBasicDiag.bind(this)),
                        color: 'secondary'
                    }
                ],
                openBasicDiag: true,
                onCloseBasicDiag: this.onCloseBasicDiag.bind(this)
            }
        })
    }

    onCloseAddProductDialog() {
        this.setState({
            openAddDialog: false
        })
    }

    onOpenAddProductDialog() {
        this.setState({
            openAddDialog: true
        })
    }

    render() {
        const { productList, productListCount, actions: { nextPageProducts, searchProductName } } = this.props;
        return (
            <div>
                <PrimarySearchAppBar searchProductName={searchProductName}/>
                <Container style={styles.container} >
                    <div style={styles.addButtonContainer}>
                        <Fab onClick={() => this.onOpenAddProductDialog()} variant="extended" color="primary" aria-label="add" >
                            Add Product
                            <AddProductIcon />
                            
                        </Fab>
                    </div>
                    {/* <AdminTable /> */}
                    <AdminList
                        nextPageProducts={nextPageProducts}
                        productListCount={productListCount}
                        actionMenuItems={this.state.actionMenuItems}
                        productList={productList} tableHeader={this.state.tableHeader}
                        onOpenEditDialog={this.onOpenEditDialog.bind(this)}
                        onOpenDeleteDialog={this.onOpenDeleteDialog.bind(this)}
                    />
                    {this.state.selectedProduct ? <EditAdminContainer
                        openEditDialog={this.state.openEditDialog}
                        selectedProduct={this.state.selectedProduct}
                        onCloseEditDialog={this.onCloseEditDialog.bind(this)} /> : null}

                    <AdminAddContainer 
                    onCloseAddProductDialog={this.onCloseAddProductDialog.bind(this)} 
                    openAddProductDialog={this.state.openAddDialog}/>

                    <BasicDialog basicDialogOpts={this.state.basicDialogOpts} />
                </Container>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state.adminListReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminListContainer);

