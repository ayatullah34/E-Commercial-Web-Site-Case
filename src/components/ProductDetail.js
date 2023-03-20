import { Button, Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SkeletonImg } from "../constant/CustomUtils";
import { getProductDetail, setCartItems } from "../redux/eterationSlice";
import Cart from "./Cart";

export default function ProductDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const initalRender = useRef(true)
    const isLoading = useSelector(({ eteration }) => eteration.isLoading)
    const productDetail = useSelector(({ eteration }) => eteration.productDetail)
    const cartItems = useSelector(({ eteration }) => eteration.cartItems)

    useEffect(() => {
        if (initalRender.current) {
            initalRender.current = false
        }
        else {
            dispatch(getProductDetail({ id }))
        }
        const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'))
        if (!Object.keys(cartItems || []).length > 0 && Object.keys(cartItemsFromStorage || []).length > 0) {
            dispatch(setCartItems(cartItemsFromStorage))
        }
    }, [dispatch, id])

    const handleAddCart = (item) => {
        const data = {
            id: item.id,
            name: item.name,
            price: item.price,
            count: 1
        }
        let tmp = JSON.parse(localStorage.getItem("cartItems")) || [];
        const index = tmp.findIndex((x) => x.id === data.id)
        if (index !== -1) {
            tmp[index].count += 1
            localStorage.setItem("cartItems", JSON.stringify(tmp));
            dispatch(setCartItems(tmp))
        }
        else {
            tmp.push(data)
            localStorage.setItem("cartItems", JSON.stringify(tmp));
            dispatch(setCartItems(tmp))
        }
    }

    return (
        <div className="w-full flex flex-row">
            <div className="w-[10%]" />
            <div className="md:w-3/5 sm:full p-5" >
                <Paper elevation={3} sx={{ padding: 5 }} >
                    <div className="w-full flex justify-center space-x-5">
                        {isLoading
                            ? (
                                <div className="w-full">
                                    <SkeletonImg />
                                </div>
                            )
                            : (
                                <>
                                    <div style={{ maxWidth: '100%', height: 'auto' }}>
                                        <img data-testid='product detail img' src={productDetail.image} alt={productDetail.name} />
                                    </div>
                                    <div style={{ maxWidth: '50%', height: 'auto' }} className="space-y-2">
                                        <div className='text-xl'>{productDetail.name}</div>
                                        <div className='text-[#1976d2]'>{`${productDetail.price} ₺`}</div>
                                        <div className='w-full pr-1'>
                                            <Button
                                                data-testid='product detail add cart btn'
                                                className='w-full'
                                                size="small"
                                                sx={{ "&:hover": { background: "#2246d2" }, backgroundColor: '#1976d2', color: '#fff' }}
                                                onClick={() => handleAddCart(productDetail)}
                                            >
                                                Add To Cart
                                            </Button>
                                        </div>
                                        <div>{productDetail.description}</div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Paper>
            </div>
            <div className="w-1/5">
                {Object.keys(cartItems).length > 0 && <Cart />}
            </div>
        </div>
    )
}