import { ResponseError } from '@sendgrid/mail'

export function sendgridErrorHandler(error: ResponseError) {
  return {
    statusCode: error.code,
    message: error.response.body,
  }
}
