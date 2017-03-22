import { Injectable } from '@angular/core';

declare let devicePush;

@Injectable()
export class NotificationService {

  init() {
    devicePush.register({
      idUser: '584b16cf9c0651fe07933674',
      idApplication: 'b667-581f-3e94-904c',
      position: false,
      additionalData: {}
    });

    document.addEventListener('notificationReceived', (event: any) => {
      devicePush.showNotification(event.data.message);
    });
  }
}