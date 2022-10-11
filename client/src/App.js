import React from "react";
import {Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import {GoogleOAuthProvider} from '@react-oauth/google'
import * as dotenv from 'dotenv'

dotenv.config()

const App = ()=>(
      <BrowserRouter>
         <GoogleOAuthProvider clientId={`${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
            <Container maxwidth="lg">
               <Navbar/>
               <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/auth" exact component={Auth}/>
               </Switch>
            </Container>
         </GoogleOAuthProvider>
      </BrowserRouter>
)

export default App;