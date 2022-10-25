import { Injectable, Inject } from '@nestjs/common';
import { User, UserWOPH } from 'src/auth/user.dto';
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

    async getAllUsers(): Promise<UserWOPH[]> {
        let snapshot = await database.collection('users').get();

        let users: UserWOPH[] = [];

        for (const doc of snapshot.docs) {
            let data = doc.data();
            users.push({
                username: data.username,
                real_name: data.real_name,
                admin: data.admin,
                uuid: doc.id
            })
        }

        return users;
    }
}
