import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MINE_REQUEST,
    ORDER_LIST_MINE_SUCCESS,
    ORDER_LIST_MINE_FAIL
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

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderListMineReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MINE_REQUEST:
            return { loading: true }
        case ORDER_LIST_MINE_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_MINE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}