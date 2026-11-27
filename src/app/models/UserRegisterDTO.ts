
export class UserRegisterDTO {
  firstName: string = '';
  lastNameUser: string = '';
  nomUser: string = '';
  age: number = 0;
  email: string = '';
  password: string = '';
  idCountry: number = 0;
}

export class UserRegisterResponseDTO {
  idUser: number = 0;
  idRol: number[] = [];
  nomUser: string = '';
  lastNameUser: string = '';
  email: string | null = null;
  idCountry: number = 0;
  idFamily: number | null = null;
}
