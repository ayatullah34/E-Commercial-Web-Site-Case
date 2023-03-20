

import { Box, Radio, Skeleton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SmallRadio = styled(Radio)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fontSize: 18,
    },
}));

const SkeletonImg = ()=> {
    return (
        <div className='flex flex-col'>
            <Skeleton variant="rectangular" width={{ md: 140, sm: 100 }} height={140} />
            <Box sx={{ pt: 0.5 }}>
                <Skeleton width="60%" />
                <Skeleton width="80%" />
            </Box>
        </div>
    )
}

export {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    SmallRadio,
    SkeletonImg
};
