import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UiVisibilityService } from './shared/ui-visibility.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Empowernest';
  showNavbar = true;
  showFooter = true;
  showSidebar = false;

  // Define which routes should show sidebar
  private sidebarRoutes = ['/learner', '/instructor', '/learner-profile', '/learner-courses', '/jobs-apply', '/view-applications', '/finance'];
  
  // Define which routes should show navbar and footer
  private navbarFooterRoutes = ['/', '/signup', '/signin', '/role', '/about', '/contact'];

  constructor(
    private uiVisibilityService: UiVisibilityService,
    private router: Router
  ) {
    // Set initial UI state based on current route
    this.setUIVisibility(this.router.url);

    // Listen for card click
    this.uiVisibilityService.roleCardClicked$.subscribe(() => {
      this.onRoleCardClick();
    });

    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setUIVisibility(event.urlAfterRedirects || event.url);
    });
  }

  private setUIVisibility(url: string): void {
    // Check if current route should show sidebar
    if (this.sidebarRoutes.some(route => url.startsWith(route))) {
      this.showNavbar = false;
      this.showFooter = false;
      this.showSidebar = true;
    } 
    // Check if current route should show navbar and footer
    else if (this.navbarFooterRoutes.includes(url)) {
      this.showNavbar = true;
      this.showFooter = true;
      this.showSidebar = false;
    }
    // Default case (fallback)
    else {
      this.showNavbar = true;
      this.showFooter = true;
      this.showSidebar = false;
    }
  }

  onRoleCardClick(): void {
    this.showNavbar = false;
    this.showFooter = false;
    this.showSidebar = true;
  }
}