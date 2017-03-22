import { Speaker } from './speaker';
import { Observable } from 'rxjs';

export class SessionDetails {
  title: string;
  description: string;
  type: string;
  level?: string;
  track?: string;
  room?: string;
  speakers?: Observable<Speaker[]>;

  constructor(rawSessionDetails: any = {}) {
    this.title = rawSessionDetails.title;
    this.description = rawSessionDetails.body;
    this.type = rawSessionDetails.field_session_type || 'keynote';
    this.level = rawSessionDetails.field_session_level;
    this.track = rawSessionDetails.field_session_track_type;
    this.room = rawSessionDetails.field_room;

    if (this.type === 'keynote') {

      const speaker = new Speaker(rawSessionDetails);

      this.speakers = Observable.of([speaker]);
    }
  }
}