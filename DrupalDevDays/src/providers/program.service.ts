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
    '2017-03-24': 258,
    '2017-03-25': 259,
  };

  constructor(private http: Http) {
  }

  getProgram(date: Moment): Observable<Session[]> {
    const programId = this.dates[date.format('YYYY-MM-D')];

    return this.http
               .get(`${this.drupalUrl}/${programId}`)
               .map(res => res.json())
               .map(rawSessions => rawSessions.map(rawSession => new Session(rawSession)))
               .map(sessions => sessions.sort((s1: Session, s2: Session) => this.compareTimes(s1.startTime, s2.startTime)));
  }

  private compareTimes(time1: string, time2: string): number {
    return this.padTimeWithZeros(time1).localeCompare(this.padTimeWithZeros(time2));
  }

  private padTimeWithZeros(str: string): string {
    return ('0' + str).substr(-5);
  }
}
