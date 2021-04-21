import axios from 'axios';
import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../constants/orderCostants';

export const placeOrder = (orderData) => async (dispatch, getState) => {
    dispatch({ type: PLACE_ORDER_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    try {
        const { data } = await axios.post("/api/orders", orderData, config);

        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    try {
        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}