var soap = require('soap');

var url = 'https://homologation.payline.com/V4/services/WebPaymentAPI?wsdl';
var options = {    
    endpoint: "https://homologation.payline.com/V4/services/",
    connection: 'keep-alive',
}
var args = {
    version: '4',
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
    cancelURL : 'http://www.google.fr',

};


module.exports.doWebPaymentRequest = function(amount, ref){
    args.payment.amount = amount;
    args.order.ref = ref;
    args.order.amount = amount;

    soap.createClientAsync(url, options).then((client) => {
        return client.MyFunctionAsync(args);
    }).then((result) => {
        console.log(result);
    });
}