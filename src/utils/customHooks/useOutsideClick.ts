import * as React from 'react';

const useOutsideClick = (
  ref: any,
  tockchaned: number | null | undefined,
  onOutSideClick: (...args: any) => void
) => {
  React.useEffect(() => {
    
    function handleClickOutSide(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutSideClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [ref, tockchaned]);
};

export default useOutsideClick;
