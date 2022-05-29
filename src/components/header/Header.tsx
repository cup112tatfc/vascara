import * as React from 'react';
import './Header.scss';
import HeaderTop from './header-top/HeaderTop';
import Menu from './menu/Menu';
import MenuMobi from './menu-mobi/MenuMobi';
import BoxSearchMobi from 'components/box-search-mobi/BoxSearchMobi';


const Header: React.FunctionComponent = () => {
  const [toggleSearch,setToggleSearch] = React.useState<boolean>(false);
  return (
    <div className="header">
      <HeaderTop handleOpenSearch = {(toggleSearch) => setToggleSearch(toggleSearch)}/>
      <Menu/>
      <MenuMobi/>
      <BoxSearchMobi toggle={toggleSearch} handleCloseSearch={(toggleSearch) => setToggleSearch(toggleSearch)}/>
    </div>
  );
};

export default Header;
