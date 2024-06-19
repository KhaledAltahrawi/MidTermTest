import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpUser = () => {
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm();

  const onSubmit = (data) => {
    const { firstName, lastName, username, email, password } = data;

    if (password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Show alert with all form data
    alert(`Form data:\n${JSON.stringify(getValues(), null, 2)}`);

    // Log form data object in the console
    console.log('Form data:', getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <label>
        First Name:
        <input type="text" {...register('firstName', { required: true })} />
        {errors.firstName && <span className="error-message">First Name is required.</span>}
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" {...register('lastName', { required: true })} />
        {errors.lastName && <span className="error-message">Last Name is required.</span>}
      </label>
      <br />
      <label>
        Username:
        <input type="text" {...register('username', { required: true })} />
        {errors.username && <span className="error-message">Username is required.</span>}
      </label>
      <br />
      <label>
        Email:
        <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email?.type === 'required' && <span className="error-message">Email is required.</span>}
        {errors.email?.type === 'pattern' && <span className="error-message">Invalid email format.</span>}
      </label>
      <br />
      <label>
        Password:
        <input type="password" {...register('password', { required: true })} />
        {errors.password && <span className="error-message">Password is required.</span>}
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" {...register('confirmPassword', { required: true })} />
        {errors.confirmPassword && <span className="error-message">Confirm Password is required.</span>}
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => console.log('User signup cancelled')}>Cancel</button>
    </form>
  );
};

export default SignUpUser;
