"use client";

import { useState, useEffect } from 'react';

export function useSavedProducts() {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedProducts');
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    }
  }, []);

  const saveProduct = (product) => {
    const updatedSaved = [...savedProducts, product];
    setSavedProducts(updatedSaved);
    localStorage.setItem('savedProducts', JSON.stringify(updatedSaved));
  };

  const removeProduct = (productId) => {
    const updatedSaved = savedProducts.filter(p => p.id !== productId);
    setSavedProducts(updatedSaved);
    localStorage.setItem('savedProducts', JSON.stringify(updatedSaved));
  };

  const isProductSaved = (productId) => {
    return savedProducts.some(p => p.id === productId);
  };

  return { savedProducts, saveProduct, removeProduct, isProductSaved };
}