
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import { store } from "../redux/store";

test('Home renders correctly', async () => {
    render(<Provider store={store}><Home /></Provider>)
    const searchBrand =screen.getByTestId(/^brand search/i);
    expect(searchBrand).toBeInTheDocument();

    const searchModel = screen.getByTestId(/^model search/i);
    expect(searchModel).toBeInTheDocument();
})