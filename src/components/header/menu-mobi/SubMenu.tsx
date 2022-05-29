import * as React from 'react';
import './MenuMobi.scss';
import { ItemMenu } from '../data-menu';
import { Link } from 'react-router-dom';
import IconPlus from '../../../images/plus-b.png';
import IconDisc from '../../../images/disc-b.png';
import { useAppSelector } from 'app/hooks';
import { useAppDispatch } from 'app/hooks';
import { toggleMenuRes } from 'app/toggleSlice/toggleSlice';
import { menuToggleResSelector } from 'app/selectors';
interface DataProps {
  data: ItemMenu;
}

const SubMenuMobi: React.FunctionComponent<DataProps> = (props) => {
  const item = props.data;
  const dispatch = useAppDispatch();
  const toggle = useAppSelector(menuToggleResSelector);
  const [subnav, setSubnav] = React.useState<boolean>(false);
  const handleShowSubnav: () => void = () => setSubnav(!subnav);
  const handleClick: () => void = () => {
    dispatch(toggleMenuRes(false));
  };
  React.useEffect(() => {
    return () => {
      setSubnav(false);
    };
  }, [toggle]);
  return (
    <>
      <li className="menu-mobi_item" onClick={item.subMenu && handleShowSubnav}>
        <Link to="#" className="menu-mobi_link">
          {item.name}
        </Link>
        <div className="btn">
          <i className="icon">
            <img src={item.choseSub && subnav ? IconDisc : item.choseSub ? IconPlus : ''} alt="" />
          </i>
        </div>
      </li>
      {subnav && (
        <ul className=" menu-mobi_sub">
          {item.subMenu?.map((itemsub) => {
            return (
              <li key={itemsub.id}>
                <Link to={itemsub.link} className="menu-mobi_link" onClick={handleClick}>
                  {itemsub.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SubMenuMobi;
