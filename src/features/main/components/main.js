import React from 'react';

import ProductListContainer from '../../product/list/container/list';

class Main extends React.Component {
    render() {
        const { userInfo } = this.props;
        return(
            <ProductListContainer userInfo={userInfo}/>
        )
    }
} 

export default Main;