import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiVisibilityService {
  private roleCardClickedSource = new Subject<void>();
  roleCardClicked$ = this.roleCardClickedSource.asObservable();

  emitRoleCardClicked() {
    this.roleCardClickedSource.next();
  }
}