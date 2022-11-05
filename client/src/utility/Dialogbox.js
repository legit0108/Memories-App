import React from 'react'
import {Avatar, Button, Paper, Typography, Container} from '@material-ui/core'

const Dialogbox = ({textMessage, buttonMessage, onClick}) => {
    return (
        <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation ={3}>
               <Avatar className={classes.avatar}>
                   <LockOutlinedIcon/>
               </Avatar>
               <Typography variant="h5">{textMessage}</Typography>
                <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick = {onClick}>
                    {{buttonMessage}}
                </Button>
           </Paper>
        </Container>
    )
}

export default Dialogbox