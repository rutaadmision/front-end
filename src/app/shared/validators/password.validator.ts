import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null; // No validamos si no hay contraseña
    }

    const minLength = /^(?=.{8,})/; // Mínimo 8 caracteres
    const hasUpperCase = /[A-Z]/; // Al menos una mayúscula
    const hasLowerCase = /[a-z]/; // Al menos una minúscula
    const hasNumbers = /[0-9]/; // Al menos un número
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/; // Al menos un carácter especial

    // Verificar si la contraseña cumple con todos los requisitos
    const valid =
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumbers.test(password) &&
      hasSpecialChars.test(password);

    return valid ? null : { passwordStrength: true }; // Si es válida, retornamos null, de lo contrario el error
  };
}