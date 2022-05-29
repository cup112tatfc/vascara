import Prev from '../../images/prev.png';
import Next from '../../images/next.png';

export function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', zIndex: 100 }}
        onClick={onClick}
      >
        <img src={Next} alt="" className="img-next" />
      </div>
    );
  }
  
export function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', zIndex: 100 }}
        onClick={onClick}
      >
        <img src={Prev} alt="" className="img-prev" />
      </div>
    );
  }