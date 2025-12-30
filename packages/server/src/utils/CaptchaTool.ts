import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
/**
 * @param captche 随机⽣成图⽚验证码
 */
@Injectable()
export class CaptchaTool {
  async captche() {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码⻓度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 1, // ⼲扰线
    });
    return captcha;
  }
}