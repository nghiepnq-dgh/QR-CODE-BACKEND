import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/main/auth/user.entity";
import { FileDoc } from "../document/document.entity";

@Entity()
export class History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User, user => user.historys)
    user: User;

    @ManyToOne(type => FileDoc, document => document.historys)
    document: FileDoc;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;



}