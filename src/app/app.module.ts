import { authGuard } from "./guards/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        RouterOutlet,
        SidebarComponent,
        HeaderComponent,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        BrowserAnimationsModule,
    ],
    providers: [AuthService, authGuard, provideHttpClient()],
})
export class Appmodule { }
