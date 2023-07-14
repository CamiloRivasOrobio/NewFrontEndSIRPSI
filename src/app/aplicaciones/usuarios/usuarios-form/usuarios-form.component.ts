import { Component, inject, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CentroTrabajoService } from "src/services/centro-trabajo.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.scss"],
})
export class UsuariosFormComponent implements OnInit {
  public form: FormGroup;
  private _centroTrabajo = inject(CentroTrabajoService);
  public option: string;
  public listCentrosCosto: any;
  toastr: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsuariosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      User: [this.data.id, Validators.required],
      Workplace: ["", Validators.required],
    });
    this._centroTrabajo.getCentroTrabajo().subscribe(data => this.listCentrosCosto = data);
  }
  onSaveCentroTrabajo() {
    this._centroTrabajo.saveCentroTrabajoUsuario(this.form.value).subscribe({
      next: (data) => {
        window.location.reload();
        this.toastr.success("Usuario Registrado, exitosamente!");
      },
      error: (error) => {
        console.log("error usuario" + error.error.message);
        this.toastr.error("Ha ocurrido un error! " + error.error.message);
      },
    });
  }
}
