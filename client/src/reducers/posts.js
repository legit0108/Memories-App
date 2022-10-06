export default (posts = [], action) => {
    const type = action.type;
    const payload = action.payload;

    if(type === 'FETCH_ALL'){
        return payload;
    }else if(type === 'CREATE'){
        return [...posts, payload]
    }

    return posts;
}