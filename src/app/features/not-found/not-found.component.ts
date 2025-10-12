import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MapRoutes } from '../../map-routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  imports: [RouterLink],
})
export class NotFoundComponent implements OnInit {
  currentPath: string = '';
  MapRoutes = MapRoutes;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
    console.error(
      '404 Error: User attempted to access non-existent route:',
      this.currentPath
    );
  }
}
