import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../Forms/Login';
import SignUpForm from '../Forms/Signup';
import { modalCloseNoStatusChange } from '../../redux/features/login/loginSlice';

const Modal = (props) => {
  const dispatch = useDispatch();
  const { showModalForm, modalName } = useSelector((state) => state.login);
  const closeModal = () => {
    dispatch(modalCloseNoStatusChange());
  };

  let showForm = null;
  switch (modalName) {
    case 'Login':
      showForm = <LoginForm />;
      break;
    case 'Sign Up':
      showForm = <SignUpForm />;
      break;
    default:
      showForm = <LoginForm />;
  }

  return (
    <React.Fragment>
      <Backdrop show={showModalForm} clicked={closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: showModalForm ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: showModalForm ? '1' : '0',
        }}
      >
        {showForm}
      </div>
    </React.Fragment>
  );
};

/*const mapStateToProps = (state) => {
  return {
    loginState: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch({ type: actionTypes.MODAL_CLOSE_NO_STATUS_CHANGE });
    },
  };
};*/

export default Modal;
