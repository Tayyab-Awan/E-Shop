import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../constants/orderCostants';

export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return { loading: true }
        case PLACE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case PLACE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {
    loading: true, orderItems: [], shippingAddress: {}
}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}