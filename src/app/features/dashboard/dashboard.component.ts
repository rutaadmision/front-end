import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {}
}
