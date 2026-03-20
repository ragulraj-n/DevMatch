export const validateFirstName = (firstName) => {
  if (!firstName) return "It is required";
  if (firstName.length < 3) return "It must be at least 3 chars";
  if (firstName.length > 50) return "It must be at max 50 chars";
  if (!/^[A-Za-z ]+$/.test(firstName)) return "Only letters allowed";
  return "";
};

export const validateLastName = (lastName) => {
  if (!lastName) return "It is required";
  if (lastName.length < 1) return "It must be at least 1 chars";
  if (lastName.length > 50) return "It must be at max 50 chars";
  if (!/^[A-Za-z ]+$/.test(lastName)) return "Only letters allowed";
  return "";
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Minimum 8 characters required";
  if (!/[A-Z]/.test(password)) return "Must include uppercase letter";
  if (!/[a-z]/.test(password)) return "Must include lowercase letter";
  if (!/[0-9]/.test(password)) return "Must include a number";
  if (!/[!@#$%^&*]/.test(password)) return "Must include special character";
  return "";
};

export const validateConfirmPassword = (password,confirmPassword) =>{
  if (!confirmPassword) return "It is required";
  if(password!==confirmPassword) return "Password must be same";
  return "";
}