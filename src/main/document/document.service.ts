import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { UserRepository } from '../auth/user.repository';
import * as QRCode from 'qrcode';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import passport = require('passport');
import { User } from '../auth/user.entity';
import { CreateQueryDto } from './dto/query_param.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepository: DocumentRepository,
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
  ) {}

  async createDocService(createDocFileDto: CreateDocFileDto) {
    let user;
    let isUser = true;
    const { identity, email } = createDocFileDto;
    user = await this.userRepository.findUserRepository(identity);

    if (user && email === user.email) {
      throw new BadRequestException(
        `Email ${email} đã được sử dụng cho tài khoản khác, Vui lòng nhập email khác.`,
      );
    }

    //Check if dont have user then create user
    if (!user) {
      isUser = false;
      const userDto = new AuthCredentialsDto();
      userDto.email = email;
      userDto.name = email;
      userDto.password = '12345678';
      userDto.identity = identity;
      userDto.address = '';
      user = await this.userRepository.singUp(userDto);
    }
    const result = await this.documentRepository.createDocumentRepository(
      createDocFileDto,
      user,
    );

    if (result) {
      //genertateQR code
      const qrCode = await QRCode.toDataURL(`${user.id}`);

      const valueTextEail = { qr: qrCode };
      if (!isUser) {
        valueTextEail['user_account'] = user.identity;
        valueTextEail['user_pass'] = user.password;
      }
      // Send mail
      this.mailerService
        .sendMail({
          to: email, // list of receivers
          from: 'testqrtl@gmail.com', // sender address
          subject: 'Tạo hồ sơ thành công!', // Subject line
          // template: isUser ? 'create-document-success' : 'create-document-success-and-create-user',
          // template:  'create_document_success',
          // context: {
          //     ...valueTextEail
          // },
          // text: "Hello world?", // plain text body
          html: isUser
            ? `<h1>Tao hồ sơ thành công </h2>
                <br/>
                <p>Mã hồ sơ: ${result['id']} </p>
                <p>Quét mã QR code để tìm nhanh:</p>
                <img src="${qrCode}"/>
                `
            : `<h1>Tao hồ sơ thành công </h2>
                <br/>
                <p>Bạn chưa có trong hệ thống. Hệ thống sẽ tạo cho bạn một tài khoản để sử dụng </p>
                <p>Tài khoản: ${user.identity}</p>
                <p>Mật khẩu: 12345678</p>
                <i>Vui lòng đổi lại mật khẩu mới. Vì chúng tôi chỉ cấp mật khẩu này đơn giản dễ bị đánh cấp</i>
                <br/>
                <h4>Thông tin hồ sơ: </h4>
                <p>Mã hồ sơ: ${result['id']} </p>
                <p>Quét mã QR code để tìm nhanh:</p>
                <img src="${qrCode}"/>
                `,
        })
        .then(value => {
          console.log(value);
        })
        .catch(e => {
          console.log('Send mail error', e);
        });
    }
    return result;
  }

  async getAllDoc(user: User, createQueryDto: CreateQueryDto) {
    const result = await this.documentRepository.getAllDocRepository(
      user,
      createQueryDto,
    );
    return result;
  }

  async getDocByIdService(id: number) {
    const result = await this.documentRepository.getDocByIdRepository(id);
    return result;
  }
}
