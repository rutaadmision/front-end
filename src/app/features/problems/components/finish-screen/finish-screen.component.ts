import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CircleCheckBigIcon, LucideAngularModule } from 'lucide-angular';
import { MapRoutes } from '../../../../map-routes';
@Component({
  selector: 'app-finish-screen',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './finish-screen.component.html',
  styleUrl: './finish-screen.component.css',
})
export class FinishScreenComponent {
  readonly MapRoutes = MapRoutes;
  readonly CircleCheckBigIcon = CircleCheckBigIcon;
}
