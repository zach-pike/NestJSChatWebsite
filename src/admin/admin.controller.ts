import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminService } from './admin.service';

class DelPubMessageDTO {
    postId: string;
}

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('delPubMessage')
    async delPubMessage(
        @Body() body: DelPubMessageDTO
    ) {
        await this.adminService.delPubMessage(body.postId);

        return {};
    }

    @Get('getAllUsers')
    async getAllUsers() {
        return await this.adminService.getAllUsers();
    }
}
