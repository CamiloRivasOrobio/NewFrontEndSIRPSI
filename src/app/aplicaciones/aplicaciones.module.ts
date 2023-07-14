import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AplicacionesRoutingModule } from "./aplicaciones-routing.module";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsuariosFormComponent } from "./usuarios/usuarios-form/usuarios-form.component";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [UsuariosComponent, UsuariosFormComponent],
  imports: [
    CommonModule,
    AplicacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
  ],
})
export class AplicacionesModule {}
