import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatRippleModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'งานทั้งหมด', icon: 'task', route: '/tasks' },
    { label: 'สมาชิก', icon: 'group', route: '/members' },
    { label: 'เอกสาร', icon: 'folder', route: '/documents' },
    { label: 'รายงาน', icon: 'bar_chart', route: '/reports' },
    { label: 'ตั้งค่า', icon: 'settings', route: '/settings' },
  ];

  logout() {
    this.auth.logout().subscribe();
  }
}
