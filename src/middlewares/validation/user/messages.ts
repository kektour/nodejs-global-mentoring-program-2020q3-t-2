export enum LoginMessage {
  Required = 'Login field is required',
}

export enum PasswordMessage {
  Pattern = 'Password must contain letters and numbers',
  Required = 'Password field is required',
}

export enum AgeMessage {
  Number = 'Age must be number',
  Integer = 'Age must be integer',
  Min = 'Age field must be between 4 and 130',
  Max = 'Age field must be between 4 and 130',
  Required = 'Age field is required',
}

export enum LimitMessage {
  Number = 'Limit must be number',
  Integer = 'Limit must be integer',
}

export enum PageMessage {
  Number = 'Page must be number',
  Integer = 'Page must be integer',
}
