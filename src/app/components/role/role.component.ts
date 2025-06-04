import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { UiVisibilityService } from '../../shared/ui-visibility.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-role',
  imports: [HttpClientModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  @Output() roleCardClicked = new EventEmitter<void>();

  constructor(
    private uiVisibilityService: UiVisibilityService, 
    private router: Router, 
    private http: HttpClient
  ) {}

  onRoleCardClick() {
    this.roleCardClicked.emit();
    this.uiVisibilityService.emitRoleCardClicked();
  }

  selectRole(role: string) {
    // Get the current user's email from localStorage (set during signup)
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    
    if (!currentUserEmail) {
      alert('User session not found. Please sign up again.');
      this.router.navigate(['/signup']);
      return;
    }

    // First, get all users to find the current user
    this.http.get<any[]>('http://localhost:3000/signupUsersList')
      .subscribe({
        next: (users) => {
          // Find the user by email
          const currentUser = users.find(user => user.email === currentUserEmail);
          
          if (currentUser) {
            // Update the user with the selected role
            const updatedUser = { ...currentUser, role: role };
            
            // Update the user in the database using the correct json-server endpoint
            // json-server automatically assigns IDs, so we use the user's id
            this.http.put(`http://localhost:3000/signupUsersList/${currentUser.id}`, updatedUser)
              .subscribe({
                next: (response) => {
                  console.log('Role updated successfully:', response);
                  
                  // Store role in localStorage for immediate use
                  localStorage.setItem('role', role);
                  
                  // Navigate to the appropriate dashboard
                  this.router.navigate([`/${role}`]);
                },
                error: (error) => {
                  console.error('Error updating role:', error);
                  alert('Failed to update role. Please try again.');
                }
              });
          } else {
            alert('User not found. Please sign up again.');
            this.router.navigate(['/signup']);
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          alert('Failed to update role. Please try again.');
        }
      });
  }
}