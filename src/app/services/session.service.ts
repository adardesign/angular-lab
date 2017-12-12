import {Injectable} from '@angular/core'
import {Sessions} from './mockSessions'

@Injectable()
export class SessionService {
  getSessions()  {
    return  Sessions;
  }
}
