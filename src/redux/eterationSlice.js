import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//MOCK API'NIN RESPONSUNDA PAGINATION İÇİN GEREKLİ OLAN TOTAL COUNT GELMEDİĞİ İÇİN BU YÖNTEME BAŞVURULMUŞTUR.........
//EXAMPLE url: `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}
// &&limit=12&&sortBy=${sort.field}&&order=${sort.order}&&${filterField.field}=${filterField.name}`,
export const getProducts = createAsyncThunk(
    'eteration/getProducts',
    async ({ sort, filterBrand, search }) => {
        const response = await axios({
            method: 'GET',
            url: `https://5fc9346b2af77700165ae514.mockapi.io/products?sortBy=${sort.field}&&order=${sort.order}&&brand=${filterBrand.name || ''}`,
            headers: { 'content-type': 'application/json' },
        })
        return response
    }
)

export const getModelsInProducts = createAsyncThunk(
    'eteration/getModelsInProducts',
    async ({ filterField }) => {
        const brand = filterField.field === 'brand' ? filterField.name : ''
        const response = await axios({
            method: 'GET',
            url: `https://5fc9346b2af77700165ae514.mockapi.io/products?brand=${brand}`,
            headers: { 'content-type': 'application/json' },
        })
        return response
    }
)

//MOCK API İÇERİSİNDE COLUMN'A GÖRE REQUEST OLMADIĞI İÇİN BU YÖNTEME BAŞVURULMUŞTUR.........
//EXAMPLE `https://5fc9346b2af77700165ae514.mockapi.io/products?columns=brand`
export const getBrandInProducts = createAsyncThunk(
    'eteration/getBrandInProducts',
    async () => {
        const response = await axios({
            method: 'GET',
            url: `https://5fc9346b2af77700165ae514.mockapi.io/products`,
            headers: { 'content-type': 'application/json' },
        })
        return response
    }
)

export const getProductDetail = createAsyncThunk(
    'eteration/getProductDetail',
    async ({ id }) => {
        const response = await axios({
            method: 'GET',
            url: `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`,
            headers: { 'content-type': 'application/json' },
        })
        return response
    }
)

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

const eterationSlice = createSlice({
    name: "eteration",
    initialState: {
        isLoading: false,
        productsData: [],
        brands: [],
        models: [],
        cartItems: [],
        totalPrice: 0,
        productDetail: {},
        productSearch: ''
    },
    reducers: {
        setModels: (state, action) => {
            state.models = action.payload
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        setProductSearch: (state, action) => {
            state.productSearch = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getModelsInProducts.fulfilled, (state, action) => {
                state.models = getUniqueListBy(action.payload.data, 'model')
            })
            .addCase(getBrandInProducts.fulfilled, (state, action) => {
                state.brands = getUniqueListBy(action.payload.data, 'brand')
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productsData = action.payload.data
                state.isLoading = false
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getProductDetail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.productDetail = action.payload.data
                state.isLoading = false
            })
    }
})
export const { setBrands, setModels, setCartItems, setTotalPrice, setProductSearch } = eterationSlice.actions
export default eterationSlice.reducer


