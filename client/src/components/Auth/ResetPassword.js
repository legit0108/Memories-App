import React, {useState} from 'react'
import {TextField, Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import * as api from '../../api';
import { useRouteMatch } from "react-router-dom";

const ResetPassword = () => {
    const initialState = {email: '', password: '', confirmPassword: ''}
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const match = useRouteMatch();

    const handleChange = (event) => {
        console.log("in handle change")
        const target = event.target;
        setFormData({...formData, [target.name] : target.value})
    }

    const handleResetPassword = async(event)=>{
        event.preventDefault();
        const id = match.params.id
        const token = match.params.token
        try{
            const result = await api.resetPassword(formData, id, token)
            const {message} = result.data

            setSuccessMsg(message)
        }catch(error){
            const {message} = error.response.data
            setErrorMsg(message)
        }
    }

    if(successMsg){
        return (
            <Container component="main" maxWidth="xs">
               <Paper className={classes.paper} elevation ={3}>
                   <Avatar className={classes.avatar}>
                       <LockOutlinedIcon/>
                   </Avatar>
                   <Typography variant="h5" style={{textAlign:"center"}}>{`${successMsg}`}</Typography>
               </Paper>
            </Container>
        ) 
    }

    if(errorMsg){
        return (
            <Container component="main" maxWidth="xs">
               <Paper className={classes.paper} elevation ={3}>
                   <Avatar className={classes.avatar}>
                       <LockOutlinedIcon/>
                   </Avatar>
                   <Typography variant="h5" style={{textAlign:"center"}}>{`${errorMsg}`}</Typography>
                   {
                    (errorMsg==='Incorrect email' || errorMsg==='Password and repeated password do not match')
                    && 
                    <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick = {()=>setErrorMsg('')}>
                    {'Try again'}
                    </Button>
                   }
               </Paper>
            </Container>
        )
    }

    return (
        <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation ={3}>
               <Avatar className={classes.avatar}>
                   <LockOutlinedIcon/>
               </Avatar>
               <Typography variant="h5" style={{textAlign:"center"}}>{'Reset password'}</Typography>
               <form className={classes.form} onSubmit = {handleResetPassword}>
                  <Grid container spacing = {2}>
                     <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                     <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                     <Input name ="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"}/>
                  </Grid> 
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {'Submit'}
                  </Button>
               </form>
           </Paper>
        </Container>
    ) 
}

export default ResetPassword