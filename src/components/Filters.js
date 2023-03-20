import SearchIcon from '@mui/icons-material/Search';
import { Checkbox, InputAdornment, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { searchFilterFunction } from '../constant/CommonFunc';
import { SmallRadio } from '../constant/CustomUtils';

export default function Filters(props) {
    const [value, setValue] = useState('createdAt_desc');
    const [brand, setBrand] = useState({ id: '', checked: false });
    const [filteredBrand, setFilteredBrand] = useState([]);
    const [model, setModel] = useState({ id: '', checked: false });
    const [filteredModel, setFilteredModel] = useState([]);
    const brands = useSelector(({ eteration }) => eteration.brands)
    const productsData = useSelector(({ eteration }) => eteration.productsData)
    const models = useSelector(({ eteration }) => eteration.models)

    const handleChange = (event) => {
        setValue(event.target.value);
        const item = event.target.value.split('_')
        props.sort({ field: item[0], order: item[1] })
    };

    const handleChangeBrand = (event, item) => {
        setBrand({ id: item.id, checked: event.target.checked, name: item.brand });
        const nameBrand = event.target.checked ? item.brand : ''
        props.filterBrand({ field: 'brand', name: nameBrand })
    };

    const handleChangeModel = (event, item) => {
        setModel({ id: item.id, checked: event.target.checked });
        const nameModel = event.target.checked ? item.model : ''
        props.filterModal({ field: 'model', name: nameModel })
    };

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    useEffect(() => {
        Object.keys(brands || []).length > 0 && setFilteredBrand(brands)
    }, [brands])

    useEffect(() => {
        setFilteredModel(models)
    }, [models])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,

                },
            }}
        >
            <FormControl>
                <FormLabel>Sort By</FormLabel>
                <Paper elevation={3} className='p-2 md:w-[200px] md:h-[170px]  sm:w-[100px] sm:h-[100px]'>
                    <RadioGroup
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="createdAt_desc" control={<SmallRadio />} label="Old to new" />
                        <FormControlLabel value="createdAt_asc" control={<SmallRadio />} label="New to old" />
                        <FormControlLabel value="price_desc" control={<SmallRadio />} label="Price high to low" />
                        <FormControlLabel value="price_asc" control={<SmallRadio />} label="Price low to high" />
                    </RadioGroup>
                </Paper>
            </FormControl>
            <FormControl>
                <FormLabel>Brands</FormLabel>
                <Paper elevation={3} className='p-2 md:w-[200px] md:h-[170px]  sm:w-[100px] sm:h-[100px]'>

                    <div className='md:w-[200px] md:h-[30px]  sm:w-[100px] sm:h-[30px] contents p-2'>
                        <TextField
                            size='small'
                            data-testid='brand search'
                            placeholder="Search…"
                            onChange={(event) => {
                                setFilteredBrand(searchFilterFunction(event.target.value, 'brand', brands))
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div className='h-[100px] overflow-auto flex flex-col items-start'>
                        {filteredBrand.map((item) => {
                            return (
                                <FormControlLabel
                                    label={item.brand}
                                    labelPlacement="end"
                                    control={<Checkbox
                                        size='small'
                                        checked={brand.id === item.id && brand.checked}
                                        onChange={(event) => handleChangeBrand(event, item)}
                                    />} />
                            )
                        })}
                    </div>
                </Paper>
            </FormControl>
            <FormControl>
                <FormLabel>Model</FormLabel>
                <Paper elevation={3} className='p-2 md:w-[200px] md:h-[170px]  sm:w-[100px] sm:h-[100px]'>
                    <RadioGroup
                        value={model}
                        onChange={handleChangeModel}
                    >
                        <div className='md:w-[200px] md:h-[30px]  sm:w-[100px] sm:h-[30px] contents p-2'>
                            <TextField
                                size='small'
                                data-testid='model search'
                                placeholder="Search…"
                                onChange={(event) => {
                                    setFilteredModel(searchFilterFunction(event.target.value, 'model', getUniqueListBy(productsData, 'model')))
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className='h-[100px] overflow-auto flex flex-col'>
                            {filteredModel.map((item) => {
                                return (
                                    <FormControlLabel
                                        label={item.model}
                                        labelPlacement="end"
                                        control={<Checkbox
                                            size='small'
                                            checked={model.id === item.id && model.checked}
                                            onChange={(event) => handleChangeModel(event, item)}
                                        />} />
                                )
                            })}
                        </div>
                    </RadioGroup>
                </Paper>
            </FormControl>
        </Box>
    )
}