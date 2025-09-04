import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapRoutes } from '../../../map-routes';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  MapRoutes = MapRoutes;
}
