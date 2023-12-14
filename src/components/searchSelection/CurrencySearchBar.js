import React from 'react';
import './SearchBar.css';
import { useStateContext } from '../../ContextProvider';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const CurrencySearchBar = ({ placeholder, data }) => {
  const { filteredData, setFilteredData, setWordEntered } = useStateContext();

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  return (
    <div className="search">
      <div className="searchInput">
        <input typeof="text" placeholder={placeholder} />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <BiSearchAlt className="search-close" />
          ) : (
            <AiOutlineClose
              className="search-close"
              id="clearBtn"
              onClick={clearInput}
            />
          )}
        </div>
      </div>

      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <a
                className="dataItem"
                href={value.link}
                target="_blank"
                rel="noreferrer"
              >
                <p>{value.currency}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencySearchBar;
