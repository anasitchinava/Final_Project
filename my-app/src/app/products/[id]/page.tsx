'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useAuthentication from '@/hooks/useAuthentication';

const ProductDetailsPage = () => {
    useAuthentication();

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProductDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            setIsFavorite(isProductInFavorites(product.id));
        }
    }, [product]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const isProductInFavorites = (productId) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.some(favorite => favorite.id === productId);
    };

    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeProductFromFavorites(product.id);
            setIsFavorite(false);
        } else {
            addProductToFavorites(product);
            setIsFavorite(true);
        }
    };

    const addProductToFavorites = (product) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const removeProductFromFavorites = (productId) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.filter(favorite => favorite.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <img src={product.image} alt={product.title} className="w-[250px] h-[250px] mb-4" />
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p className='font-bold'>Price: ${product.price}</p>
            <button onClick={handleToggleFavorite} className='hover:underline rounded-lg bg-stone-200'>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default ProductDetailsPage;