import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { UiVisibilityService } from '../../shared/ui-visibility.service';
@Component({
  selector: 'app-role',
  imports: [RouterLink],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  @Output() roleCardClicked = new EventEmitter<void>();

  constructor(private uiVisibilityService: UiVisibilityService) {}

  onRoleCardClick() {
    this.roleCardClicked.emit();
    this.uiVisibilityService.emitRoleCardClicked();
  }
}
