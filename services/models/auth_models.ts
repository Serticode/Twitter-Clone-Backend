//!
//! THIS IS THE MODEL OF THE REQUESTED DATA FROM THE CLIENT
export interface UserCreationParams {
  email: string;
  name: string;
  username: string;
  password: string;
}

//!
//! SYSTEM USER MODEL
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

//!
//! MODEL OF DATA RETURNED TO THE CLIENT
export interface UserAndCredentials {
  user: User;
  token: string;
  refresh: string;
}
