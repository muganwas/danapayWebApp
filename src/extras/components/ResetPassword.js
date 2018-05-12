import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

//import { fulldate } from '../helperFunctions';
//import firebase from 'firebase';

@connect((store)=>{
    return {
        user: store.user,
        username: store.user.username,
        password: store.user.password,
        usersFetched: store.user.fetched
    }
})
export default class ResetPassword extends Component {
    constructor(props){
        super(props)
        this.state={
            toastStyle: "toast"
        }
    }
    componentWillReceiveProps(nextProps) {
        this.props = {...nextProps};
    }
    resetPassword = ()=>{

    }
    storeCredentials = (e)=>{
        this.setState({
            [e.target.id]: e.target.value
        });               
    }
    render(){
        return(
            <div className="wrapper">
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <AppBar onRightIconButtonClick = { this.props.toggleDrawerState } iconElementRight={<i className="material-icons menu">menu</i>} showMenuIconButton={ false } title = "Réinitialiser le mot de passer" />
                    <div className={ this.state.toastStyle }>{ this.state.message }</div>
                    <Drawer containerClassName="menu-drawer" 
                    docked={ true } zDepth = { 1000 } 
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
                        floatingLabelText="Adresse e-mail"
                        value = { this.state.email }
                        floatingLabelFixed={true}                
                        onChange={this.storeCredentials}
                        type="email"
                    >
                    </TextField><br/>
                    <RaisedButton
                        primary={true}
                        fullWidth = {true}
                        onClick={this.resetPassword}
                        label="Réinitialiser le mot de passe"
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}