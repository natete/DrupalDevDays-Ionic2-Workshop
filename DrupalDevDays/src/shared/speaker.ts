import { Company } from './company';

export class Speaker {
  name: string;
  avatar: string;
  nickname?: string;
  position?: string;
  bio?: string;
  company?: Company;

  constructor(rawSpeaker: any = {}) {
    this.name = rawSpeaker.field_speaker_full_name || rawSpeaker.field_register_name;
    this.avatar = rawSpeaker.speaker_image || rawSpeaker.uri || 'assets/images/avatar.svg';
    this.nickname = rawSpeaker.name;
    this.position = rawSpeaker.field_speaker_position;
    this.bio = rawSpeaker.field_speaker_bio;

    if (typeof rawSpeaker.field_company_name !== 'undefined') {
      this.company = {
        name: rawSpeaker.field_company_name,
        logo: rawSpeaker.company_logo,
        bio: rawSpeaker.field_company_bio
      };
    }
  }
}
