import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { Alerta } from "src/app/shared/models/alerta";
import { UsuarioService } from 'src/app/core/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: "apps-cadastro-usuario",
  templateUrl: "./cadastro-usuario.component.html",
  styleUrls: ["./cadastro-usuario.component.scss"],
})
export class CadastroUsuarioComponent implements OnInit {
  id: number;
  cadastro: FormGroup;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    console.log(1);
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.userService
        .visualizar(this.id)
        .subscribe((res: any) => {
          this.criarFormulario( res.data[0] as Usuario)
        });
    } else {
      this.criarFormulario(this.criarUserEmBranco());
    }
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const user = this.cadastro.getRawValue() as Usuario;
    if (this.id) {
      user.id = this.id.toString();
      this.editar(user);
    } else {
      this.salvar(user);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  voltarForm(): void {
    this.router.navigate(['user']);
  }

  private criarFormulario(user: any): void {
    this.cadastro = this.fb.group({
      name: [user.name],
      email: [user.email],
      id: [user.id],
    });
  }

  private criarUserEmBranco(): any {
    return {
      name:null,
      email:null,
      id:null,
    } as any;
  }

  private salvar(user: Usuario): void {
    this.userService.salvar(user).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: "Ir para a listagem",
            btnCancelar: "Cadastrar um novo",
            corBtnCancelar: "primary",
            possuirBtnFechar: true,
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl("user");
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: "Erro ao salvar o registro!",
            descricao:
              "Não conseguimos salvar seu registro, favor tentar novamente mais tarde",
            corBtnSucesso: "warn",
            btnSucesso: "Fechar",
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private editar(user: Usuario): void {
    this.userService.editar(user).subscribe(
      () => {
        const config = {
          data: {
            descricao: "Seu registro foi atualizado com sucesso!",
            btnSucesso: "Ir para a listagem",
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef
          .afterClosed()
          .subscribe(() => this.router.navigateByUrl("user"));
      },
      () => {
        const config = {
          data: {
            titulo: "Erro ao editar o registro!",
            descricao:
              "Não conseguimos editar seu registro, favor tentar novamente mais tarde",
            corBtnSucesso: "warn",
            btnSucesso: "Fechar",
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
