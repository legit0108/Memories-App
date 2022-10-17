import React from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux';
import {getPosts} from '../../actions/posts';
import {useState, useEffect} from 'react';
import Pagination from '../Pagination';
import { mergeClasses } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search)       
}

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1; // if you don't have page you must be on the first one
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');

    useEffect(() => {
       dispatch(getPosts());
    },[dispatch])

    const handleKeyPress = (event) => {
        if(event.keyCode === 13){
            // search for post, event.keyCode is 13 for enter key
        }
    }

    return(
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                       <AppBar className={classes.appBarSearch} position="static" color="inherit">
                         <TextField 
                           name="search" 
                           variant="outlined" 
                           label="Search Memories"
                           onKeyPress={handleKeyPress}
                           fullWidth
                           value={search}
                           onChange={(event)=>setSearch(event.target.value)}/>    
                       </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/> 
                        <Paper elevation={6}> 
                           <Pagination/> 
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home