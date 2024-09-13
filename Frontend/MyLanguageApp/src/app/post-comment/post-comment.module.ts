import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentRoutingModule } from './post-comment-routing.module';
import { PostCommentComponent } from './post-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CommentComponent } from './comment/comment.component';




@NgModule({
  declarations: [
    PostCommentComponent,
    PostListComponent,
    CreatePostComponent,
    CommentComponent,


  ],
  imports: [
    CommonModule,
    PostCommentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PostCommentModule { }
