import * as React from 'react';
import './Menu.scss';
import { ListMenu } from '../data-menu';
import { Link } from 'react-router-dom';


const Menu: React.FunctionComponent = () => {

  const [showMenu,setShowMenu] = React.useState<boolean>(false);

  React.useEffect (()=>{
    const handleMenu : () => void = () =>{
      if(window.scrollY >=140){
        setShowMenu(true)
      }
      else{
        setShowMenu(false)
      }
    }
    window.addEventListener('scroll',handleMenu);

    return () =>{
      window.removeEventListener('scroll',handleMenu);
    }
  },[])
  return (
    <div className={showMenu ? "menu action" : "menu"}>
      <div className="hero-menu">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="main-menu">
                <ul className="main-menu_list">
                  {ListMenu.map((item) => (
                    <li key={item.id} className="main-menu_item">
                      <Link to={`/${item.link}`} className="main-link link">
                        {item.name}
                      </Link>
                      {item.choseSub && (
                        <ul className="sub-menu">
                          {item.subMenu?.map((itemsub) => (
                            <li key={itemsub.id}>
                              <Link to={itemsub.link} className="main-link">
                                {itemsub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
