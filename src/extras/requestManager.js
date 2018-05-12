import axios from 'axios'

export function getUser(phoneNum) {
    return new Promise((resolve, reject) => {
        axios.get('http://80.185.130.98:4000/api/getUser?phoneNum=' + phoneNum)
            .then(function (response) {
                // alert(JSON.stringify(response))
                if (response.data.userGettingMessage == "User successfully found by phone number.") {
                    resolve(response.data.user);
                }
                else
                    reject("Impossible de trouver cet utilisateur");
            })
            .catch(function (error) {
                reject("Serveur indisponible. Veuillez essayer dans quelques instants");
            });
    });
}

export function getUserById(gId) {
    return new Promise((resolve, reject) => {
        axios.get('http://80.185.130.98:4000/api/getUser?gId=' + gId)
            .then(function (response) {
                // alert(JSON.stringify(response))
                if (response.data.userGettingMessage == "User successfully found by phone number.") {
                    resolve(response.data.user);
                }
                else
                    reject("Impossible de trouver cet utilisateur");
            })
            .catch(function (error) {
                reject("Serveur indisponible. Veuillez essayer dans quelques instants");
            });
    });
}

export function getUserSentTransactions(senderId, phoneNum) {
    // alert(senderId+" "+phoneNum)
    return new Promise((resolve, reject) => {
        axios.get('http://80.185.130.98:6000/api/getUserSentTransactions?' + 'senderId=' + senderId + '&senderNum=' + phoneNum)
            .then(function (response) {
                // alert(JSON.stringify(response))
                if (response.data.userTransactionsGettingMessage == "Transactions successfully found.") {
                    let transactions = response.data.transactions;
                    transactions.forEach(transaction => {
                        // alert(JSON.stringify(transaction))
                        _getUser(transaction.recipientNum)
                            .then((user) => {
                                transaction = {
                                    ...transaction,
                                    recipientName: user.fname + " " + user.lname
                                };
                            })
                            .catch((error) => {
                                reject("Impossible de trouver les transactions de cet utilisateur");
                            });
                    });
                    resolve(transactions);
                }
                else
                    reject("Impossible de trouver les transactions de cet utilisateur");
            })
            .catch(function (error) {
                reject("Serveur indisponible. Veuillez essayer dans quelques instants");
            });
    });
}

export function getUserReceivedTransactions(recipientId, phoneNum) {
    // alert(senderId+" "+phoneNum)
    return new Promise((resolve, reject) => {
        axios.get('http://80.185.130.98:6000/api/getUserReceivedTransactions?' + 'recipientId=' + recipientId + '&recipientNum=' + phoneNum)
            .then(function (response) {
                // alert(JSON.stringify(response))
                if (response.data.userTransactionsGettingMessage == "Transactions successfully found.") {
                    let transactions = response.data.transactions;
                    transactions.forEach(transaction => {
                        // alert(JSON.stringify(transaction))
                        _getUser(transaction.senderNum)
                            .then((user) => {
                                transaction = {
                                    ...transaction,
                                    sendertName: user.fname + " " + user.lname
                                };
                            })
                            .catch((error) => {
                                reject("Impossible de trouver les transactions de cet utilisateur");
                            });
                    });
                    resolve(transactions);
                }
                else
                    reject("Impossible de trouver les transactions de cet utilisateur");
            })
            .catch(function (error) {
                reject("Serveur indisponible. Veuillez essayer dans quelques instants");
            });
    });
}

function _getUser(phoneNum){
    return new Promise ((resolve, reject) => {
        axios.get('http://80.185.130.98:4000/api/getUser?phoneNum='+phoneNum)
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data.userGettingMessage == "User successfully found by phone number.")
            {
                resolve(response.data.user);
            }
            else
                reject("Impossible de trouver cet utilisateur");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}
