import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IndexComponent } from './components/index/index.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsProductsComponent } from './components/details-products/details-products.component';
import { ListProductsComponent } from './components/admin/list-products/list-products.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [  
    { path:'' , component: HomeComponent }, 
    { path:'login' , component: LoginComponent}, 
    { path:'adminpage' , component: AdminpageComponent, canActivate: [AuthGuard]  },
    { path:'signup', component: SignupComponent},
    { path:'index', component: IndexComponent,  canActivate: [AuthGuard] },
    { path:'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path:'admin/list-products', component: ListProductsComponent,  canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'products/:id', component: DetailsProductsComponent,  canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
