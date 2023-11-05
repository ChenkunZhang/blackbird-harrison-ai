import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
describe ('form validation',() =>{
  test('email is invalid,should have email error message',() =>{
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput,{target:{value:"test"}});
    fireEvent.change(passwordInput,{target:{value:"ValidP@ss33"}});
    fireEvent.click(screen.getByRole('button',{name:/sign in/i}));

    const erroMessage = screen.getByText('Email not valid');
    expect(erroMessage).toBeInTheDocument();
  });

  test('email is valid and password is invalid,should have respective \'Minimum of 8 characters message\'',() =>{
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput,{target:{value:"test@example.com"}});
    fireEvent.change(passwordInput,{target:{value:""}});
    fireEvent.click(screen.getByRole('button',{name:/sign in/i}));

    const errorMessage = screen.getByText('Minimum of 8 characters');
    expect(errorMessage).toBeInTheDocument();
  });

  test('email is valid and password is invalid,Should have \'contains both uppercase and lowercase letter message\'',() =>{
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput,{target:{value:"test@example.com"}});
    fireEvent.change(passwordInput,{target:{value:"12345678!"}});
    fireEvent.click(screen.getByRole('button',{name:/sign in/i}));

    const errorMessage = screen.getByText('Should contains both uppercase and lowercase letter');
    expect(errorMessage).toBeInTheDocument();
  });

  test('email is valid and password is invalid,Should have \'Minimum of 1 numerical digit (0-9)\'',() =>{
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput,{target:{value:"test@example.com"}});
    fireEvent.change(passwordInput,{target:{value:"Abcdefgh!"}});
    fireEvent.click(screen.getByRole('button',{name:/sign in/i}));

    const errorMessage = screen.getByText('Minimum of 1 numerical digit (0-9)');
    expect(errorMessage).toBeInTheDocument();
  });

  test('email is valid and password is invalid,Should have \'Minimum of 1 special character\'',() =>{
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput,{target:{value:"test@example.com"}});
    fireEvent.change(passwordInput,{target:{value:"Abcdefg1"}});
    fireEvent.click(screen.getByRole('button',{name:/sign in/i}));

    const errorMessage = screen.getByText('Minimum of 1 special character');
    expect(errorMessage).toBeInTheDocument();
  });

  test('email and password is valid,should have success message',() =>{
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput,{target:{value:"test@example.com"}});
    fireEvent.change(passwordInput,{target:{value:"ValidP@ss33"}});
    fireEvent.click(screen.getByRole('button',{name:/sign in/i}));

    const successMessage = screen.getByText('Login Successful');
    expect(successMessage).toBeInTheDocument();
  });

});

// example code
/*
import { validateEmail, validatePassword } from './validation';

test("Password should be 8 or more characters", () => {
    expect(validatePassword("aaa")).toBe("Password should be 8 or more characters");
});

test("Password should contains minimum 1 character for both uppercase and lowercase letter", () => {
    expect(validatePassword("aaabbbcc")).toBe("Password should contains minimum 1 character for both uppercase and lowercase letter");
    expect(validatePassword("AAABBBCC")).toBe("Password should contains minimum 1 character for both uppercase and lowercase letter");
});

test("Password should contains minimum 1 digit of numeric value", () => {
    expect(validatePassword("Aaabbbcc")).toBe("Password should contains minimum 1 digit of numeric value");
});

test("Password should contains minimum 1 special character", () => {
    expect(validatePassword("Aaabbbcc1")).toBe("Password should contains minimum 1 special character");
});

test("Password that meet all requirements should pass validation and return no error message", () => {
    expect(validatePassword("Aaabbbcc1#")).toBe("");
});


test("Email should contain @ symbol", () => {
    expect(validateEmail("aaa")).toBe(false);
});

test("Email should contain correct domain", () => {
    expect(validateEmail("aaa@gmail.c")).toBe(false);
});

test("Valid email should pass validation", () => {
    expect(validateEmail("aaa@gmail.com")).toBe(true);
});

*/