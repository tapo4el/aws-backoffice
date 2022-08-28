import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = 502;

        response
            .status(status)
            .json({
                statusCode: status,
                path: request.url,
                error: 'Cannot process request'
            });
    }
}