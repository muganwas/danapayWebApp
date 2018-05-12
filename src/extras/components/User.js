import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import TextField from 'material-ui/TextField';
//import Drawer from 'material-ui/Drawer';

//import helperFunctions, { fulldate } from '../helperFunctions';
import '../../App.css';

//import firebase from 'firebase';

@connect((store)=>{
    return {
        user: store.user,
        username: store.user.username,
        loggedInPassword: store.user.password,
        loggedIn: store.user.loggedIn,
        firstname: store.registration.user.firstname,
        lastname: store.registration.user.lastname,
        email: store.registration.user.email,
        number: store.registration.user.number,
        password: store.registration.user.password,
        redirectURL: store.payment.payment.url,
        registered: store.user.registered
    }
})
export default class User extends Component {
    constructor(props){
        super(props)
        this.state={
            userScreen: "login",
            drawerOpen: false 
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.props={...nextProps}
    }
    
    getDanapayUser = (gId)=>{
        return new Promise ((resolve, reject) => {
        axios.get('http://danapay-users-staging.eu-central-1.elasticbeanstalk.com/api/getUser?gId='+gId)
        .then((response)=>{
            //console.log(response)
            if(response.data.userGettingMessage.endsWith('Unable to find user.'))
            { 
                /*this.setState({
                    message: 'incapable de trouver l\'utilisateur ' + response.data.userGettingMessage
                });*/
                reject('incapable de trouver l\'utilisateur ' + response.data.userGettingMessage);
            }
            else 
            {
                /*this.setState({
                    message: 'Il y avait une erreur ' + response.data.userGettingMessage
                });*/
                resolve('Il y avait une erreur ' + response.data.userGettingMessage);
            }
        })
        .catch((error)=>{
                this.setState({
                    message: 'Il y avait une erreur ' + error.message
                })
            });
        });
    }

    createDanapayUser = (userId)=>{
        return new Promise ((resolve, reject) => {
            axios.post('http://danapay-users-staging.eu-central-1.elasticbeanstalk.com/api/createUser', 
            {
                gId:userId,
                type:"customer",
                fname:this.props.firstname,
                lname:this.props.lastname,
                phoneNum:this.props.number,
                country:"France",
                passCode:this.props.password	
            })
            .then((response)=>{
                //console.log(response);
                if(response.data.userCreationETHMessage === "User successfully created on Ethereum."
                    && response.data.userCreationDBMessage === "User successfully created in database.")
                {
                    this.setState({
                        message: "Vous avez enregistré avec succès"
                    });
                }
                else 
                {
                    this.setState({
                        message: "Serveur indisponible. Veuillez reessayer ultérieurement"
                    });
                }
            })
            .catch((error)=>{
                this.setState({
                    message: "Serveur indisponible. Veuillez reessayer ultérieurement " + error.message
                });
            });
        });
    }

    storeCredentials = (e)=>{
        if(e.target.id === "username"){
            this.setState({
                username: e.target.value
            })
        }else if(e.target.id === "password"){
            this.setState({
                password: e.target.value
            })
        }              
    }
    changeUserScreen = (e)=>{
        this.setState({
            userScreen: e.target.id,
            message: ""
        })
    }
    toggleDrawerState = ()=>{
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }
    render(){
        if(this.state.userScreen === "login" || this.state.userScreen === undefined){
            return(
                <div className="wrapper">
                    <Login
                     message = { this.state.message }
                     getDanapayUser = { this.getDanapayUser } 
                     toggleDrawerState = { this.toggleDrawerState }
                     drawerOpen = { this.state.drawerOpen}
                     changeUserScreen = { this.changeUserScreen } 
                    />
                </div>
            )
        }else if(this.state.userScreen === "register"){
            return(
                <div className="wrapper">
                    <Register
                     message = { this.state.message } 
                     createDanapayUser = { this.createDanapayUser }
                     toggleDrawerState = { this.toggleDrawerState }
                     drawerOpen = { this.state.drawerOpen} 
                     changeUserScreen = { this.changeUserScreen } 
                    />
                </div>
            )
        }else if(this.state.userScreen === "reset"){
            return(
                <div className="wrapper">
                    <ResetPassword toggleDrawerState = { this.toggleDrawerState }
                     drawerOpen = { this.state.drawerOpen}
                     changeUserScreen = { this.changeUserScreen } 
                    />
                </div>
            )
        }
    }
}