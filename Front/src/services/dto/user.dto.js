class RegisterUser {
  name;
  pass;
  email;
  photo;
  backphoto;
  username;

  constructor( data ){
    this.name     = data.name;
    this.pass     = data.pass;
    this.email    = data.email;
    this.photo    = data.photo;
    this.backphoto=data.backphoto;
    this.username = data.name;
  }
}

export { RegisterUser }