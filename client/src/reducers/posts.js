export default (posts = [], action) => {
    const type = action.type;
    const payload = action.payload;

    if(type === 'FETCH_ALL'){
        return payload;
    }else if(type === 'CREATE'){
        return [...posts, payload]
    }else if(type === 'UPDATE'){
        return posts.map((post) => post._id === action.payload._id ? action.payload : post)
    }

    return posts;
}