import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { SessionDetails } from '../shared/session-details';
import { SpeakerService } from './speaker.service';

@Injectable()
export class SessionService {

  private readonly drupalUrl = 'http://your-ip/devdaysseville/api/sessions';

  constructor(private http: Http,
              private speakerService: SpeakerService) { }

  getSession(sessionId: string): Observable<SessionDetails> {
    return this.http
               .get(`${this.drupalUrl}/${sessionId}`)
               .map(res => res.json()[0])
               .map(rawSessionDetails => this.buildSession(rawSessionDetails));
  }

  private buildSession(rawSessionDetails): SessionDetails {
    const session = new SessionDetails(rawSessionDetails);

    if (session.type !== 'keynote') {
      session.speakers = this.speakerService.getSpeakers(rawSessionDetails.field_user_ref);
    }

    return session;
  }
}
