export const DEFINE_AMOUNT = "amount:defineAmount"

export function defineAmount(_amountEUR, _amountCFA, _fees, _amountTotal) {
    return {
        type : DEFINE_AMOUNT,
        payload: {
            amountEUR : _amountEUR,
            amountCFA : _amountCFA,
            fees : _fees,
            amountTotal : _amountTotal,
        }
    }
}