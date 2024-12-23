import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Article } from '../types';
import { mockArticles } from '../mocks/data';

interface CartContextType {
  items: Article[];
  addItem: (article: Article) => void;
  removeItem: (articleId: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rapidlivre-cart';

export function CartProvider({ children }: {readonly children: ReactNode }) {
  // Utiliser les 5 premiers articles de mockArticles
  const [items, setItems] = useState<Article[]>(mockArticles.slice(0, 5));

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage when it changes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (article: Article) => {
    setItems(prev => {
      if (!prev.some(item => item.id === article.id)) {
        return [...prev, article];
      }
      return prev;
    });
  };

  const removeItem = (articleId: number) => {
    setItems(prev => prev.filter(item => item.id !== articleId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => items.length;

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    clearCart,
    getItemCount
  }), [items]); // Dépend uniquement de items car les fonctions sont stables

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
