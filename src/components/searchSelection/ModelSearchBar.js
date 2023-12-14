import React from 'react';
import './SearchBar.css';
import { useStateContext } from '../../ContextProvider';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const ModelSearchBar = ({ placeholder, data }) => {
  const { filteredDataModel, setFilteredDataModel, setWordEnteredModel } =
    useStateContext();

  const clearInputModel = () => {
    setFilteredDataModel([]);
    setWordEnteredModel('');
  };

  return (
    <div className="search">
      <div className="searchInput">
        <input typeof="text" placeholder={placeholder} />
        <div className="searchIcon">
          {filteredDataModel.length === 0 ? (
            <BiSearchAlt className="search-close" />
          ) : (
            <AiOutlineClose
              className="search-close"
              id="clearBtn"
              onClick={clearInputModel}
            />
          )}
        </div>
      </div>

      {filteredDataModel.length !== 0 && (
        <div className="dataResult">
          {filteredDataModel.slice(0, 10).map((value, key) => {
            return (
              <a
                className="dataItem"
                href={value.link}
                target="_blank"
                rel="noreferrer"
              >
                <p>{value.model}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModelSearchBar;
