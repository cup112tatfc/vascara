import { useAppDispatch, useAppSelector } from 'app/hooks';
import { removeProductSearch } from 'app/productSlice/productSlice';
import { productSearchSelector } from 'app/selectors';
import Loading from 'components/loading/Loading';
import CardListProducts from 'components/product-card-list-products/CardListProducts';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface SearchPageProps {}

const SearchPage: React.FunctionComponent<SearchPageProps> = (props) => {
  const [col, setCol] = React.useState<string>('col-3');
  const [actItemFacet, setActItemFacet] = React.useState<number>(3);
  const dispatch = useAppDispatch();
  const productSearch = useAppSelector(productSearchSelector);

  React.useEffect(() => {
    return () => {
      dispatch(removeProductSearch([]));
    };
  }, [dispatch]);
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
      {Object.keys(productSearch).length === 0 ? (
        <Loading loadingBoolean={true} />
      ) : (
        <>
          <Loading loadingBoolean={false} />
          <div className="search-page">
            <div className="breadcrumb">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <ul>
                      <li>
                        <Link to="/">Trang chủ</Link>
                      </li>
                      <li>Tìm kiếm</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="top-list">
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
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="list-product">
                    {productSearch.map((valuePr, indexPr) => (
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

export default SearchPage;
