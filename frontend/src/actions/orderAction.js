import axios from 'axios';
import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL
} from '../constants/orderCostants';

export const placeOrder = (orderData) => async (dispatch, getState) => {
    dispatch({ type: PLACE_ORDER_REQUEST });

    const { useLogin: { userInfo } } = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    try {
        const { data } = await axios.post("/api/orders", orderData, config);

        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: data
        })

        localStorage.setItem('order', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}