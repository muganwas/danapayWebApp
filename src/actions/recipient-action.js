export const DEFINE_RECIPIENT = "recipient:defineRecipient"

export function defineRecipient(_recipientFirstName, _recipientName, _recipientNum) {
    return {
        type : DEFINE_RECIPIENT,
        payload: {
            recipientFirstName : _recipientFirstName,
            recipientName : _recipientName,
            recipientNum : _recipientNum,
        }
    }
}