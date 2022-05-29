import * as React from 'react';
import { Ward } from 'types/type.address';
import useOutsideClick from 'utils/customHooks/useOutsideClick';
import './CustomSelect.scss';
interface CustomSlecterProps {}
interface ItemCode {
  id: number;
  name: string;
}

const CustomSelectCode: React.FunctionComponent<CustomSlecterProps> = (props) => {
  const inititalValue: ItemCode[] = [
    { id: 1, name: 'Chọn quà cung cấp mã giảm giá' },
    { id: 2, name: 'Gift card Vascara' },
    { id: 3, name: 'Got it' },
    { id: 4, name: 'UrBox' },
  ];
  const [data, setData] = React.useState<ItemCode[]>(inititalValue);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<number>(0);

  const [text, setText] = React.useState<string>('Chọn nhà cung cấp mã giảm giá');
  const selectRef = React.useRef<any>(null);
  useOutsideClick(selectRef, null, () => {
    setToggle(false);
  });

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
            <span className="select2-results">
              <ul className="select2-results__options">
                {data &&
                  data.map((value, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelected(Number(value.id));

                        setToggle(!toggle);
                        setText(value.name);
                      }}
                      className={
                        selected === Number(value.id)
                          ? 'select2-results__option selected'
                          : 'select2-results__option'
                      }
                    >
                      {value.name}
                    </li>
                  ))}
              </ul>
            </span>
          </span>
        </span>
      </span>
      <span className="dropdown-wrapper" aria-hidden="true"></span>
    </span>
  );
};

export default CustomSelectCode;
