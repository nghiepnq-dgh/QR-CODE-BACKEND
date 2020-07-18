import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, ArrayContains } from "class-validator";
import { TYPE_ROOM } from "src/contants";

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: TYPE_ROOM.CONGCHUNG})
    @IsNotEmpty()
    @ArrayContains([TYPE_ROOM.CONGCHUNG, TYPE_ROOM.DANSU, TYPE_ROOM.DIACHINH])
    type: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

}