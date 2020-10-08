import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/models/usuario.model';

const url = 'https://alxac-python-api.herokuapp.com/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    })
  };

  constructor(private http: HttpClient) { }

  salvar(entidade: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, entidade);
  }

  editar(entidade: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(url, entidade, this._httpOptions);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(url);
  }

  visualizar(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(url + '/' + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + '/' + id);
  }
}
