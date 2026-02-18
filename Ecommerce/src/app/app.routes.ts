import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Cart } from './pages/cart/cart';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path:"",
        component:Home
    },
    {
        path:"login",
        component:Login
    },
    {
        path:"signup",
        component:Signup
    },
    {
       path:"cart",
       canActivate:[authGuard],
       loadComponent:()=>import("./pages/cart/cart").then(m=>m.Cart)
    }
];
