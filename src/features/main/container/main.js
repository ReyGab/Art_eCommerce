import React from 'react';

import Main from '../components/main';
import PrimarySearchAppBar from '../../../shared-components/app-bar';
import Container from '@material-ui/core/Container';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck'
import CartListContainer from '../../cart/list/container/list';


const styles = {
    container: {
        marginTop: 30
    }
}



class MainContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            openCartDialog: false
        }
    }

    componentDidMount() {
        const { actions: { getUserInfo } } = this.props
        getUserInfo();
    }

    onOpenCartDialog() {
        this.setState({
            openCartDialog: true
        })
    }

    onCloseCartDialog() {
        this.setState({
            openCartDialog: false
        })
    }

    render() {
        const { cartCount, order, userInfo, sortName, sortPrice,
            actions: { removeItemInCart, updateItemCount, searchProductName, filterProductByCategory,
                sortProduct } } = this.props;
        return (
            <div>

                <PrimarySearchAppBar
                    searchProductName={searchProductName}
                    onOpenCartDialog={this.onOpenCartDialog.bind(this)}
                    cartCount={cartCount}
                    filterProductByCategory={filterProductByCategory}
                    sortProduct={sortProduct}
                    sortName={sortName}
                    sortPrice={sortPrice} />
                <Container style={styles.container} >
                    <Main userInfo={userInfo} />
                    {
                        !order ? null
                            : <CartListContainer
                                updateItemCount={updateItemCount}
                                removeItemInCart={removeItemInCart}
                                userInfo={userInfo}
                                openCartDialog={this.state.openCartDialog}
                                onCloseCartDialog={this.onCloseCartDialog.bind(this)} />
                    }


                </Container>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state.mainReducer
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(duck, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);