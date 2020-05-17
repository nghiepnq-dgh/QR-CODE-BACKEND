import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateDocFileDto } from './dto/create_doc_file.dto'
import { UserRepository } from '../auth/user.repository';
import * as QRCode from 'qrcode';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';


@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepository: DocumentRepository,
        private readonly mailerService: MailerService,
        private readonly userRepository: UserRepository
    ) { }

    async createDocService(createDocFileDto: CreateDocFileDto) {
        let user;
        let isUser = true;
        const { identity, email } = createDocFileDto;
        user = await this.userRepository.findUserRepository(identity);
        console.log("user 1", user);
        //Check if dont have user then create user
        if (!user) {
            console.log("user 1'2", user);
            isUser = false;
            const userDto = new AuthCredentialsDto();
            userDto.email = email;
            userDto.name = email;
            userDto.password = "12345678";
            userDto.identity = identity;
            userDto.address= "";
            user = await this.userRepository.singUp(userDto)
        }
        const result = await this.documentRepository.createDocumentRepository(createDocFileDto, user);
        console.log("user 2", result);

        if (result) {
            let qrCode;
            //genertateQR code
            qrCode = await QRCode.toDataURL(user.id);
            console.log("generateQR", qrCode);

            const valueTextEail = { qr: qrCode };
            if (!isUser) {
                valueTextEail['user_account'] = user.identity;
                valueTextEail['user_pass'] = user.password;
            }
            // Send mail
            this.mailerService.sendMail({
                to: email, // list of receivers
                from: 'nghiepnguyen520@gmail.com', // sender address
                subject: 'Testing Nest MailerModule', // Subject line
                // template: isUser ? 'create_document_success' : "create_document_success_and_create_user",
                // template:  'create_document_success',
                context: {
                    ...valueTextEail
                },
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", 
            }).then(value => {
                console.log(value);
            })
                .catch((e) => {
                    console.log("Send mail error", e);
                });
        }
        return result;
    }
}
