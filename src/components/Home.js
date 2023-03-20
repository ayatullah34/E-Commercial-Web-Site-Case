import { Box, Pagination, Skeleton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandInProducts, getModelsInProducts, getProducts, setCartItems, setModels } from "../redux/eterationSlice";
import Cart from "./Cart";
import Filters from "./Filters";
import Products from "./Products";

export default function Home() {
    const dispatch = useDispatch()
    const initialRender = useRef(true)
    const productsData = useSelector(({ eteration }) => eteration.productsData)
    const cartItems = useSelector(({ eteration }) => eteration.cartItems)
    const brands = useSelector(({ eteration }) => eteration.brands)
    const isLoading = useSelector(({ eteration }) => eteration.isLoading)
    const [sort, setSort] = useState({ field: 'createdAt', order: 'desc' })
    const [filterBrand, setFilterBrand] = useState({})
    const [filterModal, setFilterModal] = useState({})
    const [page, setPage] = useState(1)
    const [showPagination, setShowPagination] = useState(false)

    const handlePagination = (value) => {
        setShowPagination(value)
    }

    const handleChange = (event, value) => {
        setPage(value)
    }
    const handleSort = (value) => {
        setSort(value)
    }

    const handleFilterBrand = (value) => {
        setFilterBrand(value)
        value.name?.length > 0 ? dispatch(getModelsInProducts({ filterField: value })) : dispatch(setModels([]))
        setFilterModal({})
    }

    const handleFilterModal = (value) => {
        setFilterModal(value)
    }

    useEffect(() => {
        if (!initialRender.current) {
            initialRender.current = false
        }
        else {
            dispatch(getProducts({ sort, filterBrand }))
            if (!Object.keys(brands || []).length > 0) {
                dispatch(getBrandInProducts())
            }
            const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'))
            if (!Object.keys(cartItems || []).length > 0 && Object.keys(cartItemsFromStorage || []).length > 0) {
                dispatch(setCartItems(cartItemsFromStorage))
            }
            if (Object.keys(productsData || []).length > 12) {
                setShowPagination(true)
            }

        }
    }, [dispatch, sort, brands, filterBrand])

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div className="w-1/4">
                <Filters sort={handleSort} filterBrand={handleFilterBrand} filterModal={handleFilterModal} />
            </div>
            <div className="w-2/4 p-5" >
                <Box sx={{ height: '100vh' }} >
                    <Products page={page} filterModal={filterModal} showPagination={handlePagination} />
                    {isLoading ? (<Skeleton width="80%" />)
                        : (showPagination &&
                            <div className=" w-full flex justify-center mx-auto p-10 sticky">
                                <Pagination count={Math.floor(productsData?.length / 12)} page={page} onChange={handleChange} />
                            </div>)}
                </Box>
            </div>
            <div className="w-1/4">
                {Object.keys(cartItems || []).length > 0 && <Cart />}
            </div>
        </Box>

    )
}