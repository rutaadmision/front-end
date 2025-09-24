import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignupDataService {
  name = '';
  lastName = '';
  email = '';
  password = '';
}
