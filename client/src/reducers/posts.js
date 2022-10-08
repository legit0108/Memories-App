import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';

export default (posts = [], action) => {
    const type = action.type;
    const payload = action.payload;

    if(type === FETCH_ALL){
        return payload;
    }else if(type === CREATE){
        return [...posts, payload]
    }else if(type === UPDATE || type === LIKE){
        return posts.map((post) => post._id === action.payload._id ? action.payload : post)
    }else if(type === DELETE){
        return posts.filter((post) => post._id !== action.payload)
    }

    return posts;
}