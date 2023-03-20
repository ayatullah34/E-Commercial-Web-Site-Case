import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkeletonImg } from '../constant/CustomUtils';
import { setCartItems } from '../redux/eterationSlice';
import { searchFilterFunction } from '../constant/CommonFunc';

const CardItem = ({ item }) => {
    const dispatch = useDispatch()

    const handleAddCart = (item) => {
        const data = {
            id: item.id,
            name: item.name,
            price: item.price,
            count: 1
        }
        let tmp = JSON.parse(localStorage.getItem('cartItems')) || [];
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
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                data-testid='cart image'
                className='m-3 cursor-pointer'
                sx={{ height: { md: 140, sm: 100 } }}
                image={item.image}
                title={item.name}
                onClick={() => window.location = `product/${item.id}`}
            />
            <CardContent>
                <Typography gutterBottom sx={{ fontWeight: { md: 'bold' }, fontSize: { md: 12, sm: 10 } }} className='text-[#1976d2]'>
                    {`${item.price} ₺`}
                </Typography>
                <Typography sx={{ fontWeight: { md: 'bold' }, fontSize: { md: 12, sm: 10 } }}>
                    {item.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    data-testid='product list add cart btn'
                    size="small"
                    sx={{ "&:hover": { background: "#2246d2" }, backgroundColor: '#1976d2', color: '#fff', fontSize: { md: 12, sm: 10 } }}
                    className='w-full'
                    onClick={() => handleAddCart(item)}
                >
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    )
}


function Products(props) {
    const isLoading = useSelector(({ eteration }) => eteration.isLoading)
    const productsData = useSelector(({ eteration }) => eteration.productsData)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productSearch = useSelector(({ eteration }) => eteration.productSearch)

    useEffect(() => {
        if (productSearch?.length > 0 || productSearch?.length === 0) {
            const newData = searchFilterFunction(productSearch, 'name', productsData)
            if (newData?.length > 12) {
                props?.showPagination(true)
            }
            else {
                props?.showPagination(false)
            }
            setFilteredProducts(newData)
        }
        else {
            Object.keys(productsData || []).length > 0 && setFilteredProducts(productsData)
        }
    }, [productsData, productSearch, props])

    const data = () => {
        if (Object.keys(filteredProducts || []).length > 12) {
            let tmp = filteredProducts
            if (props.filterModal?.name?.length > 0) {
                tmp = filteredProducts.filter((item) => item.modal === props.filterModal?.name)
            }
            return tmp.slice(props.page * 12, props.page * 12 + 12)
        }
        return props.filterModal?.name?.length > 0 ? filteredProducts.filter((item) => item.model === props.filterModal?.name) : filteredProducts
    }

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data().map((item, index) => (
                    <Grid xs={2} sm={4} md={3} key={index}>
                        {isLoading
                            ? <SkeletonImg />
                            : <CardItem item={item} />
                        }
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default memo(Products);