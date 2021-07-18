import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    maxWidth: 345,
    height: '25vw'
  },
  cardContent: {
    height: '10vw'
  },
  cardDescription: {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    'overflow': 'hidden',
    textOverflow: 'ellipsis'
  }
}


class BasicCard extends React.Component {

  render() {
    const { name, description, image, price, actions, onClickCard } = this.props;
    return (
      <Card raised style={styles.card}>
        <CardActionArea onClick={() => onClickCard()}>
          <CardMedia
            component="img"
            alt="Food"
            height="140"
            image={image}
            title="Food"
            style={styles.cardContent}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
           <div>
              <Typography style={styles.cardDescription} paragraph color="textSecondary" component="p">
                {description}
              </Typography>
           </div>

            <Typography variant="h6" color="textSecondary" component="p">
              ₱ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions style={styles.cardActions}>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions> */}
      </Card>
    )
  }

}

export default BasicCard;