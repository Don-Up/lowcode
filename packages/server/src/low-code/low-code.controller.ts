import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LowCodeService } from './low-code.service';
import { CreatePageDto } from './dto/create_page.dto';
import { GetUser } from '../utils/GetUserInfo';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('low-code')
export class LowCodeController {
  constructor(private readonly lowCodeService: LowCodeService) {
  }

  /**
   * release the low-code page
   * @param data
   * @param user
   */
  @Post('release')
  @UseGuards(JwtAuthGuard)
  release(@Body() data: CreatePageDto, @GetUser() user: any) {
    return this.lowCodeService.release(data, user);
  }

  /**
   * get the low-code page components
   */
  @Get('release_with_user')
  @UseGuards(JwtAuthGuard)
  getReleaseData(@GetUser() user: any){
    return this.lowCodeService.getReleaseData(user)
  }
}
