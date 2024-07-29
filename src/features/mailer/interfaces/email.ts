import { EmailTemplate } from '@/features/mailer/enums';

export interface IResetPasswordEmailParams {
  email: string;
  resetLink: string;
}

export type EmailParams<EmailType extends EmailTemplate> =
  EmailType extends EmailTemplate.ForgotPassword ? IResetPasswordEmailParams : never;
