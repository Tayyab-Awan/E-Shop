import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existingItem = state.cartItems.find(x => x.product === item.product);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existingItem.product ?
                        { ...existingItem, qty: item.qty } : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [item, ...state.cartItems]
                }
            }

        case CART_REMOVE_ITEM:
            const id = action.payload;
            const updatedItems = state.cartItems.filter(x => x.product !== id);
            console.log('items after remve action: ', updatedItems)
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== id)
            }

        default:
            return state;
    }
}