import * as actionTypes from '../Constants/ProductConstants'


export const getProductDetailsReducer = (state = {product: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return{
                loading: true
            }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}