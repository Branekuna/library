import React from 'react';
import { useForm } from 'react-hook-form';
import classes from './Forms.module.css';
import { useDispatch } from 'react-redux';
import { login_AC } from '../../redux/features/login/loginSlice';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const submitted = (data) => {
    dispatch(login_AC(data));
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitted)} className={classes.Form}>
        <fieldset>
          <legend>Login form: </legend>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              ref={register({ required: true })}
            ></input>
          </div>
          <div>
            <label htmlFor='pass'>Password</label>
            <input
              type='password'
              id='pass'
              name='password'
              placeholder='Your unique password'
              ref={register({
                required: 'password is required',
                minLength: { value: 4, message: 'pass too short' },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <input type='submit' className={classes.submitBtn}></input>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
