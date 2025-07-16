// context/SignInContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SignInContextType {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  handleClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SignInContext = createContext<SignInContextType | null>(null);

export const SignInProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen(prev => !prev);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <SignInContext.Provider
      value={{ isOpen, setOpen, toggle, modalRef, handleClickOutside }}
    >
      {children}
    </SignInContext.Provider>
  );
};

export const useSignIn = () => {
  const context = useContext(SignInContext);
  if (!context) throw new Error('useSignIn must be used within SignInProvider');
  return context;
};
