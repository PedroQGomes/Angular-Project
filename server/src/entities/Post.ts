import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Updoot } from "./Updoot";


@Entity()
@ObjectType()
export class Post extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;


  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: 'integer', default: 0 })
  points!: number;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @ManyToOne(() => User, user => user.posts)
  creator: User;

  @Field()
  @OneToMany(() => Updoot, updoot => updoot.post)
  updoots: Updoot;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}