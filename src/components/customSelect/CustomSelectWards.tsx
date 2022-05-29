import * as React from 'react';
import { Ward } from 'types/type.address';
import useOutsideClick from 'utils/customHooks/useOutsideClick';
import './CustomSelect.scss';
interface CustomSlecterProps {
  dataWards: Ward[];
  passValue: (e: Ward) => void;
}

const CustomSelectWards: React.FunctionComponent<CustomSlecterProps> = (props) => {
  const [data, setData] = React.useState<Ward[]>([] as Ward[]);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selected, setSelected] = React.useState<number>(0);

  const [text, setText] = React.useState<string>('-- Chọn Phường / Xã --');

  const selectRef = React.useRef<any>(null);
  useOutsideClick(selectRef, null, () => {
    setToggle(false);
  });

  React.useEffect(() => {
    setData(props.dataWards);
    setText('-- Chọn Phường / Xã --');
  }, [props.dataWards]);

  React.useEffect(() => {
    const newArr = data.filter((item) => item.name.toLocaleLowerCase().includes(searchValue));
    setData(newArr);
  }, [searchValue]);

  return (
    <span className="select2" style={{ width: '100%' }} ref={selectRef}>
      <span className={toggle ? 'selection selection-active' : 'selection'}>
        <span
          className="select2-selection select2-selection--single "
          onClick={() => setToggle(!toggle)}
        >
          <span
            className="select2-selection__rendered"
            role="textbox"
            title="-- Chọn Tỉnh / Thành phố --"
          >
            {text}
          </span>
          <span className="select2-selection__arrow">
            <b role="presentation"></b>
          </span>
        </span>
        <span className="select2-container">
          <span className="select2-dropdown">
            <span className="select2-search select2-search--dropdown">
              <input
                className="select2-search__field"
                role="searchbox"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </span>
            <span className="select2-results">
              <ul className="select2-results__options">
                {data && data.length > 0 ? (
                  data.map((value, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelected(Number(value.id));
                        props.passValue(value)
                        setToggle(!toggle);
                        setText(`${value.prefix} ${value.name}`);
                      }}
                      className={
                        selected === Number(value.id)
                          ? 'select2-results__option selected'
                          : 'select2-results__option'
                      }
                    >
                      {value.prefix} {value.name}
                    </li>
                  ))
                ) : (
                  <li className="select2-results__option"> Không có dữ liệu được tìm thấy</li>
                )}
              </ul>
            </span>
          </span>
        </span>
      </span>
      <span className="dropdown-wrapper" aria-hidden="true"></span>
    </span>
  );
};

export default CustomSelectWards;
