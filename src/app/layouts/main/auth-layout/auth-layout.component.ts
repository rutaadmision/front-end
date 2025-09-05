import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapRoutes } from '../../../map-routes';
@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  MapRoutes = MapRoutes;
}
