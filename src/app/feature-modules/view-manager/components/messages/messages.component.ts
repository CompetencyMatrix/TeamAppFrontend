import { Component } from '@angular/core';
import { MessageService } from '../../../../core/services/message/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  isChatOpen = false;
  constructor(public messageService: MessageService) {}

  openChatWindow() {
    this.isChatOpen = true;
  }

  closeChatWindow() {
    this.isChatOpen = false;
  }

  clearMessages() {
    this.messageService.clear();
    this.closeChatWindow();
  }
}
