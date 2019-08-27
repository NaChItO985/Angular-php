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


const routes: Routes = [  
    { path:'' , component: HomeComponent }, 
    { path:'login' , component: LoginComponent }, 
    { path:'adminpage' , component: AdminpageComponent },
    { path:'signup', component: SignupComponent},
    { path:'index', component: IndexComponent},
    { path:'profile', component: ProfileComponent},
    { path: 'users', component: UsersComponent},
    { path: 'products/:id', component: DetailsProductsComponent},
    { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
