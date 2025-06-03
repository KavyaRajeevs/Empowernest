import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
 Categories = [
  "personal_development",
  "career_development",
  "personal_transformation",
  "leadership",
  "stress_management",
  "self_esteem_and_confidence",
  "productivity",
  "motivation",
  "parenting_and_relationship",
  "lifestyle",
  "arts_and_crafts",
  "beauty_and_makeup",
  "food_and_beverage",
  "home_improvement",
  "photography_and_video",
  "interior_design",
  "fashion",
  "health_and_fitness",
  "yoga",
  "nutrition",
  "mental_health",
  "dance",
  "meditation",
  "business",
  "entrepreneurship",
  "project_management",
  "e_commerce",
  "finance_and_accounting",
  "money_management_tools",
  "marketing",
  "digital_marketing",
  "branding",
  "content_marketing",
  "design",
  "graphic_design_and_illustration",
  "web_design",
  "teaching_and_academics",
  "online_education",
  "language"
];

}
