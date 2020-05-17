import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/main/auth/user.entity";
import { IsEmail } from "class-validator";

@Entity()
export class FileDoc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: String;

    @Column({ type: 'text' })
    contend: String;

    @ManyToOne(type => User, user => user.documents)
    user: User;

}