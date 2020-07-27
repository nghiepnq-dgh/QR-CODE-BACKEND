import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/main/auth/user.entity';
import { History } from '../history/history.entity';
import { STATUS_DOC } from 'src/common/status_doc';
import { Room } from '../room/room.entity';
@Entity()
export class FileDoc extends BaseEntity {
  @Column()
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  contend: string;

  @Column({ default: STATUS_DOC.NEW })
  status: STATUS_DOC;

  @Column({ nullable: true })
  reason: string;

  @ManyToMany(type => Room, room => room.documents)
  rooms: Room[];

  @ManyToOne(
    type => User,
    user => user.documents,
  )
  user: User;

  @OneToMany(
    type => History,
    history => history.document,
  )
  historys: History[];
}
