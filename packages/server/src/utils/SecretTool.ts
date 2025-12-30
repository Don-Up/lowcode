import { createHash } from 'node:crypto';
import { Injectable } from '@nestjs/common';
/**
 * @param getSecret
 */
@Injectable()
export class SecretTool {
  getSecret(data: string) {
    // Create an MD5 hash object, update the content of the hash object to the specified data, and return it in hexadecimal representation
    return createHash('md5').update(data).digest('hex');
  }
}