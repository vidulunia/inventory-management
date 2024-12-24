import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { OrderhistoryComponent } from './profile/orderhistory/orderhistory.component';
import { PaymenthistoryComponent } from './profile/paymenthistory/paymenthistory.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'sidebar',
        component: SidebarComponent
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'brands',
        component: BrandsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'homepage',
        component: HomepageComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,

    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'setting',
        component: SettingComponent,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard]
    },
    {
        path: 'orderhistory',
        component: OrderhistoryComponent
    },
    {
        path: 'paymenthistory',
        component: PaymenthistoryComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];
