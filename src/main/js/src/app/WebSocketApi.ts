import {Injectable} from "@angular/core";

import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';

export class WebSocketService {

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJs(`http://localhost:8080/shoe_status`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
