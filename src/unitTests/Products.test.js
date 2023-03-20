
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Products from '../components/Products';
import { getProducts } from '../redux/eterationSlice';
import { store } from "../redux/store";
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

beforeEach(() => {
    let showPagination = true
    const handlePagination = (value) => {
        showPagination = value
    }
    const page = 1
    const filterModal = {}
    render(<Provider store={store}><Products page={page} filterModal={filterModal} showPagination={handlePagination} /></Provider>)
})


describe('Products redux state tests', () => {
    it('Should initially set productsData to an empty array', () => {
        const state = store.getState().eteration
        expect(state.productsData).toEqual([])
    })
})


describe('Products list test', () => {

    it('Should be able to fetch the Products', async () => {
        const result = await store.dispatch(getProducts({ sort: "", filterBrand: "", search: "" }))
        const products = result.payload.data
        const state = store.getState().eteration

        expect(result.type).toBe('eteration/getProducts/fulfilled')
        expect(state.productsData).toEqual(products)
    })
})

describe('Products list items', () => {
    it('btn img should be in products list', async () => {
        expect(await screen.getAllByTestId(/^product list add cart btn/i))[0]?.toBeInTheDocument();
        expect(await screen.getAllByTestId(/^cart image/i))[0]?.toBeInTheDocument()

        expect(await screen.getAllByTestId(/^cart image/i))?.toHaveLength(12)
    })
})