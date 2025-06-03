import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface UserProfile {
  id?: number;
  email: string;
  password: string;
  role: string;
  name: string;
  age: number;
  imageUrl: string;
  skills: string[];
}

@Component({
  selector: 'app-learner-profile',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './learner-profile.component.html',
  styleUrl: './learner-profile.component.css'
})
export class LearnerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userProfile: UserProfile = {
    email: '',
    password: '',
    role: '',
    name: '',
    age: 0,
    imageUrl: '',
    skills: []
  };
  
  isEditMode = false;
  isSaving = false;
  newSkill = '';
  originalProfileData: UserProfile = { ...this.userProfile };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: [0, [Validators.required, Validators.min(13), Validators.max(120)]],
      imageUrl: ['']
    });
  }

  loadUserProfile(): void {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    
    if (!currentUserEmail) {
      alert('User session not found. Please sign in again.');
      this.router.navigate(['/signin']);
      return;
    }

    this.http.get<UserProfile[]>('http://localhost:3000/signupUsersList')
      .subscribe({
        next: (users) => {
          const currentUser = users.find(user => user.email === currentUserEmail);
          
          if (currentUser) {
            this.userProfile = { ...currentUser };
            this.originalProfileData = { ...currentUser };
            this.updateFormValues();
          } else {
            alert('User profile not found.');
            this.router.navigate(['/signin']);
          }
        },
        error: (error) => {
          console.error('Error loading profile:', error);
          alert('Failed to load profile. Please try again.');
        }
      });
  }

  updateFormValues(): void {
    this.profileForm.patchValue({
      name: this.userProfile.name || '',
      age: this.userProfile.age || 0,
      imageUrl: this.userProfile.imageUrl || ''
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      // Reset form to original values when canceling
      this.userProfile = { ...this.originalProfileData };
      this.updateFormValues();
    }
  }

  cancelEdit(): void {
    this.userProfile = { ...this.originalProfileData };
    this.updateFormValues();
    this.isEditMode = false;
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.userProfile.id) {
      this.isSaving = true;
      
      // Update userProfile with form values
      const formValues = this.profileForm.value;
      const updatedProfile: UserProfile = {
        ...this.userProfile,
        name: formValues.name,
        age: formValues.age,
        imageUrl: formValues.imageUrl || this.userProfile.imageUrl
      };

      this.http.put<UserProfile>(`http://localhost:3000/signupUsersList/${this.userProfile.id}`, updatedProfile)
        .subscribe({
          next: (response) => {
            console.log('Profile updated successfully:', response);
            this.userProfile = { ...updatedProfile };
            this.originalProfileData = { ...updatedProfile };
            this.isEditMode = false;
            this.isSaving = false;
            alert('Profile updated successfully!');
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.isSaving = false;
            alert('Failed to update profile. Please try again.');
          }
        });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  addSkill(): void {
    if (this.newSkill && this.newSkill.trim()) {
      const skill = this.newSkill.trim();
      
      // Check if skill already exists
      if (!this.userProfile.skills.includes(skill)) {
        this.userProfile.skills.push(skill);
        this.newSkill = '';
      } else {
        alert('This skill already exists!');
      }
    }
  }

  removeSkill(index: number): void {
    this.userProfile.skills.splice(index, 1);
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // For demo purposes, we'll create a data URL
      // In a real app, you'd upload to a server and get back a URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.imageUrl = e.target.result;
        this.profileForm.patchValue({ imageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onImageError(event: any): void {
    // Set default image if the provided URL fails to load
    event.target.src = 'avatar.png';
  }

  getProfileCompleteness(): number {
    let completedFields = 0;
    const totalFields = 6; // name, age, email, role, imageUrl, skills

    if (this.userProfile.name) completedFields++;
    if (this.userProfile.age > 0) completedFields++;
    if (this.userProfile.email) completedFields++;
    if (this.userProfile.role) completedFields++;
    if (this.userProfile.imageUrl) completedFields++;
    if (this.userProfile.skills.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }

}
