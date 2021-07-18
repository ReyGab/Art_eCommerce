import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';


import CartList from '../components/list';

const constantStyles = {
    modalTitleContainer: {
        textAlign: 'center'
    },
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    },
    imageStyle: {
        height: "500px",
        width: "400px",
        borderRadius: "5px"
    },
    input: {
        width: '40px'
    },
    dialogActionContainer: {
        justifyContent: 'center',
        background: 'black',
        color: 'white',
        padding: '20px',
        fontSize: '21px',
        cursor: 'pointer'
    },
    grandTotalContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    emptyCartContainer: {
        textAlign: 'center'
    },
    emptyCartIcon: {
        transform: 'scale(1.8)'
    }
}

class CartListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderQuantity: 1
        }
    }


    render() {
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

        const DialogContent = withStyles((theme) => ({
            root: {
                padding: theme.spacing(2),
            },
        }))(MuiDialogContent);

        const DialogActions = withStyles((theme) => ({
            root: {
                margin: 0,
                padding: theme.spacing(1),
            },
        }))(MuiDialogActions);

        const { openCartDialog, onCloseCartDialog, userInfo, removeItemInCart, updateItemCount } = this.props;
        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth="md"
                    onClose={onCloseCartDialog} open={openCartDialog}>
                    <DialogTitle style={constantStyles.modalTitleContainer} id="customized-dialog-title" onClose={onCloseCartDialog}>
                        <Typography variant="h5">Your Cart</Typography>
                    </DialogTitle>

                    <DialogContent dividers>
                        {userInfo.order.line_items.length === 0 ?<div>
                            <Typography style={constantStyles.emptyCartContainer} variant="h4">Your cart is empty </Typography> 
                        </div>
                          : null}
                        {
                            userInfo.order.line_items.map((order, index) =>
                                <CartList userInfo={userInfo}
                                    order={order}
                                    key={index}
                                    updateItemCount={updateItemCount}
                                    removeItemInCart={removeItemInCart} />)
                        }

                    </DialogContent>
                    <Divider />
                    <div style={constantStyles.grandTotalContainer}>
                       {userInfo.order.line_items.length === 0 ? null :  <Typography gutterBottom variant="h5">
                            GRAND TOTAL: ₱ {userInfo.order?.total.toFixed(2)}
                        </Typography>}
                    </div>
                    <Divider />
                    {userInfo.order.line_items.length === 0 ? null :  <DialogActions style={constantStyles.dialogActionContainer}>
                        CHECKOUT
                    </DialogActions>}
                    
                </Dialog>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state.cartListReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListContainer);