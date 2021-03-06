import React from 'react';
import { Grid, Typography, makeStyles, Card, CardMedia, CardContent, Button } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const PostWidget = (props)=>{
    const posts = useSelector(store => store.serverData[props.displayCategory]);
    return <Grid container>
        <Typography variant="h6">Latest posts</Typography>
        {posts.map((post, i)=>{
            return <SinglePost key={post.id} {...post}/> 
        })}
    </Grid>
}

export default PostWidget;

const singlePostStyles = makeStyles((theme)=>({
    image: {
        width: "100%",
        heigth: "100%"
    },
    root: {
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
        gridGap: "20px",
        marginTop: "15px"
    },
    button: {
        alignSelf: "flex-end"
    }
}))
const SinglePost = (props)=>{
    const {id, title, excerpt, featuredImage, databaseId } = props;
    const classes = singlePostStyles();
    const history = useHistory()
    return <Grid item>
            <Card className={classes.root}>
                <CardMedia image={featuredImage !== null ? featuredImage.sourceUrl : "https://www.northernlightspizza.com/wp-content/uploads/2017/01/image-placeholder.jpg"}/>
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1" dangerouslySetInnerHTML={{__html: `${excerpt.substr(0, 200)}...`}}/>
                    <Button onClick={()=>{
                        history.push(`/post/${title}`)
                    }} className={classes.button} size="small" >Read More...</Button>
                </CardContent>
            </Card>

    </Grid>
}

