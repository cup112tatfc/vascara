import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchAsyncListProducts, removeListProducts } from 'app/productSlice/productSlice';
import { productsOfCateSelector, productsOfCateRemainingSelector } from 'app/selectors';
import './ListProducts.scss';
import Loading from 'components/loading/Loading';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FilterWrap from 'components/filter-wrap/FilterWrap';
import CardListProducts from 'components/product-card-list-products/CardListProducts';

interface ListProductsProps {}

const ListProducts: React.FunctionComponent<ListProductsProps> = (props) => {
  const { nameListProducts } = useParams<string>();
  const dispatch = useAppDispatch();
  const listProduct = useAppSelector(productsOfCateSelector);
  const listafterFilter = useAppSelector(productsOfCateRemainingSelector);
  const [col, setCol] = React.useState<string>('col-3');
  const [actItemFacet, setActItemFacet] = React.useState<number>(3);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  let idCate: number;

  const pathCategory: () => void = () => {
    if (nameListProducts === 'giay') {
      idCate = 1;
    } else if (nameListProducts === 'tui-xach') {
      idCate = 2;
    } else if (nameListProducts === 'balo') {
      idCate = 3;
    } else if (nameListProducts === 'phu-kien') {
      idCate = 5;
    } else {
      return idCate;
    }
    return idCate;
  };

  React.useEffect(() => {
    dispatch(fetchAsyncListProducts(idCate));

    return () => {
      dispatch(removeListProducts([]));
    };
  }, [dispatch, nameListProducts]);
  pathCategory();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setActItemFacet(1);
        setCol('col-1');
      } else if (window.innerWidth <= 991) {
        setActItemFacet(2);
        setCol('col-2');
      } else {
        setActItemFacet(3);
        setCol('col-3');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {Object.keys(listProduct).length === 0 ? (
        <Loading loadingBoolean={true} />
      ) : (
        <>
          <Loading loadingBoolean={false} />
          <div className="page-content">
            <div className="breadcrumb">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>
                        <Link to={'/'}>Trang chủ</Link>
                      </li>
                      <li>
                        {nameListProducts === 'giay'
                          ? 'Giày'
                          : nameListProducts === 'tui-xach'
                          ? 'Túi xách'
                          : nameListProducts === 'balo'
                          ? 'Ba lô'
                          : nameListProducts === 'phu-kien'
                          ? 'Phụ kiện'
                          : ''}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="top-list">
                    <div
                      className="filter filter-pc"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      <div className="show-filter show-filter-pc">Bộ lọc</div>
                      <FilterWrap
                        nameSelect={nameListProducts}
                        booleanOpen={isOpen}
                        handleToggle={(isOpen) => setIsOpen(isOpen)}
                      />
                    </div>
                    <div className="filter filter-mobi">
                      <button
                        className="show-filter show-filter-mobi"
                        onClick={() => setIsOpen(true)}
                      >
                        Bộ lọc
                      </button>
                      <FilterWrap
                        nameSelect={nameListProducts}
                        booleanOpen={isOpen}
                        handleToggle={(isOpen) => setIsOpen(isOpen)}
                      />
                    </div>

                    <div className="facet">
                      <div className="title-facet">
                        <span>Tuỳ chọn sắp xếp sản phẩm</span>
                      </div>
                      <div className="switch-facet">
                        <button
                          className={
                            actItemFacet === 1 ? 'item-facet col1 active-col' : 'item-facet col1'
                          }
                          onClick={() => {
                            setCol('col-1');
                            setActItemFacet(1);
                          }}
                        >
                          <span className="line-col"></span>
                        </button>
                        <button
                          className={
                            actItemFacet === 2 ? 'item-facet col2  active-col' : 'item-facet col2'
                          }
                          onClick={() => {
                            setCol('col-2');
                            setActItemFacet(2);
                          }}
                        >
                          <span className="line-col"></span>
                          <span className="line-col"></span>
                        </button>
                        <button
                          className={
                            actItemFacet === 3 ? 'item-facet col3 active-col' : 'item-facet col3'
                          }
                          onClick={() => {
                            setCol('col-3');
                            setActItemFacet(3);
                          }}
                        >
                          <span className="line-col"></span>
                          <span className="line-col"></span>
                          <span className="line-col"></span>
                        </button>
                        <button
                          className={
                            actItemFacet === 4 ? 'item-facet col4 active-col' : 'item-facet col4'
                          }
                          onClick={() => {
                            setCol('col-4');
                            setActItemFacet(4);
                          }}
                        >
                          <span className="line-col"></span>
                          <span className="line-col"></span>
                          <span className="line-col"></span>
                          <span className="line-col"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <ListingProduct
              ArrayProduct={listafterFilter}
              booleanSlide={false}
              btnViewAll={false}
            /> */}
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="list-product">
                    {listafterFilter.map((valuePr, indexPr) => (
                      <CardListProducts key={indexPr} Product={valuePr} setCol={col} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListProducts;
