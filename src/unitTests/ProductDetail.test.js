
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ProductDetail from '../components/ProductDetail';
import { getProductDetail } from '../redux/eterationSlice';
import { store } from "../redux/store";
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

beforeEach(() => {
    render(<Provider store={store}><ProductDetail /></Provider>)
})


describe('ProductDetail redux state tests', () => {
    it('Should initially set productDetail to an empty object', () => {
        const state = store.getState().eteration
        expect(state.productDetail).toEqual({})
    })
})

const productId = '80'

const getListResponse = {
    "createdAt": "2022-03-30T10:18:36.956Z",
    "name": "Nissan Spyder",
    "image": "http://placeimg.com/640/480/transport",
    "price": "338.00",
    "description": "Illum tempora et dolor quod rem voluptas alias enim. Est odio assumenda vel rerum voluptatem nulla aut quam. Omnis sint eius impedit optio consectetur quo velit. Adipisci ut voluptatem assumenda accusantium atque ratione quam cupiditate. Qui amet nisi tenetur aut quidem voluptas voluptatem quam maxime.\n \rSequi necessitatibus fugit ut aut qui voluptatibus. Eum nemo est corporis eius nulla possimus ut ipsum sequi. Vero et eligendi. Ut esse est necessitatibus et est. Velit suscipit omnis quibusdam.\n \rAliquid quae consequuntur dolorum ullam. Minima beatae voluptatem sequi ullam sunt. Aut illum dicta voluptatem dolores est magnam. Laboriosam illum soluta nostrum esse eius eos itaque laboriosam culpa.",
    "model": "PT Cruiser",
    "brand": "Mazda",
    "id": "80"
}


describe('product detail redux state tests', () => {

    it('Should be able to fetch the product detail for a specific id', async () => {
        const result = await store.dispatch(getProductDetail({ id: productId }))
        const productDetail = result.payload.data
        const state = store.getState().eteration

        expect(result.type).toBe('eteration/getProductDetail/fulfilled')
        expect(productDetail).toEqual(getListResponse)
        expect(state.productDetail).toEqual(productDetail)

        const addCartBtn = screen.getByTestId(/^product detail add cart btn/i);
        expect(addCartBtn).toBeInTheDocument();

        expect(screen.getByTestId(/^product detail img/i)).toBeInTheDocument();

    })
})