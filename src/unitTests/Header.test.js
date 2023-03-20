import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import { store } from "../redux/store";
import { getProducts } from '../redux/eterationSlice';

test('Header renders correctly', async () => {
    render(<Provider store={store}><Header /></Provider>)
    const search = screen.getByPlaceholderText(/^Search/i);
    expect(search).toBeInTheDocument();

    const eterationText = screen.getByText(/^Eteration/i);
    expect(eterationText).toBeInTheDocument();

    const userText = screen.getByTestId(/^user text/i);
    expect(userText).toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'Nissan' } })

    expect(search.value).toBe('Nissan')

})