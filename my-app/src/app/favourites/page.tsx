'use client';
import ProductList from '@/components/products/ProductList';
import useAuthentication from '@/hooks/useAuthentication';
import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
    useAuthentication();
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        setIsLoading(false);
    }, []);

    const handleRemoveFavorite = (productId) => {
        const confirmed = window.confirm('Are you sure you want to remove this product from favorites?');
        if (confirmed) {
            const updatedFavorites = favorites.filter(product => product.id !== productId);
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold">Favourites</h2>
            {favorites.length === 0 ? (
                <p>No favourites added yet.</p>
            ) : (
                <>
                    <ProductList products={favorites} />
                    <div className="mt-4">
                        {favorites.map(product => (
                            <div key={product.id} className="flex items-center space-between">
                                <button
                                    onClick={() => handleRemoveFavorite(product.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4 mt-2"
                                >
                                    Remove
                                </button>
                                <p className="text-gray-600">{product.title}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FavoritesPage;