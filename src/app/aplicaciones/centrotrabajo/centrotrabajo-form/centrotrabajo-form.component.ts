import { Component, inject, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CentroTrabajoService } from "src/services/centro-trabajo.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-centrotrabajo-form",
  templateUrl: "./centrotrabajo-form.component.html",
  styleUrls: ["./centrotrabajo-form.component.scss"],
})
export class CentrotrabajoFormComponent implements OnInit {
  public form: FormGroup;
  private _centroTrabajo = inject(CentroTrabajoService);
  public option: string;
  toastr: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CentrotrabajoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Descripcion: "",
      Nombre: ["", Validators.required],
      IdEmpresa: [this.data.id, Validators.required],
    });
  }
  onSaveCentroTrabajo() {
    this._centroTrabajo.saveCentroTrabajo(this.form.value).subscribe({
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
