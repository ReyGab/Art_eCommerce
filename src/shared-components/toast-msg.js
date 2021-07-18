import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ToastMsg({ message }) {

  return (
    <div>
          <Typography gutterBottom variant="h5" component="h2">
              Success!
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
              {message}
          </Typography>
    
    </div>
  );
}
