export class Session {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  level?: string;
  track?: string;
  type?: string;
  venue?: string;

  constructor(rawSession: any = {}) {
    const times = rawSession.field_start_end_period ? rawSession.field_start_end_period.split('-') : null;

    this.id = rawSession.nid;
    this.title = rawSession.field_break_title || rawSession.title;
    this.startTime = times && times[0].trim();
    this.endTime = times && times[1].trim();
    this.level = rawSession.field_session_level;
    this.track = rawSession.field_session_track_type;
    this.type = rawSession.type;
    this.venue = rawSession.field_break_description || rawSession.field_room;
  }
}