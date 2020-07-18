import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/main/auth/user.entity';
import { History } from '../history/history.entity';
import { STATUS_DOC } from 'src/common/status_doc';
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

  @Column({ nullable: true })
  location: string;

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
