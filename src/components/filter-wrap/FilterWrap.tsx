import * as React from 'react';
import './FilterWrap.scss';
import {
  PriceFilters,
  HeelStyle,
  KeyType,
  ColorFilters,
  ToeStyle,
  StrapType,
} from 'list-filter/filters';
import { PriceType } from '../../types/type.elementFiters';
import { selectList } from 'utils/selectElementFilters/SelectElementFilters';
import { useAppDispatch } from 'app/hooks';
import { getAllFilterChange } from 'app/FiltersSlice/filtersSlice';

interface FilterWrapProps {
  nameSelect: string | undefined;
  booleanOpen: boolean;
  handleToggle: (value: boolean) => void;
}

const FilterWrap: React.FunctionComponent<FilterWrapProps> = (props) => {
  const [priceOb, setPriceOb] = React.useState<PriceType>({} as PriceType);
  const [colors, setColors] = React.useState<Array<string>>([]);
  const [heelStyles, setHeelStyles] = React.useState<Array<string>>([]); // got giay
  const [toeStyles, setToeStyles] = React.useState<Array<string>>([]); // mui giay
  const [strapTypes, setStrapTypes] = React.useState<Array<string>>([]); // loai day deo
  const [lockTypes, setLockType] = React.useState<Array<string>>([]);
  const [arrShowFilter, setArrShowFilter] = React.useState<Array<string>>([]);

  const dispatch = useAppDispatch();
  const handlePriceChange = (e: PriceType) =>
    priceOb.id === e.id ? setPriceOb({} as PriceType) : setPriceOb(e);

  const handleFiltersChange = () => {
    dispatch(
      getAllFilterChange({
        prices: Object.keys(priceOb).length === 0 ? [] : priceOb.arr_price,
        colors: colors,
        heelStyles: heelStyles,
        toeStyles: toeStyles,
        strapTypes: strapTypes,
        lockTypes: lockTypes,
      })
    );
    props.handleToggle(false);
    setArrShowFilter([]);
  };

  const handleToggleShowFilter = (e: string) => {
    if (arrShowFilter.includes(e)) {
      const newFils = arrShowFilter.filter((nameFil) => nameFil !== e);
      setArrShowFilter(newFils);
    } else {
      const newFils = [...arrShowFilter];
      newFils.push(e);
      setArrShowFilter(newFils);
    }
  };
  const handleResetFilter = () => {
    setPriceOb({} as PriceType);
    setColors([]);
    setHeelStyles([]);
    setToeStyles([]);
    setStrapTypes([]);
    setLockType([]);
    setArrShowFilter([]);
    dispatch(
      getAllFilterChange({
        prices: [],
        colors: [],
        heelStyles: [],
        toeStyles: [],
        strapTypes: [],
        lockTypes: [],
      })
    );
  };

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(
  //       getAllFilterChange({
  //         prices: [],
  //         colors: [],
  //         heelStyles: [],
  //         toeStyles: [],
  //         strapTypes: [],
  //         lockTypes: [],
  //       })
  //     );
  //   };
  // }, [dispatch]);
  return (
    <div className={props.booleanOpen ? 'content-filter' : 'content-filter no-active'}>
      <div className="title-filter">
        Bộ lọc
        <span className="close-filter" onClick={() => props.handleToggle(false)}></span>
      </div>
      <div className="filter-wrap">
        <div className="list-attr">
          <div className="group-filter viewtype filter-price" data-name="price">
            <div
              className={arrShowFilter.includes('prices') ? 'title title-after' : 'title'}
              onClick={() => handleToggleShowFilter('prices')}
            >
              Giá<span></span>
            </div>
            <div
              className={arrShowFilter.includes('prices') ? 'list-item filter-active' : 'list-item'}
            >
              <ul>
                {PriceFilters.map((value) => (
                  <li
                    className="item-filter"
                    key={value.id}
                    onClick={() => handlePriceChange(value)}
                  >
                    <button className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input filter-item"
                        checked={priceOb.id === value.id ? true : false}
                      />
                      <label className="form-check-label">{value.name} </label>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {props.nameSelect === 'phu-kien' || (
            <div className="group-filter viewtype group-color" data-name="color">
              <div
                className={arrShowFilter.includes('colors') ? 'title title-after' : 'title'}
                onClick={() => handleToggleShowFilter('colors')}
              >
                Màu Sắc<span></span>
              </div>
              <div
                className={
                  arrShowFilter.includes('colors') ? 'list-item filter-active' : 'list-item'
                }
              >
                <ul>
                  {ColorFilters.length &&
                    ColorFilters.map((valueItem) => (
                      <li className="item-filter style2" key={valueItem.id}>
                        <button className="form-check">
                          <input
                            id="color13"
                            type="checkbox"
                            value={valueItem.nameColor}
                            className="form-check-input filter-item"
                            onChange={() => selectList(valueItem.nameColor, colors, setColors)}
                            checked={colors.includes(valueItem.nameColor)}
                          />
                          <label className="form-check-label">
                            <span
                              style={{ backgroundColor: `${valueItem.link}` }}
                              className="thuml-img"
                            />
                            {valueItem.name}
                          </label>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {props.nameSelect === 'giay' && (
            <div className="group-filter viewtype style001" data-name="kieu-got">
              <div
                className={arrShowFilter.includes('heelStyles') ? 'title title-after' : 'title'}
                onClick={() => handleToggleShowFilter('heelStyles')}
              >
                Kiểu gót<span></span>
              </div>
              <div
                className={
                  arrShowFilter.includes('heelStyles') ? 'list-item filter-active' : 'list-item'
                }
              >
                <ul>
                  {HeelStyle.map((valueItem) => (
                    <li className="item-filter" key={valueItem.id}>
                      <button className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input filter-item"
                          value={valueItem.pass_value}
                          onChange={() =>
                            selectList(valueItem.pass_value, heelStyles, setHeelStyles)
                          }
                          checked={heelStyles.includes(valueItem.pass_value)}
                        />
                        <label className="form-check-label">
                          <span className="thuml-img"></span>
                          {valueItem.name}
                        </label>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {props.nameSelect === 'giay' && (
            <div className="group-filter viewtype style001" data-name="kieu-mui-giay">
              <div
                className={arrShowFilter.includes('toeStyles') ? 'title title-after' : 'title'}
                onClick={() => handleToggleShowFilter('toeStyles')}
              >
                Kiểu mũi giày<span></span>
              </div>
              <div
                className={
                  arrShowFilter.includes('toeStyles') ? 'list-item filter-active' : 'list-item'
                }
              >
                <ul>
                  {ToeStyle.map((valueItem) => (
                    <li className="item-filter" key={valueItem.id}>
                      <button className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input filter-item"
                          value={valueItem.pass_value}
                          onChange={() => selectList(valueItem.pass_value, toeStyles, setToeStyles)}
                          checked={toeStyles.includes(valueItem.pass_value)}
                        />
                        <label className="form-check-label">
                          <span className="thuml-img"></span>
                          {valueItem.name}
                        </label>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {(props.nameSelect === 'tui-xach' || props.nameSelect === 'balo') && (
            <div className="group-filter viewtype style001" data-name="kieu-got">
              <div
                className={arrShowFilter.includes('strapTypes') ? 'title title-after' : 'title'}
                onClick={() => handleToggleShowFilter('strapTypes')}
              >
                loại dây đeo<span></span>
              </div>
              <div
                className={
                  arrShowFilter.includes('strapTypes') ? 'list-item filter-active' : 'list-item'
                }
              >
                <ul>
                  {StrapType.map((valueItem) => (
                    <li className="item-filter" key={valueItem.id}>
                      <button className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input filter-item"
                          value={valueItem.pass_value}
                          onChange={() =>
                            selectList(valueItem.pass_value, strapTypes, setStrapTypes)
                          }
                          checked={strapTypes.includes(valueItem.pass_value)}
                        />
                        <label className="form-check-label">
                          <span className="thuml-img"></span>
                          {valueItem.name}
                        </label>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {(props.nameSelect === 'tui-xach' || props.nameSelect === 'balo') && (
            <div className="group-filter viewtype style001" data-name="kieu-mui-giay">
              <div
                className={arrShowFilter.includes('lockTypes') ? 'title title-after' : 'title'}
                onClick={() => handleToggleShowFilter('lockTypes')}
              >
                Kiểu khóa<span></span>
              </div>
              <div
                className={
                  arrShowFilter.includes('lockTypes') ? 'list-item filter-active' : 'list-item'
                }
              >
                <ul>
                  {KeyType.map((valueItem) => (
                    <li className="item-filter" key={valueItem.id}>
                      <button className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input filter-item"
                          value={valueItem.pass_value}
                          onChange={() => selectList(valueItem.pass_value, lockTypes, setLockType)}
                          checked={lockTypes.includes(valueItem.pass_value)}
                        />
                        <label className="form-check-label">
                          <span className="thuml-img"></span>
                          {valueItem.name}
                        </label>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="action-filter">
          <button className="submit" onClick={handleFiltersChange}>
            <span>Hoàn tất</span>
          </button>
          <button
            className="clear-all"
            onClick={() => {
              props.handleToggle(false);
              handleResetFilter();
            }}
          >
            <span>Bỏ chọn</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterWrap;
