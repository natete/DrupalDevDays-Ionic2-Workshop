import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { Session } from '../shared/session';
import Moment = moment.Moment;

@Injectable()
export class ProgramService {

  private readonly drupalUrl = 'http://your-ip/devdaysseville/api/program';

  private readonly dates = {
    '2017-03-21': 55,
    '2017-03-22': 56,
    '2017-03-23': 57,
    '2017-03-24': 58,
    '2017-03-25': 59,
  };

  constructor(private http: Http) {
  }

  getProgram(date: Moment): Observable<Session[]> {
    const programId = this.dates[date.format('YYYY-MM-D')];

    return this.http
               .get(`${this.drupalUrl}/${programId}`)
               .map(res => res.json())
               .map(rawSessions => rawSessions.map(rawSession => new Session(rawSession)))
               .map(sessions => sessions.sort((s1, s2) => s1.startTime.localeCompare(s2.startTime)));
  }
}
