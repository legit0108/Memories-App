import React from 'react'
import {Container, Grow, Grid} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux';
import {getPosts} from '../../actions/posts';
import {useState, useEffect} from 'react';

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
       dispatch(getPosts());
    },[dispatch])

    return(
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}> {/* full space on small devices and 7/12 on small, medium devices (larger devices) */}
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}> {/* full space on small devices and 7/12 on small, medium devices (larger devices) */}
                        <Form currentId={currentId} setCurrentId={setCurrentId}/> 
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home