'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/search/SearchBar';
import ProductList from '@/components/products/ProductList';
import LoadMoreButton from '@/components/button/LoadMoreButton';
import { useRouter } from 'next/navigation';
import useAuthentication from '@/hooks/useAuthentication';

const ProductsPage = () => {
  useAuthentication();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchValue(storedSearchTerm);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchValue);

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchValue, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products?start=${products.length}&limit=20`);
      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, ...data]);
    } catch (error) {
      console.error('Error fetching more products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      router.push(`/home?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <ProductList products={filteredProducts} />
      <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />
    </div>
  );
};

export default ProductsPage;