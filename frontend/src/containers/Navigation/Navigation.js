import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { loginStatusChangeButton } from '../../redux/features/login/loginSlice';

const isAdminCase = ['Authors', 'Books', 'Orders'];
const isLoggedInCase = ['Authors', 'Books', 'Cart'];
const visitorCase = ['Authors', 'Books'];

const Navbar = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.login);
  let navList = null;
  let statusList = null;
  //Views: Visitor || ( LoggedIn User || LoggedIn Admin )
  if (isLoggedIn) {
    //check if also an admin
    if (isAdmin) {
      navList = isAdminCase;
    } else {
      navList = isLoggedInCase;
    }
    //Status for both logged in cases
    statusList = ['Logout'];
  } else {
    //not logged in, so not user or admin yet
    navList = visitorCase;
    statusList = ['Sign Up', 'Login'];
  }
  return (
    <div className={classes.navdiv}>
      <Navigation navList={navList} />
      <h1>Title</h1>
      <Status statusList={statusList} />
    </div>
  );
};

const Navigation = (props) => {
  return (
    <ul className={classes.navul}>
      {props.navList.map((buttonName, index) => {
        return (
          <NavLink
            key={buttonName}
            activeStyle={{
              color: 'hsl(76, 100%, 95%)',
            }}
            to={'/' + buttonName}
            className={classes.navbtn}
            style={{ textDecoration: 'none', color: 'hsl(210, 40%, 2%)' }}
          >
            {buttonName}
          </NavLink>
        );
      })}
    </ul>
  );
};

const Status = (props) => {
  const dispatch = useDispatch();
  return (
    <ul className={classes.navul}>
      {props.statusList.map((buttonName, index) => {
        return (
          <li
            className={classes.statusbtn}
            key={index}
            onClick={(e) => {
              e.preventDefault();
              const text = e.target.innerText;
              dispatch(loginStatusChangeButton(text));
            }}
          >
            {buttonName}
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
