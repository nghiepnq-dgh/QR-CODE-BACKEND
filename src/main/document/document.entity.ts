import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/main/auth/user.entity";
import { History } from "../history/history.entity";
@Entity()
export class FileDoc extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Column({ type: 'text' })
    contend: String;

    @ManyToOne(type => User, user => user.documents)
    user: User;

    @OneToMany(type => History, history => history.document)
    historys: History[];

}