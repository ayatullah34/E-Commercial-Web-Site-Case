import { Box, Button, ButtonGroup, FormControl, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCartItems, setTotalPrice } from "../redux/eterationSlice";

const Item = styled(Paper)(({ theme }) => ({
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    textAlign: 'start',
    color: 'black',
    height: { md: 80, sm: 40 },
    lineHeight: { md: '50px', sm: '40px' },
}));

function Cart() {
    const dispatch = useDispatch()
    const cartItems = useSelector(({ eteration }) => eteration.cartItems)

    const handleIncrement = (item) => {
        let tmp = JSON.parse(localStorage.getItem('cartItems')) || [];
        const index = tmp.findIndex((x) => x.id === item.id)
        if (index !== -1) {
            tmp[index].count += 1
            localStorage.setItem("cartItems", JSON.stringify(tmp));
            dispatch(setCartItems(tmp))
        }
    };

    const handleDecrement = (item) => {
        let tmp = JSON.parse(localStorage.getItem('cartItems')) || [];
        const index = tmp.findIndex((x) => x.id === item.id)
        if (index !== -1) {
            tmp[index].count -= 1
            if (tmp[index].count === 0) {
                tmp.splice(index, 1);
            }
            if (!Object.keys(tmp || []).length > 0) {
                dispatch(setTotalPrice(0))
            }
            localStorage.setItem("cartItems", JSON.stringify(tmp));
            dispatch(setCartItems(tmp))
        }
    };

    const totalPrice = useMemo(() => {
        let total = 0
        if (Object.keys(cartItems || []).length > 0) {
            cartItems.forEach((item) => {
                total += (parseInt(item.price) * parseInt(item.count))
            })
            dispatch(setTotalPrice(total))
        }
        return total + ' ₺'

    }, [cartItems, dispatch])

    return (
        <Box
            sx={{
                display: { md: 'flex', sm: 'none' },
                flexDirection: 'column',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                },
            }}
        >
            <>
                <FormControl>
                    <Paper elevation={3} className='p-2 md:w-[280px] md:h-[250px]  sm:w-[100px] sm:h-[200px]'>
                        <div className='h-[230px] overflow-auto flex flex-col items-start'>
                            {Object.keys(cartItems || []).length > 0 && cartItems.map((item) => {
                                return (
                                    <div className="grid grid-cols-4 ">
                                        <div className="col-span-2">
                                            <Typography id='cart name' sx={{ fontSize: { md: 12, sm: 10 } }}>
                                                {item.name}
                                            </Typography>
                                            <Typography id='cart price' gutterBottom sx={{ fontSize: { md: 12, sm: 10 } }} className='text-[#1976d2]'>
                                                {`${item.price} ₺`}
                                            </Typography>
                                        </div>
                                        <div className="col-span-2">
                                            <ButtonGroup size="small">
                                                {<Button data-testid='decrement' disabled={item.count === 0} onClick={() => handleDecrement(item)}>-</Button>}
                                                {<Button disabled sx={{ backgroundColor: '#1976d2' }}>
                                                    <Typography
                                                        data-testid='counter'
                                                        sx={{ fontSize: 14 }}
                                                        className="text-white font-bold truncate">
                                                        {item.count}
                                                    </Typography>
                                                </Button>}
                                                <Button data-testid='increment' onClick={() => handleIncrement(item)}>+</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>
                </FormControl>
                <Box className=' md:w-[280px] md:h-[270px]  sm:w-[100px] sm:h-[100px]'>
                    <Item elevation={3}>
                        <Typography data-testid='total price' sx={{ fontSize: { md: 14, sm: 10 } }}>Total Price :
                            <span style={{ color: "#1976d2", fontSize: { md: 14, sm: 10 } }}> {totalPrice}</span ></Typography>
                        <Button
                            sx={{
                                "&:hover": {
                                    background: "#2246d2"
                                }, backgroundColor: '#1976d2', color: '#fff', fontSize: { md: 14, sm: 10 }
                            }}
                            className='w-full'
                        >
                            Check Out
                        </Button>
                    </Item>
                </Box>
            </>
        </Box >
    )
}

export default React.memo(Cart)