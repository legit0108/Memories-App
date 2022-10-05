export default (posts = [], action) => {
    if(action.type === 'FETCH_ALL'){
        return action.payload;
    }

    return posts;
}