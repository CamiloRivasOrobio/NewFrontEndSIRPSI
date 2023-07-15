import { Component, inject, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CentroTrabajoService } from "src/services/centro-trabajo.service";
import { MatDialog } from "@angular/material/dialog";
import { EstadosService } from "src/services/estados.service";
import { EmpresaService } from "src/services/empresa.service";
import { TiposDocumentoService } from "src/services/tipos-documento.service";
import { RolService } from "src/services/rol.service";
import { PaisService } from "src/services/pais.service";
import { UsuarioService } from "src/services/usuario.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.scss"],
})
export class UsuariosFormComponent implements OnInit {
  public form: FormGroup;
  public formEmpresa: FormGroup;
  private _centroTrabajo = inject(CentroTrabajoService);
  private _usuarioService = inject(UsuarioService);
  public _estados = inject(EstadosService);
  public _empresas = inject(EmpresaService);
  public _tiposDoc = inject(TiposDocumentoService);
  public _paises = inject(PaisService);
  public _roles = inject(RolService);
  private toastr = inject(ToastrService);
  public option: string;
  public listCentrosCosto: any;
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  id: number | undefined;
  type: number = this.data.type;
  table: number = this.data.table;
  listRoles: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsuariosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  ngOnInit(): void {
    console.log(this.data.item);
    this.getListas();
    this.form = this.formBuilder.group({
      IdTypeDocument: ["", Validators.required],
      Document: ["", Validators.required],
      IdCountry: ["", Validators.required],
      IdCompany: ["", Validators.required],
      Names: ["", Validators.required],
      Surnames: ["", Validators.required],
      IdRol: ["", Validators.required],
      Password: ["", Validators.required],
      PhoneNumber: "",
      Email: ["", Validators.required],
      IdEstado: ["", Validators.required],
    });
    this.formEmpresa = this.formBuilder.group({
      Usuario: ["", Validators.required],
    });
    this._centroTrabajo
      .getCentroTrabajo()
      .subscribe((data) => (this.listCentrosCosto = data));
  }
  onSave() {
    console.log(this.form.value);
    this._usuarioService.saveUsuario(this.form.value).subscribe({
      next: (data) => {
        if (this.data.reload) "";
        else this.dialogRef.close();
        this.toastr.success("Usuario Registrado, exitosamente!");
      },
      error: (error) => {
        console.log("error usuario" + error.error.message);
        this.toastr.error("Ha ocurrido un error! " + error.error.message);
      },
    });
  }

  getListas() {
    this._empresas.getListEmpresasUsuario().subscribe((data: any) => {
      this.listEmpresas = data;
      this._tiposDoc.getTipoDocumento().subscribe((data: any) => {
        this.listDocs = data;
        this._paises.getPais().subscribe((data: any) => {
          this.listPaises = data;
          this._roles.getRoles().subscribe((data: any) => {
            this.listRoles = data;
            this._estados.getEstados().subscribe((data: any) => {
              this.estadosList = data;
              this._usuarioService.getUsuarios().subscribe((data: any) => {
                this.listUsuario = data;
              });
            });
          });
        });
      });
    });
  }
  changeViewFormUser() {
    this.type = 1;
    this.dialogRef.close();
    this.dialog
      .open(UsuariosFormComponent, { data: { id: 0, type: 0, reload: false } })
      .afterClosed()
      .subscribe();
  }
  onUpdateEmpresa() {
    if (this.table == 0) {
      var empresa = this.data.item;
      empresa.IdUsuario = this.formEmpresa.value.Usuario;
      this._empresas.updateEmpresa(empresa).subscribe({
        next: (data) => {
          window.location.reload();
          this.toastr.success("Usuario asignado exitosamente!");
        },
        error: (error) => {
          console.log("error usuario" + error.error.message);
          this.toastr.error("Ha ocurrido un error! " + error.error.message);
        },
      });
    } else {
      var centroTrabajo = this.data.item;
      centroTrabajo.IdUsuario = this.formEmpresa.value.Usuario;
      console.log(this.data.item);
      console.log(this.formEmpresa.value.Usuario);
      this._centroTrabajo.updateCentroTrabajo(centroTrabajo).subscribe({
        next: (data) => {
          window.location.reload();
          this.toastr.success("Usuario asignado exitosamente!");
        },
        error: (error) => {
          console.log("error usuario" + error.error.message);
          this.toastr.error("Ha ocurrido un error! " + error.error.message);
        },
      });
    }
  }
}
