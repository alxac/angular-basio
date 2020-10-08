import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemUsuarioComponent } from './usuario/listagem-usuario/listagem-usuario.component';
import { VisualizarUsuarioComponent } from './usuario/visualizar-usuario/visualizar-usuario.component';
import { UsuarioModule } from './usuario/usuario.module';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: ListagemUsuarioComponent
      },
      {
        path: 'ver/:id',
        component: VisualizarUsuarioComponent
      },
      {
        path: 'edit/:id',
        component: CadastroUsuarioComponent
      },
      {
        path: 'novo',
        component: CadastroUsuarioComponent
      },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UsuarioModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
