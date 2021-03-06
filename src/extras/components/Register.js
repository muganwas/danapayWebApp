import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import InputMask from 'react-input-mask'

import { emailregex } from '../helperFunctions';

import firebase from 'firebase';

@connect((store)=>{
    return {
        registrationDetails: store.registration,
        registrationFetched: store.registration.fetched,
    }
})
export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            toastStyle: "toast"
        }
    }   
    componentWillReceiveProps(nextProps) {
        this.props = {...nextProps};
    }
    saveCredentials = ()=>{
        if((this.state.firstname !== undefined && this.state.lastname !== undefined && this.state.email !== undefined && this.state.number !== undefined && this.state.password !== undefined) 
        && (this.state.firstname !== null && this.state.lastname !== null && this.state.email !== null && this.state.number !== null && this.state.password !== null)
        && (this.state.firstname !== "" && this.state.lastname !== "" && this.state.email !== "" && this.state.number !== "" && this.state.password !== "") 
        ){
            let emailAdd = this.state.email;
            if(emailAdd.match(emailregex)){
                if(this.state.password === this.state.confirmPassword ){
                    this.setState({
                        message: ""
                    })
                    this.onRegister();
                }else{
                    this.setState({
                        message: "Les mots de passe ne correspondent pas"
                    });
                }
            }else{
                this.setState({
                    message: "Le format de l'email est incorrect"
                });
            }
        }else{
            this.setState({
                message: "Remplir tous les champs"
            })
        }
    }
    storeCredentials = (e)=>{
        if(e.target.id === "number"){
            let number = e.target.value.replace("(", "").replace("+","00").replace(")", "");
            this.setState({
                number: number.replace(new RegExp(" ", "g"), "")
            });
        }else{
            this.setState({
                [e.target.id]: e.target.value
            });
        }     
    }
    onRegister = ()=>{
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => { 
            this.props.createDanapayUser(user.uid);
            this.setState({
                message: "Vous vous êtes inscrit avec succès"
            });
            this.props.dispatch(this.dispatchedInfo());
        })
        .catch((error) => {
            this.setState({
                message:'Serveur indisponible. Veuillez reessayer ultérieurement ' + error.message
            });
        });
    }
    dispatchedInfo = ()=>{
        if((this.state.firstname !== undefined && this.state.lastname !== undefined && this.state.email !== undefined && this.state.number !== undefined && this.state.password !== undefined) 
        && (this.state.firstname !== null && this.state.lastname !== null && this.state.email !== null && this.state.number !== null && this.state.password !== null)
        && (this.state.firstname !== "" && this.state.lastname !== "" && this.state.email !== "" && this.state.number !== "" && this.state.password !== "") 
        ){
            return {
                type: "FETCH_REG_FULFILLED",
                payload: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    number: this.state.number,
                    password: this.state.password,
                }
            }
        }else{
            return {
                type: "FETCH_REG_REJECTED",
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
                    <AppBar onRightIconButtonClick = { this.props.toggleDrawerState } iconElementRight={<i className="material-icons menu">menu</i>} showMenuIconButton={ false } title = "Registre" />
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
                        id="firstname"
                        fullWidth = { true }
                        hintText="Mamadou"
                        floatingLabelText="Pre nom"
                        value = { this.state.firstname }
                        floatingLabelFixed={true}                
                        onChange={ this.storeCredentials }
                    >
                    </TextField><br/>
                    <TextField
                        id="lastname"
                        fullWidth = { true }
                        hintText="Sakho"
                        floatingLabelText="Nom"
                        value = {this.state.lastname}
                        floatingLabelFixed={true}                
                        onChange={this.storeCredentials}
                    >
                    </TextField><br/>
                    <TextField
                        id="email"
                        fullWidth = { true }
                        hintText="example@gmail.com"
                        floatingLabelText="Adresse e-mail"
                        value = { this.state.email }
                        floatingLabelFixed={true}                
                        onChange={ this.storeCredentials }
                        type="email"
                    >
                    </TextField><br/>
                    <TextField
                        id="number"
                        fullWidth = { true }
                        floatingLabelText="Numero"
                        value = { this.state.number }
                        floatingLabelFixed={true}                  
                        onChange={ this.storeCredentials }
                    >
                    <InputMask mask="(+33)9 99 99 99 99" maskChar=" " />
                    </TextField><br/>
                    <TextField
                        id="password"
                        fullWidth = {true}
                        hintText="votre mot de passe"
                        floatingLabelText="Mot de passe"
                        value = { this.state.password }
                        floatingLabelFixed={true}                
                        onChange= {this.storeCredentials }
                        type="password"
                    >
                    </TextField><br/>
                    <TextField
                        id="confirmPassword"
                        fullWidth = {true}
                        hintText="Confirmez le mot de passe"
                        floatingLabelText="Confirmez le mot de passe"
                        value = { this.state.confirmPassword }
                        floatingLabelFixed={true}                
                        onChange={ this.storeCredentials }
                        type="password"
                    >
                    </TextField><br/>
                    <RaisedButton
                        primary={true}
                        fullWidth = {true}
                        onClick={ this.saveCredentials }
                        label="Registre"
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}