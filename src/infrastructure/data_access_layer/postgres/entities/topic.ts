import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column() description: string;
}
