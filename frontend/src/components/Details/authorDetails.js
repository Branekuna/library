import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const AuthorDetails = (props) => {
  const [itemState, setItemState] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get('http://localhost:5000' + props.match.url)
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log(`Error while getting ${props.match.url}`);
        });
      setItemState(result);
    };
    fetchData();
  }, [props.match.url]);

  return (
    <section>
      <h2>{itemState.fullname}</h2>
      <img
        src={itemState.imgUrl}
        style={{ height: '300px', width: '500px' }}
        alt='Author or book'
      />
      <p>{itemState.biography}</p>
    </section>
  );
};

export default withRouter(AuthorDetails);
