interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Account {
  email: string;
  password: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: Address;
  account: Account;
}

export interface CustomerFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    role: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  }