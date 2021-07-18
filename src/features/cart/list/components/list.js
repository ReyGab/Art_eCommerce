import React from 'react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import ArrowDropDownIcon from '@material-ui/icons/ExpandMore';
import ArrowUpwardIcon from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const constantStyles = {
    modalTitleContainer: {
        textAlign: 'center'
    },
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    },
    imageStyle: {
        height: "200px",
        width: "200px",
        borderRadius: "5px"
    },
    deleteButtonContainer: {
        padding: "5px 1px 0px 1px"
    },
    input: {
        width: '40px'
    }
}

class CartList extends React.Component {

    render() {
        const { order, userInfo, removeItemInCart, updateItemCount } = this.props;
        return (
            <Grid style={constantStyles.gridContainer}
                container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <img style={constantStyles.imageStyle} src={order?.image} alt={order?.name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography paragraph gutterBottom variant="h5" >
                        {order?.name}
                    </Typography>

                    <Typography paragraph gutterBottom variant="h6" >
                        ₱ {order?.price}
                    </Typography>

                    <Typography gutterBottom color="textSecondary" component="p">
                        {order?.description}
                    </Typography>

                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button disabled={order.quantity === 1}><ArrowDropDownIcon onClick={() => updateItemCount(userInfo, order, false)} /></Button>
                        <TextField style={constantStyles.input} disabled variant="outlined" size="small" value={order.quantity.toString()} />
                        <Button onClick={() => updateItemCount(userInfo, order, true)}><ArrowUpwardIcon /></Button>
                    </ButtonGroup>

                    <div style={constantStyles.deleteButtonContainer}>
                        <Button onClick={() => removeItemInCart(userInfo, order)} color="textSecondary">
                            Remove Item
                        </Button>
                    </div>


                </Grid>
            </Grid>

        )
    }
}

export default CartList;