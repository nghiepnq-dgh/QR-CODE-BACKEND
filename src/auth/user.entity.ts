import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { IsOptional, IsNotEmpty, ArrayContains, IsEmail } from "class-validator";
import { ROLE_USER } from "src/contants";
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['identity', 'email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: String;

    @Column()
    name:string;

    @Column()
    password:string;

    @Column()
    @IsOptional()
    address:string;

    @Column()
    identity:string;

    @Column({ default: ROLE_USER.NORMAL})
    @IsNotEmpty()
    @ArrayContains([ROLE_USER.NORMAL, ROLE_USER.ACCEPTER, ROLE_USER.ADMIN])
    role:string;

    @Column()
    salt: string;

    async validdatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}