import { createContext, useContext, RefObject } from 'react';

// H-6: Shared ref context so Navbar can access HorizontalScroll's container
// without using fragile document.querySelector('.flex-nowrap')
export const ScrollRefContext = createContext<RefObject<HTMLDivElement | null>>({ current: null });
export const useScrollRef = () => useContext(ScrollRefContext);
