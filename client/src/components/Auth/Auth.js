import React, {useState} from 'react'
import {TextField, Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {signin, signup} from '../../actions/auth'
import * as api from '../../api';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch(); 
  const history = useHistory();
  const[formData, setFormData] = useState(initialState);
  const[statusCode, setStatusCode] = useState(null)

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if(isSignup){
        dispatch(signup(formData, history))
    }else{
        const error = await dispatch(signin(formData, history))

        if(error){
           const statusCode = error.response.status
           setStatusCode(statusCode)
        }
    }
  }

  const handleChange = (event) => {
    console.log("in handle change")
    const target = event.target;
    setFormData({...formData, [target.name] : target.value})
  }

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  }

  const handleForgotPassword = async(event) => {
    event.preventDefault();

    try{
      await api.forgotPassword(formData)
      // mention in link -> one time (<15mins pe bhi one time) + only valid for 15 mins
      setForgotPassword(false)
      setSuccessMessage(true)
    }catch(error){ 
      setStatusCode(404)
    }
  }
  
  if(statusCode){
    return (
      <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation ={3}>
             <Avatar className={classes.avatar}>
                 <LockOutlinedIcon/>
             </Avatar>
             <Typography variant="h5">{statusCode===404?'User not found' : 'Incorrect password'}</Typography>
              <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick = {()=>setStatusCode(null)}>
                  {'Try again'}
              </Button>
              {
                statusCode===400 && 
                <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick = {()=>{setStatusCode(null); setForgotPassword(true)}}>
                {'Forgot password?'}
                </Button>
              }
         </Paper>
      </Container>
    )
  }

  if(forgotPassword){
    return (
    <Container component="main" maxWidth="xs">
       <Paper className={classes.paper} elevation ={3}>
           <Avatar className={classes.avatar}>
               <LockOutlinedIcon/>
           </Avatar>
           <Typography variant="h6" style={{textAlign:"center"}}>{'Please enter your email address, a link will be sent to reset your password'}</Typography>
           <form className={classes.form} onSubmit = {handleForgotPassword}>
              <Grid container spacing = {2}>
                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
              </Grid> 
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {'Submit'}
              </Button>
           </form>
       </Paper>
    </Container>
    ) 
  }
  
  if(successMessage){
    return (
      <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation ={3}>
             <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
             </Avatar>
             <Typography variant="h6" style={{textAlign:"center"}}>{'A link has been sent to your email address to reset your password'}</Typography>
             <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick = {()=>setSuccessMessage(false)}>
                {'Okay'}
             </Button>
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
           <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
           <form className={classes.form} onSubmit = {handleSubmit}>
              <Grid container spacing = {2}>
                {
                  isSignup && (
                    <>
                      <Input name = "firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                      <Input name = "lastName" label="Last Name" handleChange={handleChange} half/>
                    </>
                  )
                }

                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                {isSignup && <Input name ="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"}/>}
              </Grid> 
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {isSignup ? 'Sign up' : 'Sign In'}
              </Button>
              <Grid container justify="flex-end">
                   <Grid item>
                       <Button onClick={switchMode}>
                        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                       </Button>
                   </Grid> 
              </Grid>
           </form>
       </Paper>
    </Container>
  )
}

export default Auth