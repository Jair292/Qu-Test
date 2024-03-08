import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOMAIN, PLANETS_PATH } from '../constants/services-constants';
import { RequestParametersT } from '../types/types';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class dataService {
  private http = inject(HttpClient);
  private domain = DOMAIN;
  private planetsPath = PLANETS_PATH;
  private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  getPlanets({search, searchQ}: RequestParametersT) {
    return this.http.get(`${this.domain}/${this.planetsPath}`, { headers: this.headers });
  }

  async getPlanetPropertyInfo(propUris: string[] | undefined) {
    if (!propUris || !propUris.length) {
      return [];
    }
    const promises: Promise<any>[] = [];
    propUris.map((uri) => {
      promises.push(lastValueFrom(this.http.get(uri, { headers: this.headers })));
    });

    return await Promise.all(promises);
  }
}