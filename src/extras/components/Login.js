import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import { emailregex } from '../helperFunctions';
import '../../App.css';

import firebase from 'firebase';

@connect((store)=>{
    return {
        user: store.user,
        redirectURL: store.payment.payment.url,
        usersFetched: store.user.fetched
    }
})
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            toastStyle: "toast"
        }
    }
    componentWillReceiveProps(nextProps) {
        this.props = {...nextProps};
        this.setState({
            message: this.props.message
        })
    }
    saveCredentials = ()=>{
        if((this.state.email !== undefined && this.state.password !== undefined)
         && (this.state.email !== "" && this.state.password !== "")
         && (this.state.email !== null && this.state.password !== null)
        ){
            let emailAdd = this.state.email;
            if(emailAdd.match(emailregex)){
                this.setState({
                    message: ""
                });
                this.onLogin();
            }else{
                this.setState({
                    message: "Le format de l'email est incorrect"
                });
            }
        }else{
            this.setState({
                message: "Remplir tous les champs"
            });
        } 
    }
    storeCredentials = (e)=>{
        this.setState({
            [e.target.id]: e.target.value
        });              
    }
    onLogin = ()=>{
        const { email, password } = this.state;
        let auth = firebase.auth();
        //console.log(email + password)
        auth.signInWithEmailAndPassword(email, password)
            .then((userFirebase) => { 
                this.props.getDanapayUser(userFirebase.uid).then((message)=>{
                    this.setState({
                        message
                    });
                    auth.currentUser.getIdToken().then(token=>{
                        localStorage.setItem('user', JSON.stringify({token: token, uid: userFirebase.uid}));
                        this.props.dispatch(this.dispatchedInfo());
                        if(this.props.redirectURL === "" || this.props.redirectURL === null || this.props.redirectURL === undefined){
                            window.location.replace(window.location.origin);
                        }
                    });
                });
            })
            .catch((error) => {
                this.setState({
                    message:'Serveur indisponible. Veuillez reessayer ultérieurement '+ error.message
                });
        });
    }
    dispatchedInfo = ()=>{
        if((this.state.email !== undefined && this.state.password !== undefined)
         && (this.state.email !== "" && this.state.password !== "")
         && (this.state.email !== null && this.state.password !== null)
        ){
            return {
                type: "FETCH_USER_FULFILLED",
                payload: {
                    username: this.state.email,
                    password: this.state.password,
                    loggedIn: true,
                    registered: true
                }
            }
        }else{
            return {
                type: "FETCH_USER_REJECTED",
                payload: {
                    error: "Certains champs ne sont pas remplis"
                }
            } 
        }
    }
    render(){
        return(
            <div className="wrapper">
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <AppBar onRightIconButtonClick = { this.props.toggleDrawerState } iconElementRight={<i className="material-icons menu">menu</i>} showMenuIconButton={ false } title = "S'identifier">
                    </AppBar>
                    <div className={ this.state.toastStyle }>{ this.state.message || this.props.message }</div>
                    <Drawer containerClassName="menu-drawer" 
                    docked={ true } zDepth = { 5 } 
                    open={ this.props.drawerOpen }
                    >
                        <span id="login" onClick={ this.props.changeUserScreen }>S'identifier</span>
                        <Divider />
                        <span id="register" onClick={ this.props.changeUserScreen }>Registre</span>
                        <Divider />
                        <span id="reset" onClick={ this.props.changeUserScreen }>Réinitialiser le mot de passe</span>                     
                    </Drawer>
                    <TextField
                        id="email"
                        fullWidth = { true }
                        hintText="Mamadou@gmail.com"
                        floatingLabelText="Nom d'utilisateur"
                        value = { this.state.email }
                        floatingLabelFixed={true}                
                        onChange={this.storeCredentials}
                        type="email"
                    >
                    </TextField><br/>
                    <TextField
                        id="password"
                        fullWidth = { true }
                        hintText="votre mot de passe"
                        floatingLabelText="Mot de passe"
                        value = { this.state.password }
                        floatingLabelFixed={true}                
                        onChange={ this.storeCredentials }
                        type="password"
                    >
                    </TextField><br/>
                    <RaisedButton
                        primary={true}
                        fullWidth = {true}
                        onClick={this.saveCredentials}
                        label="S'identifier"
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}