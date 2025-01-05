import homePageCss from "./homepage.module.css";
import Spinner from "react-spinner-material";
import { useDispatch } from "react-redux";
import Items from "../items/items";
import { useEffect, useState } from "react";
import itemData from "../../data/data";
import {
  getProductActions,
  getProductSelector,
} from "../../redux/productReducer/getProductReducer";
import { useSelector } from "react-redux";

function HomePage() {
  let dispatch = useDispatch();

  let { products } = useSelector(getProductSelector);
  let [priceRange, setPriceRange] = useState(10000);
  const [catFilter, setCatFilter] = useState([]);

  //initially spinner will be shown but after mounting of component spinner will be disabled
  let [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setIsloading(false);
    dispatch(getProductActions.getProduct(itemData));
  }, []);

  let priceRangeFilter = (price) => {
    setPriceRange(price);
  };

  useEffect(() => {
    let rangedProduct = itemData.filter((item) => item.price <= priceRange);
    dispatch(getProductActions.getProduct(rangedProduct));
  }, [priceRange]);

  function CategoryFilter(filterExp) {
    setCatFilter((prevCatFilter) => {
      //checking if filter expression is available remove it else add it filtering array
      const newFilter = prevCatFilter.includes(filterExp)
        ? prevCatFilter.filter((f) => f !== filterExp)
        : [...prevCatFilter, filterExp];
      return newFilter;
    });
  }

  useEffect(() => {
    const filteredData = itemData.filter((item) => {
      if (catFilter.includes(item.category)) {
        return item;
      }
    });

    dispatch(getProductActions.getProduct(filteredData));

    //if nothing is in newFilter set data to allData available
    if (catFilter.length === 0) {
      dispatch(getProductActions.getProduct(itemData));
    }
  }, [catFilter]);

  let textSearch = (text) => {
    //lowerCase all text
    let searchText = text.toLowerCase();

    let FilterdArray = [];
    itemData.forEach((item) => {
      //lowercase description and split to array of string after whte space
      let splitDescription = item.description.toLowerCase().split(" ");

      //filter  searchText from splitDescription
      let Matches = splitDescription.filter((word) => word === searchText);

      //if we get data from filter push all item in filteredArray
      if (Matches.length > 0) {
        FilterdArray.push({ ...item });
      }
    });

    // set filtered array to setData so that rerendering can be done
    dispatch(getProductActions.getProduct(FilterdArray));

    //if search is empty set Data to allItems
    if (text === "") {
      dispatch(getProductActions.getProduct(itemData));
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={homePageCss.spinnerContainer}>
          <Spinner radius={120} color={"#333"} stroke={5} visible={true} />
        </div>
      ) : (
        <div className={homePageCss.mainContainer}>
          <aside className={homePageCss.filteraside}>
            <h2>Filter</h2>
            <div className={homePageCss.filterdiv}>
              <div className={homePageCss.priceinput}>
                <label>Price {priceRange}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  className={homePageCss.range}
                  value={priceRange}
                  onChange={(e) => priceRangeFilter(e.target.value)}
                />
              </div>
              <div className={homePageCss.catDiv}>
                <h2>Category</h2>
              </div>

              <div className={homePageCss.checkDiv}>
                <input
                  type="checkbox"
                  id="Electronics"
                  name="Electronics"
                  value="Electronics"
                  className={homePageCss.checkbox}
                  onClick={(e) => CategoryFilter(e.target.value)}
                />
                <label htmlFor="Electronics">Electronics</label>
              </div>
              <div className={homePageCss.checkDiv}>
                <input
                  type="checkbox"
                  id="Accessories"
                  name="Accessories"
                  value="Accessories"
                  className={homePageCss.checkbox}
                  onClick={(e) => CategoryFilter(e.target.value)}
                />
                <label htmlFor="Accessories">Accessories</label>
              </div>
              <div className={homePageCss.checkDiv}>
                <input
                  type="checkbox"
                  id="Footwear"
                  name="Footwear"
                  value="Footwear"
                  className={homePageCss.checkbox}
                  onClick={(e) => CategoryFilter(e.target.value)}
                />
                <label htmlFor="Footwear">Footwear</label>
              </div>
              <div className={homePageCss.checkDiv}>
                <input
                  type="checkbox"
                  id="Home Appliances"
                  name="Home Appliances"
                  value="Home Appliances"
                  className={homePageCss.checkbox}
                  onClick={(e) => CategoryFilter(e.target.value)}
                />
                <label htmlFor="Home Appliances">Home Appliances</label>
              </div>
              <div className={homePageCss.checkDiv}>
                <input
                  type="checkbox"
                  id="Fashion"
                  name="Fashion"
                  value="Fashion"
                  className={homePageCss.checkbox}
                  onClick={(e) => CategoryFilter(e.target.value)}
                />
                <label htmlFor="Fashion">Fashion</label>
              </div>

              <div className={homePageCss.checkDiv}>
                <input
                  type="checkbox"
                  id="Sports"
                  name="Sports"
                  value="Sports"
                  className={homePageCss.checkbox}
                  onClick={(e) => CategoryFilter(e.target.value)}
                />
                <label htmlFor="Sports">Sports</label>
              </div>
            </div>
          </aside>

          <form className={homePageCss.searchForm}>
            <input
              className={homePageCss.searchInput}
              type="search"
              placeholder="Search By Name"
              onChange={(e) => {
                textSearch(e.target.value);
              }}
            />
          </form>
          <div className={homePageCss.itemDiv}>
            {products.map((product, index) => (
              <Items key={index} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
