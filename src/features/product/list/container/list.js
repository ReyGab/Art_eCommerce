import React from 'react';

import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import ArrowDropDownIcon from '@material-ui/icons/ExpandMore';
import ArrowUpwardIcon from '@material-ui/icons/ExpandLess';
import TablePagination from '@material-ui/core/TablePagination';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as duck from '../duck';

import ProductList from '../components/list';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import auth from '../../../../auth';

const constantStyles = {
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    },
    imageStyle: {
        height: "auto",
        width: "100%",
        borderRadius: "5px"
    },
    input: {
        width: '40px'
    }
}

class ProductListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openProductDetails: false,
            selectedProduct: null,
            orderQuantity: 1,
            page: 0,
            rowsPerpage: 15
        }
    }

    componentDidMount() {
        const { productList, actions: { getInitialProducts } } = this.props
        getInitialProducts();
        auth.logout(() => {
         
        });
    }

    onCloseProductDetails() {
        this.setState({
            openProductDetails: false,
            selectedProduct: null,
            orderQuantity: 1
        })
    }

    onOpenProductDetails(selectedProduct) {
        this.setState({
            openProductDetails: true,
            selectedProduct: selectedProduct
        })
    }

    onAddQuantity() {
        let newQuantity = this.state.orderQuantity;
        this.setState({
            orderQuantity: newQuantity += 1
        })
    }

    onMinusQuantity() {
        let newQuantity = this.state.orderQuantity;
        if (newQuantity !== 1)
            this.setState({
                orderQuantity: newQuantity -= 1
            })
    }

    onPageChange(event, newPage) {
        const { actions: { nextPageProducts } } = this.props;
        const statePage = newPage;
        let jsonPage = newPage;
        if(jsonPage >= 1 || newPage === 0) {
            jsonPage+=1;
        }
        if(this.state.page > jsonPage) {
            jsonPage-=1;
        }

        nextPageProducts(jsonPage);
        this.setState({
            page: statePage
        })
    }

    render() {
        const { productList, userInfo, productListCount, actions: { addToCart } } = this.props

        const styles = (theme) => ({
            root: {
                margin: 0,
                padding: theme.spacing(2),
            },
            closeButton: {
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(1),
                color: theme.palette.grey[500],
            },
        });

        const DialogContent = withStyles((theme) => ({
            root: {
                padding: theme.spacing(2),
            },
        }))(MuiDialogContent);

        const DialogTitle = withStyles(styles)((props) => {
            const { children, classes, onClose, ...other } = props;
            return (
                <MuiDialogTitle disableTypography className={classes.root} {...other}>
                    <Typography variant="h6">{children}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
            );
        });

        const DialogActions = withStyles((theme) => ({
            root: {
                margin: 0,
                padding: theme.spacing(1),
            },
        }))(MuiDialogActions);

        return (
            <div>
                 <TablePagination
                    style={constantStyles.gridContainer}
                    rowsPerPageOptions={[]}
                    component="div"
                    count={productListCount}
                    rowsPerPage={this.state.rowsPerpage}
                    page={this.state.page}
                    onPageChange={this.onPageChange.bind(this)}
                />
                <ProductList productList={productList} onOpenProductDetails={this.onOpenProductDetails.bind(this)} />
                <TablePagination
                    style={constantStyles.gridContainer}
                    rowsPerPageOptions={[]}
                    component="div"
                    count={productListCount}
                    rowsPerPage={this.state.rowsPerpage}
                    page={this.state.page}
                    onPageChange={this.onPageChange.bind(this)}
                />
                <Dialog
                    fullWidth
                    maxWidth="md"
                    onClose={() => this.onCloseProductDetails()}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.openProductDetails}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.onCloseProductDetails()}>

                    </DialogTitle>
                    <DialogContent >
                        <Grid style={constantStyles.gridContainer}
                            container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <img style={constantStyles.imageStyle} src={this.state.selectedProduct?.images} alt={this.state.selectedProduct?.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography paragraph gutterBottom variant="h4" >
                                    {this.state.selectedProduct?.name}
                                </Typography>

                                <Typography paragraph gutterBottom variant="h5" >
                                    ₱ {this.state.selectedProduct?.price}
                                </Typography>

                                <Typography gutterBottom color="textSecondary" component="p">
                                    {this.state.selectedProduct?.description}
                                </Typography>

                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button disabled={this.state.orderQuantity === 1}><ArrowDropDownIcon onClick={() => this.onMinusQuantity()} /></Button>
                                    <TextField style={constantStyles.input} disabled variant="outlined" size="small" value={this.state.orderQuantity.toString()} />
                                    <Button onClick={() => this.onAddQuantity()}><ArrowUpwardIcon /></Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        <Divider />
                        <DialogActions>
                            <Fab onClick={() => addToCart(userInfo, this.state.selectedProduct, this.state.orderQuantity)} variant="extended" color="primary" aria-label="add" >
                                <AddShoppingCartIcon />
                                Add To Cart
                            </Fab>
                        </DialogActions>
                    </DialogContent>

                </Dialog>
            </div>



        )
    }
}


function mapStateToProps(state) {
    return state.productListReducer
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);