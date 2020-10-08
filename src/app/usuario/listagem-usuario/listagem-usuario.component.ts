import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { UsuarioService } from 'src/app/core/usuario.service';

@Component({
  selector: 'apps-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent implements OnInit {
  usuarios: any[] = [];
  filtrosListagem: FormGroup;

  constructor(private userService: UsuarioService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.resetarConsulta();
    });

    this.listarUsers();
  }

  onScroll(): void {
    this.listarUsers();
  }

  abrir(id: number): void {
    console.log(id);
    this.router.navigateByUrl('/user/ver/' + id);
  }

  private listarUsers(): void {
    this.userService.listar()
      .subscribe((resultado: any) => {
        this.usuarios = resultado.data;
      });
  }

  private resetarConsulta(): void {
    this.usuarios = [];
    this.listarUsers();
  }
}
