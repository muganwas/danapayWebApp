import React, { Component } from 'react';
import firebase from 'firebase';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import InputMask from 'react-input-mask'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import Toggle from 'material-ui/Toggle';
import crypto from 'crypto';

import { connect } from 'react-redux';
import { defineRecipient } from './actions/recipient-action';
import { defineDestination } from './actions/destination-action';
import { defineAmount } from './actions/amount-action';

import User from './extras/components/User';

import { fulldate } from './extras/helperFunctions';

import axios from 'axios';
import request from 'request';
//import { onInitPayment } from './requestManager';
//import mrTangoCollect from 'mrTangoCollect'
const styles = {
  toggle: {
    marginBottom: 16,
  }, 
  label: {
    fontSize: 12,
    color: '#B7B7B7'
  },
  number: {
    fontSize: 24,
    color: '#B7B7B7'
  }
}
const feePercentage = 0.03;
const eurCfaRate = 656;
const productCode = "TRX"


@connect((store)=>{
  return {
    user: store.user,
    payment: store.payment,
    usersFetched: store.user.fetched,
    loggedIn: store.user.user.loggedIn,
    urlFetched: store.payment.fetched,
    redirectURL: store.payment.payment.url
  }
})
class App extends Component {
  constructor(props){
    super(props)
    this.onUpdateRecipient = this.onUpdateRecipient.bind(this)

    this.handleRecipientFirstNameChange = this.handleRecipientFirstNameChange.bind(this)
    this.handleRecipientNameChange = this.handleRecipientNameChange.bind(this)
    this.handleRecipientNumChange = this.handleRecipientNumChange.bind(this)

    this.handleDestinationCountryChange = this.handleDestinationCountryChange.bind(this)
    this.handleDestinationCityChange = this.handleDestinationCityChange.bind(this)
    this.handleDestinationQuarterChange = this.handleDestinationQuarterChange.bind(this)

    this.handleAmountEURChange = this.handleAmountEURChange.bind(this)
    this.handleAmountCFAChange = this.handleAmountCFAChange.bind(this)
    this.handleFeesChange = this.handleFeesChange.bind(this)
    this.handleAmountPayedChange = this.handleAmountPayedChange.bind(this)
  }

  state = {
    stepIndex: 0,
    recipientFirstName : "",
    recipientName : "",
    recipientNum : "",
    destinationCountry : "Mali",
    destinationCity : "",
    destinationQuarter : "", 
    senderSupportsFees : false,
    amountEUR : "",
    amountCFA : 0,
    fees : 0,
    amountToPay :0,
    transactionRef: productCode+this._random(10),
    dataToken : null,
    date: fulldate
  };

  componentWillMount(){
    let cityUrl = "https://todolistapi2406.herokuapp.com/cities";
    request.get(cityUrl, (err, message, body)=>{
      let cities = JSON.parse(body);
      let len = cities.length;
      let newCities = {};
      let count =0;
      for(count; count<len; count++){
        newCities[cities[count].name] = cities[count].quarters;
      }
      this.setState({
        cities: newCities
      });
    });
  }
  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user')) || {};
    if(user.token !== undefined && user.token !== null){
      this.setState({
        loggedIn: true,
        localToken: user.token
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.props = {...nextProps};
    this.setState({
      redirectURL: this.props.redirectURL
    });
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 4) {
      if(stepIndex === 0) this.onUpdateRecipient()
      if(stepIndex === 1) this.onUpdateDestination()
      if(stepIndex === 2) this.onUpdateAmount()
      if(stepIndex === 3) {
        this.onPay()
      }
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Suivant"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Retour"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  _random (howMany, chars) {
      chars = chars 
          || "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
      var rnd = crypto.randomBytes(howMany)
          , value = new Array(howMany)
          , len = Math.min(256, chars.length)
          , d = 256 / len
  
      for (var i = 0; i < howMany; i++) {
          value[i] = chars[Math.floor(rnd[i] / d)]
      };
  
      return value.join('');
  }
  handleRecipientFirstNameChange(e) {
    this.setState({
        recipientFirstName: e.target.value
    });
  }
  handleRecipientNameChange(e) {
    this.setState({
        recipientName: e.target.value
    });
  }
  handleRecipientNumChange(e) {
    this.setState({
        recipientNum: e.target.value.replace("(", "").replace("+","00").replace(")", "").replace(new RegExp(" ", "g"), "")
    });
  }

  handleDestinationCountryChange(e) {
    this.setState({
        destinationCountry: e.target.value
    });
  }
  handleDestinationCityChange(e, i, v) {
    this.setState({
        destinationCity: v
    });
  }
  handleDestinationQuarterChange(e, i, v) {
    this.setState({
        destinationQuarter: v
    });
  }

  handleAmountEURChange(e) {
    var factor = Math.pow(10, 2);
    this.setState({
        amountEUR : e.target.value, 
        fees : Math.round(feePercentage*e.target.value*factor)/factor, 
        amountToPay : Math.round(e.target.value*(1+feePercentage)*factor)/factor,
        amountCFA : e.target.value*eurCfaRate
    });
  }
  handleAmountCFAChange(e) {
    this.setState({
        amountCFA : e.target.value,
        amountEUR : e.target.value/eurCfaRate
    });
  }
  handleFeesChange(e) {
    this.setState({
        fees : e.target.value
    });
  }
  handleAmountPayedChange(e) {
    this.setState({
        amountPayed : e.target.value
    });
  }

  onUpdateRecipient(){
    return (
      this.props.onDefineRecipient(
        this.state.recipientFirstName,
        this.state.recipientName,
        this.state.recipientNum,
      )
    )
  }

  onUpdateDestination(){
    return (
      this.props.onDefineDestination(
        this.state.destinationCountry,
        this.state.destinationCity,
        this.state.destinationQuarter,
      )
    )
  }

  onUpdateAmount(){
    return (
      this.props.onDefineAmount(
        this.state.amountCFA,
        this.state.amountEUR,
        this.state.fees,
        this.state.amountToPay,
      )
    )
  }
  /*the lightbox plugin seems to have issues opening even when used with html and core js
  ************************
  renderLightBox = ()=>{
    return (
      //Code to complete
      <div id="PaylineWidget" 
        data-token={ this.state.token }
        data-template="column"
        data-auto-init="true"
        data-embeddedredirectionallowed="false" 
      />
    )
  }*/
  createDanapayTempUser = ()=>{
    return new Promise ((resolve, reject) => {
      let gId = "tempgId" + this._random(5);
      let passcode = "tpc" + this._random(5);
      let url = 'http://danapay-users-staging.eu-central-1.elasticbeanstalk.com/api/createUser';
        axios.post(url, 
          {
            gId:gId,
            type:"customer",
            fname:this.state.recipientFirstName,
            lname:this.state.recipientName,
            phoneNum:this.state.recipientNum,
            country:"Mali",
            passCode:passcode
        }).then((response)=>{
          if(response.data.userCreationETHMessage === "User successfully created on Ethereum."
                && response.data.userCreationDBMessage === "User successfully created in database.")
            {
                resolve("Vous avez enregistré avec succès")
            }
            else 
            {
                reject("Serveur indisponible. Veuillez reessayer ultérieurement")
            }
        })
        .catch((error)=>{
            this.setState({
                message: "Serveur indisponible. Veuillez reessayer ultérieurement " + error.message
            });
        });
    });
  }
  onPay(){
    let phoneNum = this.state.recipientNum;
      let url = "http://danapay-users-staging.eu-central-1.elasticbeanstalk.com/api/getUser?phoneNum=" + phoneNum;
      request.get(url,(err, message, body)=>{
        let feedback = JSON.parse(body);
        if(feedback.userGettingMessage !== "User successfully found by phone number."){
          this.createDanapayTempUser().then(()=>{
            this.doPayment();
          });
        }else{
          this.doPayment();
        }
      });
  }
  doPayment = ()=>{
    let url = 'https://dev.aliendynamic.com/examples/web/doWebPayment.php'
    request.post({url,
     form: { 
       amount: this.state.amountToPay,
        currency: '978',
         ref: this.state.transactionRef
    }}, (err, response, body)=>{
      if(err){
        this.setState({
          message: err.message
        })
      }
      let token = body.split('=');
      token = token.pop();
      this.setState({
        redirectURL: body,
        paylineToken: token
      });
      //console.log(this.state.paylineToken);
      this.props.dispatch(this.dispatchedInfo());
      this.sendInfo();
    });
  }
  sendInfo = ()=>{
    let url = "https://todolistapi2406.herokuapp.com/details";
    request.post({url, form: {
        token: this.state.paylineToken,
        firstName: this.state.recipientFirstName,
        lastName: this.state.recipientName, 
        phoneNumber: this.state.recipientNum, 
        city: this.state.destinationCity, 
        quarter: this.state.destinationQuarter, 
        amountToReceive: this.state.amountCFA 
      }}, (err, response, body)=>{
      if(err){
        console.log(err);
      }
      console.log("Status: " + response.statusCode + " Body: " + body);
    });
  }
  dispatchedInfo = ()=>{
    if(this.state.redirectURL !== undefined && this.state.redirectURLl !== "" && this.state.redirectURL !== null){   
      return {
            type: "FETCH_PI_FULFILLED",
            payload: {
                url: this.state.redirectURL,
                paylineToken: this.state.paylineToken
            }
        }
    }else{
        return {
            type: "FETCH_PI_REJECTED",
            payload: {
                error: "Certains champs ne sont pas remplis"
            }
        } 
    }
  }
  login = ()=>{
    window.location.replace(window.location.href + "user");
  }
  logout = ()=>{
    firebase.auth().signOut().then(()=>{
      localStorage.removeItem('user');
      this.setState({
        loggedIn: false
      });
    });
  }
  renderQuarters = (key)=>{
    return(
      <MenuItem key={key} value={key} primaryText={key} />
    )
  }
  loginB = <RaisedButton onClick={this.login} label="S'identifier" className="simple-button"/>;
  logoutB = <RaisedButton onClick={this.logout} label="Déconnexion" className="simple-button"/>;
  render() {
    const cities = this.state.cities || {};
    const quarters = cities[this.state.destinationCity] || {};
    const { stepIndex } = this.state;
    if(this.props.redirectURL !== undefined && this.props.redirectURL !== null && this.props.redirectURL !== ""){
      //redirect to the payline page
      if(this.state.loggedIn === true || this.props.loggedIn === true){
        window.location.replace(this.props.redirectURL); 
        return null;
      }else{
        return(
          <User />
        )    
      }
      /*redirect to the payline page
      *using an iFrame doesn't seem very ideal
      ****************************************
      return(
        <PaymentEntry redirectURL={ this.state.redirectURL } />
      )*/ 
    }else{
      return (
        <div className="wrapper">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AppBar showMenuIconButton={ false } title = "Remplir les détails" iconElementRight={this.state.loggedIn?this.logoutB:this.loginB} />
          <div className={ this.state.toastStyle }>{ this.state.message }</div>
            <Stepper
                activeStep={stepIndex}
                linear={false}
                orientation="vertical"
              >
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 0})}>
                  Informations sur le bénéficiaire
                  </StepButton>
                  <StepContent>
                    <TextField
                      floatingLabelText="Numero du bénéficiaire"
                      value = {this.state.recipientNum}
                      floatingLabelFixed={true}                  
                      onChange={this.handleRecipientNumChange}
                    >
                    <InputMask mask="(+223)99 99 99 99" maskChar=" " />
                    </TextField><br/>
                    <TextField
                      hintText="Mamadou"
                      floatingLabelText="Prénom du bénéficiaire"
                      value = {this.state.recipientFirstName}
                      floatingLabelFixed={true}
                      onChange={this.handleRecipientFirstNameChange}
                    /><br/>
                    <TextField
                      hintText="Sacko"
                      floatingLabelText="Nom du bénéficiaire"
                      value = {this.state.recipientName}
                      floatingLabelFixed={true}
                      onChange={this.handleRecipientNameChange}
                    />
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 1})}>
                  Informations sur la destination
                  </StepButton>
                  <StepContent>
                    <SelectField
                      floatingLabelText="Ville"
                      value={this.state.destinationCity}
                      onChange={this.handleDestinationCityChange}
                    >
                      <MenuItem value={"Bamako"} primaryText="Bamako" />
                      <MenuItem value={"Kayes"} primaryText="Kayes" />
                    </SelectField><br/>
                    <SelectField
                      floatingLabelText="Quartier"
                      value={this.state.destinationQuarter}                  
                      onChange={this.handleDestinationQuarterChange}
                    >
                      {Object.keys(quarters).map(this.renderQuarters)}
                    </SelectField>
                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 2})}>
                  Informations sur le montant
                  </StepButton>
                  <StepContent>
                    <TextField
                      hintText="0000"
                      floatingLabelText="Montant (EURO)"
                      floatingLabelFixed={true}
                      value = {this.state.amountEUR}
                      onChange={this.handleAmountEURChange}
                    /><br/>
                    <TextField
                      hintText="0000"
                      value = {this.state.amountCFA}
                      floatingLabelText="Montant (CFA)"
                      floatingLabelFixed={true}
                      disabled = {true}
                      onChange={this.handleAmountCFAChange}
                    />
                    <br/>
                    <br/>
                    <span style={styles.label}>Frais</span><br/>
                    <span>{this.state.fees}</span><br/>
                    <br/>
                    <span style={styles.label}>Total à payer</span><br/>                
                    <span>{this.state.amountToPay}</span>                
                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onClick={() => this.setState({stepIndex: 3})}>
                  Récapitulatif
                  </StepButton>
                  <StepContent>
                    <span style={styles.label}>Bénéficiaire</span><br/>
                    <span>{this.state.recipientFirstName} {this.state.recipientName}</span><br/>
                    <br/>
                    <span style={styles.label}>Numéro</span><br/>                
                    <span>{this.state.recipientNum}</span><br/>
                    <br/>
                    <span style={styles.label}>Montant envoyé</span><br/>                
                    <span>{this.state.amountEUR} EUR</span><br/>
                    <br/>
                    <span style={styles.label}>Montant reçu au Mali</span><br/>                
                    <span>{this.state.amountCFA} CFA</span><br/>
                    <br/>
                    <span style={styles.label}>Total à payer</span><br/>                
                    <span>{this.state.amountToPay} EUR</span>       
                    {this.renderStepActions(3)}
                  </StepContent>
                </Step>
              </Stepper>
          </MuiThemeProvider>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  recipient : state.recipient, 
  destination : state.destination, 
  amount : state.amount
})

const mapActionToProps = {
  onDefineRecipient : defineRecipient,
  onDefineDestination : defineDestination, 
  onDefineAmount : defineAmount 
}

export default connect(
mapStateToProps, mapActionToProps
)(App);
