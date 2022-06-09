export interface SendMailData {
	recipient: string;
	subject: string;
	body: string;
}

export interface MailAdapter{
	send: (data: SendMailData) => Promise<void>
}