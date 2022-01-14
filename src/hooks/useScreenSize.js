import { useState, useEffect } from 'react';

export default function useScreenSize() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return (() =>{
      window.removeEventListener('resize', updateWidth);
    })
  }, [width])

  return width;
}