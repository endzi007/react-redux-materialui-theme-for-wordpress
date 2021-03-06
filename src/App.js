import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import Header from "./ui/header/header";
import Footer from "./ui/footer/footer";
import Content from "./ui/content/content";
import SearchPage from "./ui/pageTemplates/searchPage";
import { makeStyles, CssBaseline } from '@material-ui/core';
import { sendQueryRequest } from "./state/fetchingData/graphql/queryClient";
import { getAllCategories } from "./state/fetchingData/graphql/categoryQueries";
import { getAllPages } from "./state/fetchingData/graphql/pageQueries";
import { getAllTags } from "./state/fetchingData/graphql/tagQueries";
import { getMenuBySlug } from "./state/fetchingData/graphql/menuQueries";
import { creators as serverDataActions } from "./state/serverData/serverDataDuck";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SinglePost from "./ui/pageTemplates/singlePost";


const styles = makeStyles(theme=>({
    root: {
      width: "80vw",
      margin: "0 auto",
      minHeight: "100vh",
      position: "relative"
    }
}))
function App() {
  const text = useSelector(store=>store.text)
  const dispatch = useDispatch();
  const classes = styles();
  useEffect(()=>{
/*     console.log(getAllCategories("name id"))
   sendQueryRequest([getAllCategories("name id")]).then((data)=>{
      console.log(data, "data");
    dispatch(serverDataActions.addCategories(data.data));
    })  */
    fetch("http://seminarskitest.test/wp-json/wp/v2/pages").then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data);
    })

/*     sendQueryRequest([getAllPages("title content id"), getAllTags("name")]).then((data)=>{
      dispatch(serverDataActions.addPages(data.data));
      dispatch(serverDataActions.addTags(data.data));
    }) 
  
    sendQueryRequest([getMenuBySlug("label url id", "primary-menu")]).then((data)=>{
      dispatch(serverDataActions.addPrimaryMenu(data.data))
    }).catch(e => { console.log(e, "error")}) 
 */
    }, []);
  return (
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <Header />
            <Switch>
                <Route path="/" exact> <Content /></Route>
                <Route exact path="/category/:id"><Content /></Route>
                <Route exact path="/post/:id"><SinglePost /></Route>
                <Route exact path="/tag/:id"><Content /></Route>
                <Route path="/search"><SearchPage /></Route>
            </Switch>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
