import React from 'react';
import { useForm } from 'react-hook-form';
import classes from './Forms.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signUp_AC } from '../../redux/features/login/loginSlice';

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const submitted = (data) => {
    console.log(`Data ${JSON.stringify(data)}`);
    dispatch(signUp_AC(data));
  };

  /*const isCityBuffalo = (typedCity) => {
    console.log('typed city ', typedCity);
    if (typedCity && typedCity === 'Buffalo') return true;
    return false;
  };*/
  return (
    <React.Fragment>
      <form className={classes.Form}>
        <fieldset>
          <legend>Sign Up form: </legend>
          <div>
            <label htmlFor='fname'>First Name</label>
            <input
              type='text'
              id='fname'
              name='fname'
              placeholder='First Name'
              ref={register({
                required: true,
                maxLength: {
                  value: 25,
                  message: 'First name is too long.',
                },
              })}
            />
            {errors.fname && <p>{errors.fname.message}</p>}
          </div>

          <div>
            <label htmlFor='lname'>Last Name</label>
            <input
              type='text'
              id='lname'
              name='lname'
              placeholder='Last Name'
              ref={register({
                required: true,
                maxLength: {
                  value: 25,
                  message: 'Last name is too long.',
                },
              })}
            />
            {errors.lname && <p>{errors.lname.message}</p>}
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              ref={register({
                required: true,
                maxLength: {
                  value: 25,
                  message: 'Email is too long.',
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Your unique password'
              ref={register({
                required: 'Password is required.',
                minLength: {
                  value: 4,
                  message: 'Password needs at least 4 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Password must have less than 20 characters',
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Address'
              ref={register({
                required: 'Address is required',
              })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              id='country'
              name='country'
              placeholder='Country'
              ref={register({ required: 'Country is required' })}
            />
            {errors.country && <p>{errors.country.message}</p>}
          </div>

          <div>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              name='city'
              placeholder='City'
              ref={register({ required: true /*, validate: isCityBuffalo */ })}
            />
            {errors.city && <p>City must be Buffalo!</p>}
          </div>
        </fieldset>
        <button onClick={handleSubmit(submitted)}>Continue</button>
      </form>
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
    onSubmitSignup: (data) => dispatch(signUpUser(data)),
  };
};*/

export default SignupForm;
