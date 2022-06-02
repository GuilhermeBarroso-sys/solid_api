export interface SendMailData {
	subject: string;
	body: string;
}

export interface MailAdapter{
	send: (data: SendMailData) => Promise<void>
}