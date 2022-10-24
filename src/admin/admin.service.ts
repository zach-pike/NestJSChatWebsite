import { Injectable, Inject } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.gateway';
import { database } from '../firebase-app';

@Injectable()
export class AdminService {
    constructor(@Inject(ChatGateway) private readonly chatGateway: ChatGateway) {}

    async delPubMessage(message_id: string) {
        try {
            await database.collection("posts").doc(message_id).delete()
            this.chatGateway.triggerRefetch();
        } catch(e) {}
    }
}
