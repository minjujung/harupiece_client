import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MainCreators as searchActions } from "../redux/modules/main";

function SearchChallenge(props) {
  console.log(props.match.params.searchWords);
  const keyWord = props.match.params.searchWords;
  const dispatch = useDispatch();
  //   const [error, setError] = useState(null);
  //   const [isLoaded, setIsloaded] = useState(false);
  //   const [items, setItems] = useState([]);

  React.useEffect(() => {
    dispatch(searchActions.searchDB(keyWord));
  }, []);

  const searchList = useSelector((state) => state.main.search);
  console.log(searchList);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["categoryName", "challengeTitle"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  function search(searchList) {
    return searchList.filter((searchLists) => {
      if (searchLists.categoryName === filterParam) {
        console.log(searchLists.categoryName);
        console.log(filterParam);
        return searchParam.some((newList) => {
          return (
            searchLists[newList]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newList) => {
          return (
            searchLists[newList]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  return (
    <Container>
      <label htmlFor="search-form">
        <input
          type="search"
          id="search-form"
          placeholder="Search for..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>

      <div>
        <select onChange={(e) => setFilterParam(e.target.value)}>
          <option value="All">Filter By Category</option>
          <option value="EXERCISE">EXERCISE</option>
          <option value="LIVINGHABITS">LIVINGHABITS</option>
          <option value="NODRINKNOSMOKE">NODRINKNOSMOKE</option>
        </select>
      </div>

      <BoxContainer>
        {searchList &&
          search(searchList).map((l, idx) => {
            return (
              <div key={idx}>
                <Box>
                  <span>{l.challengeTitle}</span>
                  <img
                    src={l.challengeImgUrl}
                    alt=""
                    style={{ width: "300px", height: "300px" }}
                  />
                </Box>
              </div>
            );
          })}
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const BoxContainer = styled.div`
  height: 400px;
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 400px;
  height: 400px;
  margin: 10px;
  background-color: forestgreen;
`;

export default SearchChallenge;
