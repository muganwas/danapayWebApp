export const DEFINE_DESTINATION = "destination:defineDestination"

export function defineDestination(_destinationCountry, _destinationCity, _destinationQuarter) {
    return {
        type : DEFINE_DESTINATION,
        payload: {
            destinationCountry : _destinationCountry,
            destinationCity : _destinationCity,
            destinationQuarter : _destinationQuarter,
        }
    }
}