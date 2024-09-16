import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { OtherUserProfileComponent } from './other-users-profile/other-users-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    PersonalProfileComponent,
    OtherUserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
