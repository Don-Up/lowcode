import { Injectable } from '@nestjs/common';
import { CreatePageDto, PageDto } from './dto/create_page.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LowCodeService {

  constructor(private readonly prisma: PrismaService) {
  }

  release(data: CreatePageDto, user: any) {
    // For development, use accountId from data or default to 1
    const accountId = data.accountId || user?.id || 1;

    return {
      code: 200,
      message: `Page "${data.pageName}" released successfully`,
      data: {
        pageId: `page_${Date.now()}`,
        accountId,
      },
    };
  }

  async getReleaseData(user: any) {
    // determine whether the user has released the page
    const lowCode = await this.prisma.page.findFirst({
      where: {
        accountId: user.id,
      },
      include: {
        components: true,
      },
    });
    if (!lowCode) {
      return {
        components: [],
        componentIds: [],
      };
    }
    return {
      components: lowCode.components,
      componentIds: lowCode.components.map(item => item.id),
    };
  }
}
