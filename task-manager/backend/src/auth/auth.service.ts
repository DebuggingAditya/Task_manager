import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  createGuestSession() {
    const guestId = `guest_${Math.random().toString(36).substring(2, 9)}`;
    return {
      userId: guestId,
      name: 'Guest User',
      isGuest: true,
    };
  }
}