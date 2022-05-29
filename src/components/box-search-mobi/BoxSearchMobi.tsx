import * as React from 'react';
import './BoxSearchMobi.scss';
import IconClose from '../../images/close1.png';

export interface SearchProps {
  toggle: boolean;
  handleCloseSearch: (value: boolean) => void;
}
const BoxSearchMobi: React.FunctionComponent<SearchProps> = (props) => {
  return (
    <div className={props.toggle ? 'search-wrap-mobi active' : 'search-wrap-mobi '}>
      <div className="ct-search">
        <div className="close disn" onClick={() => props.handleCloseSearch(false)}>
          <img src={IconClose} alt="" />
        </div>
        <form className="search-form disn">
          <input type="text" placeholder="Tìm kiếm ..." className="search_input" />
        </form>
      </div>
    </div>
  );
};

export default BoxSearchMobi;
