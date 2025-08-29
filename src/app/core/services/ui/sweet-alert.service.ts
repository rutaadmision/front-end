import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  showAlert(
    title: string,
    text: string = '',
    icon: SweetAlertIcon = 'info'
  ): void {
    Swal.fire({ icon, title, text });
  }

  showError(message: string = 'Ha ocurrido un error', title: string = 'Error') {
    this.showAlert(title, message, 'error');
  }

  showSuccess(message: string = 'Operación exitosa', title: string = 'Éxito') {
    this.showAlert(title, message, 'success');
  }

  showWarning(message: string = 'Cuidado', title: string = 'Advertencia') {
    this.showAlert(title, message, 'warning');
  }

  showInfo(message: string = '', title: string = 'Información') {
    this.showAlert(title, message, 'info');
  }
}
