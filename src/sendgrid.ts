import {
  EmailProvider,
  ProviderName,
  ProviderType,
  ProviderConstructorOptions,
  SendgridEmailOptions,
} from '@messageraft/common'

import sendgridMail from '@sendgrid/mail'

class SendGridProvider extends EmailProvider {
  name = ProviderName.SENDGRID
  type = ProviderType.EMAIL

  constructor(options: ProviderConstructorOptions) {
    super()
    if (!options.apiKey) throw new Error('Sendgrid API Key not provided')

    sendgridMail.setApiKey(options.apiKey)
  }

  async send(data: SendgridEmailOptions): Promise<any> {
    const recipients = Array.isArray(data.to) ? data.to : [data.to]

    const formattedData = Object.assign(data, { to: recipients })

    return sendgridMail.send(formattedData as sendgridMail.MailDataRequired)
  }
}

export { SendGridProvider as provider }
