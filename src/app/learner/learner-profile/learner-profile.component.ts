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
            // Ensure skills is always an array
            if (!this.userProfile.skills || !Array.isArray(this.userProfile.skills)) {
              this.userProfile.skills = [];
            }
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
      // Ensure skills array is properly copied
      this.userProfile.skills = [...(this.originalProfileData.skills || [])];
      this.updateFormValues();
      this.newSkill = ''; // Clear any pending skill input
    }
  }

  cancelEdit(): void {
    this.userProfile = { ...this.originalProfileData };
    // Ensure skills array is properly copied
    this.userProfile.skills = [...(this.originalProfileData.skills || [])];
    this.updateFormValues();
    this.isEditMode = false;
    this.newSkill = ''; // Clear any pending skill input
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
        imageUrl: formValues.imageUrl || this.userProfile.imageUrl,
        skills: [...this.userProfile.skills] // Ensure skills array is included
      };

      this.http.put<UserProfile>(`http://localhost:3000/signupUsersList/${this.userProfile.id}`, updatedProfile)
        .subscribe({
          next: (response) => {
            console.log('Profile updated successfully:', response);
            this.userProfile = { ...updatedProfile };
            this.userProfile.skills = [...updatedProfile.skills];
            this.originalProfileData = { ...updatedProfile };
            this.originalProfileData.skills = [...updatedProfile.skills];
            this.isEditMode = false;
            this.isSaving = false;
            this.newSkill = ''; // Clear skill input
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
      
      // Initialize skills array if it doesn't exist
      if (!this.userProfile.skills) {
        this.userProfile.skills = [];
      }
      
      // Check if skill already exists (case-insensitive)
      const skillExists = this.userProfile.skills.some(
        existingSkill => existingSkill.toLowerCase() === skill.toLowerCase()
      );
      
      if (!skillExists) {
        this.userProfile.skills.push(skill);
        this.newSkill = '';
        
        // Auto-save skills if not in edit mode for other fields
        if (this.isEditMode) {
          // Skills are saved when the entire profile is saved
          console.log('Skill added:', skill);
        }
      } else {
        alert('This skill already exists!');
        this.newSkill = ''; // Clear the input even if skill exists
      }
    }
  }

  removeSkill(index: number): void {
    if (this.userProfile.skills && index >= 0 && index < this.userProfile.skills.length) {
      const removedSkill = this.userProfile.skills[index];
      this.userProfile.skills.splice(index, 1);
      console.log('Skill removed:', removedSkill);
    }
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP).');
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('Image file is too large. Please select an image smaller than 5MB.');
        return;
      }
      
      // For demo purposes, we'll create a data URL
      // In a real app, you'd upload to a server and get back a URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.imageUrl = e.target.result;
        this.profileForm.patchValue({ imageUrl: e.target.result });
      };
      reader.onerror = () => {
        alert('Error reading the image file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  }

  onImageError(event: any): void {
    // Set default image if the provided URL fails to load
    console.log('Image failed to load, using default avatar');
    event.target.src = 'assets/images/default-avatar.png';
  }

  getProfileCompleteness(): number {
    let completedFields = 0;
    const totalFields = 6; // name, age, email, role, imageUrl, skills

    if (this.userProfile.name && this.userProfile.name.trim()) completedFields++;
    if (this.userProfile.age && this.userProfile.age > 0) completedFields++;
    if (this.userProfile.email && this.userProfile.email.trim()) completedFields++;
    if (this.userProfile.role && this.userProfile.role.trim()) completedFields++;
    if (this.userProfile.imageUrl && this.userProfile.imageUrl.trim()) completedFields++;
    if (this.userProfile.skills && this.userProfile.skills.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }

  // Utility method to handle Enter key press in skill input
  onSkillKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addSkill();
    }
  }

  // Method to validate skill input in real-time
  isSkillInputValid(): boolean {
    return !(!(this.newSkill && this.newSkill.trim().length > 0));
  }

  // Method to get skill suggestions (can be enhanced with a predefined list)
  getSkillSuggestions(): string[] {
    // This can be enhanced to fetch from a service or predefined list
    const commonSkills = [
      'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js',
      'Node.js', 'Python', 'Java', 'C#', 'PHP',
      'HTML', 'CSS', 'SCSS', 'Bootstrap', 'Tailwind CSS',
      'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase',
      'Git', 'Docker', 'AWS', 'Azure', 'Leadership',
      'Project Management', 'Communication', 'Problem Solving'
    ];
    
    if (!this.newSkill || this.newSkill.trim().length < 2) {
      return [];
    }
    
    const searchTerm = this.newSkill.toLowerCase();
    return commonSkills.filter(skill => 
      skill.toLowerCase().includes(searchTerm) &&
      !this.userProfile.skills.some(existing => 
        existing.toLowerCase() === skill.toLowerCase()
      )
    ).slice(0, 5); // Limit to 5 suggestions
  }
}