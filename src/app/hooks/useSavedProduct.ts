"use client";

import { useState, useEffect } from 'react';

export function useSavedProducts() {
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedProducts');
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    }
  }, []);

  const saveProduct = (product:any) => {
    const updatedSaved = [...savedProducts, product];
    setSavedProducts(updatedSaved);
    localStorage.setItem('savedProducts', JSON.stringify(updatedSaved));
  };

  const removeProduct = (productId:any) => {
    const updatedSaved = savedProducts.filter(p => p.id !== productId);
    setSavedProducts(updatedSaved);
    localStorage.setItem('savedProducts', JSON.stringify(updatedSaved));
  };

  const isProductSaved = (productId:any) => {
    return savedProducts.some(p => p.id === productId);
  };

  return { savedProducts, saveProduct, removeProduct, isProductSaved };
}