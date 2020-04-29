import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Link, Typography } from "@material-ui/core";

const styles = makeStyles(theme =>({
    menuBar: {
        minWidth: "150px",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "stretch",
        width: "100%",
        paddingTop: "10px"
    },
    dropdown: {
        flexDirection: "column",
        position: "absolute",
        right: "8px",
        top: 0,
        transform: "translateY(62px)",
        minWidth: "150px",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.7s linear",
        "&:hover":{
            cursor: "pointer"
        }
    },
    dropdownitem: {
        display: "flex"
    },
    listItem: (props)=>({
        display: "inline-block",
        padding: "5px 10px",
        "& :nth-child(1)":{
            display: props.show? "block": "none"
            },
        "& ul":{
            display: "block",
            top: props.dropdown? "0": "100%",
            right: props.dropdown? "100%": "0",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        }
    }),
    navbarWrapper: {
        display: "inline-flex",
        marginRight: 0,
        marginLeft: "auto"
    }
}))

export default (props)=>{
    let menuItems = useSelector((store)=>{
        return store.serverData.primaryMenu
    });
    const classes = styles();
    const [ displayMenu, setDisplayMenu ] = useState([]);
    useEffect(()=>{
        let temp = menuItems.map((item)=>{
            if(item.parent === null){
                return <ListItem {...item} key={item.id} dropdown={false}/>
            }
        })
        setDisplayMenu(temp);
    }, [menuItems])

    return <Typography className={classes.navbarWrapper} component="ul"> {displayMenu}</Typography>
}

const ListItem = (props)=>{
    const [ show, setShow ] = useState(false);
    const classes = styles({ show, dropdown: props.dropdown});
    return <Link 
        className={classes.listItem} 
        style={{position: "relative"}} 
        color="inherit" 
        key={props.id} 
        label={props.label} 
        onMouseEnter={()=>{
            setShow(true);
        }}
        onMouseLeave={()=>{
            setShow(false);
        }}
        href={props.url}>
            {props.label} 
            <Dropdown parent={props.label} category={props.label}/>
        </Link>
}
const Dropdown = (props)=>{
    const menuItems = useSelector(state => state.serverData.primaryMenu)
    const [ dropdownItems, setDropdownItems ] = useState([]);
    useEffect(()=>{
        let temp = menuItems.map((item)=>{
            if(item.parent === props.category){
                return <ListItem {...item} key={item.id} dropdown={true} />
            }
        })
        setDropdownItems(temp);
    }, [props.show])
    return <Typography component="ul" className={props.label} style={{position: "absolute"}}>{dropdownItems}</Typography>
}
