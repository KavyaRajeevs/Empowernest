import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './account/signup/signup.component';
import { RoleComponent } from './components/role/role.component';
import { LearneroverviewComponent } from './learner/learneroverview/learneroverview.component';
import { InstructoroverviewComponent } from './instructor/instructoroverview/instructoroverview.component';
import { LearnerProfileComponent } from './learner/learner-profile/learner-profile.component';
import { CoursesComponent } from './learner/courses/courses.component';
import { JobsApplyComponent } from './learner/jobs-apply/jobs-apply.component';
import { ViewApplicationsComponent } from './learner/view-applications/view-applications.component';
import { FinanceComponent } from './learner/finance/finance.component';
import { InstructorProfileComponent } from './instructor/instructor-profile/instructor-profile.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import { InstructorJobsComponent } from './instructor/instructor-jobs/instructor-jobs.component';
import { InstructorApplicationsComponent } from './instructor/instructor-applications/instructor-applications.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'signin', component: AccountComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'role', component: RoleComponent },
    { path: 'learner', component: LearneroverviewComponent },
    { path: 'instructor', component: InstructoroverviewComponent },
    { path: 'learner-profile', component: LearnerProfileComponent },
    { path: 'learner-courses', component: CoursesComponent },
    { path: 'learner-jobs', component: JobsApplyComponent },
    { path: 'learner-applications', component: ViewApplicationsComponent },
    { path: 'instructor-profile', component: InstructorProfileComponent},
    { path: 'instructor-courses', component: InstructorCoursesComponent},
    { path: 'instructor-jobs', component: InstructorJobsComponent},
    { path: 'instructor-applications', component: InstructorApplicationsComponent},
    { path: 'finance', component: FinanceComponent },

    { path: '**', redirectTo: '' }
];
