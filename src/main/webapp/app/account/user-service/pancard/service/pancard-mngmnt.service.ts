import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPancard } from 'app/account/admin-services/pancard-list-management/pancard-list-management.model';
// import { IPancard } from 'app/admin/user-management/user-management.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PancardMngmntService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/admin/users');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(user: IPancard): Observable<IPancard> {
    return this.http.post<IPancard>(this.resourceUrl, user);
  }

  update(user: IPancard): Observable<IPancard> {
    return this.http.put<IPancard>(this.resourceUrl, user);
  }

  find(login: string): Observable<IPancard> {
    return this.http.get<IPancard>(`${this.resourceUrl}/${login}`);
  }

  query(req?: Pagination): Observable<HttpResponse<IPancard[]>> {
    const options = createRequestOption(req);
    return this.http.get<IPancard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('api/authorities'));
  }
}
