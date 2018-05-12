import soap from "soap-everywhere"
import http from "http";

var url = 'https://homologation.payline.com/V4/services/WebPaymentAPI?wsdl';
var options = {    
    endpoint: "https://homologation.payline.com/V4/services/WebPaymentAPI?wsdl",
    connection: 'keep-alive',
}

var data = {
    'version': '18',
    'payment': {
        'amount': '',
        'currency' : '978',
        'action' : '101',
        'mode' : 'CPT',
        'contractNumber' : '1234567',
        },
    'order': {
        'ref': '',
        'amount' : '',
        'currency' : '978'
        },
};
var args = {
    version: '18',
    payment: {
        amount: '',
        currency : '978',
        action : '101',
        mode : 'CPT',
        contractNumber : '1234567',
        },
    order: {
        ref: '',
        amount : '',
        currency : '978'
        },
    returnURL : 'http://wwww.danapay.io',
    selectedContractList: {},
    cancelURL : 'http://www.google.fr',
    securityMode: 'Transport'
};
/*
var args = {
  host: 'https://homologation.payline.com',
  port: '80',
  path: '/V4/services/doWebPaymentRequest',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': (JSON.stringify(data)).length
  }
};
*/
export function onInitPayment() {
    var args = {
        version: '18',
        payment: {
            amount: '',
            currency : '978',
            action : '101',
            mode : 'CPT',
            contractNumber : '1234567',
            },
        order: {
            ref: '',
            amount : '',
            currency : '978'
            },
        returnURL : 'http://wwww.danapay.io',
        selectedContractList: {},
        cancelURL : 'http://www.google.fr',
        securityMode: 'Transport'
    };
    soap.createClient(url, options, (err, client)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(client)
            client.doWebPayment(args, (err, result)=>{
                if(err){
                    throw new Error(err)
                }else{
                    console.log(result)
                }
            });
        }  
    });
}

/*
export function doWebPaymentRequest(amount, ref) {
    // data.payment.amount = amount; 
    // data.order.amount = amount; 
    // data.order.ref = ref;
    // var req = http.request(doWebPaymentRequestOptions, function(res) {
    //     var result = '';
    //     res.setEncoding('utf8');
    //     res.on('data', function(chunk) {
    //         result += chunk;
    //     });
    //     res.on('end', function() {
    //         console.log(JSON.parse(result));
    //     });
    // });
    // req.write(data);
    // req.end();
    args.payment.amount = amount;
    args.order.ref = ref;
    args.order.amount = amount;
    // soap.createClientAsync(url, options)
    // .then((client) => {
    //     return client.MyFunctionAsync(args);
    // })
    // .then((result) => {
    //     console.log(result);
    // });
}
*/

