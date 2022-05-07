import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function PageNotFound() {

  return (
    <Container style={{
        position: 'absolute', left: '75%',top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
          <Typography  variant="h5" component="h2">
              PAGE NOT FOUND
          </Typography>
    
    </Container>
  );
}
