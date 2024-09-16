import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { OtherUserProfileComponent } from './other-users-profile/other-users-profile.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'profile', component: PersonalProfileComponent },
  { path: 'profile/:userId', component: OtherUserProfileComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
