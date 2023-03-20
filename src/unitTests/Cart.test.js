
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Cart from '../components/Cart';
import { setCartItems } from '../redux/eterationSlice';
import { store } from "../redux/store";
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

beforeEach(() => {
    render(<Provider store={store}><Cart /></Provider>)

})

const data = [{
    id: 80,
    name: "Nissan",
    price: 340,
    count: 1
}]

describe('Cart redux state tests', () => {
    it('Should initially set cart items to an empty array', () => {
        const state = store.getState().eteration
        expect(state.cartItems).toEqual([])
    })
})

describe('Cart list test', () => {
    it('Should be able to fetch the Products', async () => {
        await store.dispatch(setCartItems(data))
        const state = store.getState().eteration
        expect(state.cartItems).toEqual(data)

        await expect(screen.getByTestId(/^increment/i)).toBeInTheDocument();

        const { getAllByTestId } = render(<Provider store={store}><Cart /></Provider>)
        const incrementBtn = await screen.getAllByTestId(/^increment/i)[0]
        const decrementBtn = await screen.getAllByTestId(/^decrement/i)[0]


        const counter = await screen.getAllByTestId(/^counter/i)

        fireEvent.click(incrementBtn)
        await waitFor(() => {
            expect(screen.getAllByTestId(/counter/i)[0]).toHaveTextContent(1)
        })
    })
})