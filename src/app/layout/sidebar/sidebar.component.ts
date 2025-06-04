import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 role: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      this.role = storedRole;
    }
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('email'); // assuming email is also saved
    // Remove anything else you've stored (token etc.)
    this.router.navigate(['/login']); // Redirect to login page
  }
}
