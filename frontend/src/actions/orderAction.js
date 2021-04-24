import axios from 'axios';
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
    ORDER_LIST_MINE_REQUEST,
    ORDER_LIST_MINE_SUCCESS,
    ORDER_LIST_MINE_FAIL
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

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    try {
        await axios.put(`/api/orders/${id}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_MINE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    try {
        const { data } = await axios.get('/api/orders', config);

        dispatch({
            type: ORDER_LIST_MINE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MINE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}