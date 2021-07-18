import React from 'react';
import Grid from '@material-ui/core/Grid';
import BasicCard from '../../../../shared-components/basic-card';


const styles = {
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    }
}


class ProductList extends React.Component {
    render() {
        const { productList, onOpenProductDetails } = this.props;
        return (
            <Grid
                container
                spacing={4}
                style={styles.gridContainer}
                justifyContent="center"
            >
                {
                    productList.map((product, index) => <Grid key={index} item xs={12} sm={6} md={4}>
                        <BasicCard name={product.name} 
                        description={product.description}
                        image={product.images}
                        price={product.price}
                        onClickCard={() => onOpenProductDetails(product)} />
                    </Grid>)
                }

            </Grid>
        )
    }
}

export default ProductList;