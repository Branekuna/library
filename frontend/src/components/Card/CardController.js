import React from 'react';
import classes from './Card.module.css';
import { useSelector } from 'react-redux';

const CardController = (props) => {
  const loginState = useSelector((state) => state.login);
  let secondController = null;
  let controllerText = null;
  if (!loginState.token) {
    secondController = false;
  } else {
    if (loginState.isAdmin) {
      secondController = true;
      controllerText = 'Edit';
    } else {
      if (props.target === 'Authors') {
        secondController = false;
        controllerText = null;
      } else {
        secondController = true;
        controllerText = 'Add To Cart';
      }
    }
  }

  return (
    <React.Fragment>
      <div className={classes.bookCardBtn} onClick={props.goToItemDetails}>
        Details
      </div>
      {secondController ? (
        <div
          className={classes.bookCardBtn}
          onClick={(e) => {
            e.preventDefault();
            const text = e.target.innerText;
            props.addToCartOrEdit(text);
          }}
        >
          {controllerText ? controllerText : null}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default CardController;
