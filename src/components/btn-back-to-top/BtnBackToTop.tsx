import './BtnBackToTop.scss';
import * as React from 'react';

export default function BtnBackToTop() {
  const [showBtn, setShowBtn] = React.useState<boolean>(false);

  const handleToTop: () => void = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  React.useEffect(() => {
    const handleScroll: () => void = () => {
      if (window.scrollY >= 450) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });
  return <button onClick={handleToTop} className={showBtn ? 'btn-back-to-top ative-btn' : 'btn-back-to-top'}></button>;
}
