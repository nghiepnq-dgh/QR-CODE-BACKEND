import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { userInfo } from 'os';
import { AuthLoginDto } from './dto/auth-login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    //TODO HASH PASSWORD TO SAVE DATA
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authLoginDto: AuthLoginDto): Promise<string> {
        const { identity, password } = authLoginDto;
        const findUSer = await this.findOne({identity});
        if (!findUSer) {
           throw new BadRequestException("Ngươi dùng không tôn tại. Vui lòng đăng kí trước")
        } else if (await findUSer.validdatePassword(password)) {
            return findUSer.identity;
        } else {
            throw new BadRequestException("Mật khẩu không đúng. Vui lòng thử lại.");
        }
    }

    //TODO REGISTER USER
    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { name, password, address, identity, email } = authCredentialsDto;

        //Check duplicate indentity
        const exitsCmnd = await this.findOne({ identity })
        if (exitsCmnd) {
            throw new BadRequestException("Chứng minh nhân dân không được trùng");
        }

        const exitsEmail = await this.findOne({ email })
        if (exitsEmail) {
            throw new BadRequestException("Email không được trùng");
        }

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.name = name;
        user.password = await this.hashPassword(password, salt);
        user.address = address;
        user.identity = identity;
        user.salt = salt;
        user.email = email;

        const result = await user.save();
        return result;
    }
}
