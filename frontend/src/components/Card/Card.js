import React from 'react';
import classes from './Card.module.css';
import { withRouter } from 'react-router-dom';
import CardController from './CardController';

const Card = (props) => {
  const target = props.location.pathname.replace('/', '');
  const goToItemDetails = () => {
    props.history.push(target + '/' + props.id);
  };
  const addToCartOrEdit = (text) => {
    if (text === 'Edit') {
      props.history.push(target + '/edit/' + props.id);
    }
    console.log('Adding to cart ', text);
  };

  return (
    <section className={classes.bookCard}>
      <h3>{props.type}</h3>
      <img
        className={classes.bookCardImg}
        alt='Author or book'
        src={props.imgUrl}
      />
      <h3 className={classes.bookCardItem}>{props.title}</h3>
      <p className={classes.bookCardItem}>{props.desc}</p>
      <CardController
        goToItemDetails={goToItemDetails}
        addToCartOrEdit={addToCartOrEdit}
        target={target}
      />
    </section>
  );
};

export default withRouter(Card);
