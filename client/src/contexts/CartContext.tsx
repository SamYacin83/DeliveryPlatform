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
  // Initialiser avec un tableau vide
  const [items, setItems] = useState<Article[]>([]);

  useEffect(() => {
    // Charger le panier depuis localStorage au montage
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder le panier dans localStorage quand il change
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (article: Article) => {
    setItems(prev => {
      // Vérifier si l'article existe déjà
      const existingItem = prev.find(item => item.id === article.id);
      
      if (existingItem) {
        // Si l'article existe, mettre à jour la quantité
        return prev.map(item => 
          item.id === article.id 
            ? { ...item, quantity: (item.quantity || 1) + (article.quantity || 1) }
            : item
        );
      }
      
      // Si l'article n'existe pas, l'ajouter au panier
      return [...prev, { ...article, quantity: article.quantity || 1 }];
    });
  };

  const removeItem = (articleId: number) => {
    setItems(prev => prev.filter(item => item.id !== articleId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => items.reduce((total, item) => total + (item.quantity || 1), 0);

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    clearCart,
    getItemCount,
  }), [items]);

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
