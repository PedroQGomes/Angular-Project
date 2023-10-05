import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { Updoot } from "./Updoot";


@Entity()
@ObjectType()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  //@Field() para nao ser exposta nas queries futuras
  @Column()
  password!: string;


  @OneToMany(() => Post, post => post.creator)
  posts: Post[];


  @OneToMany(() => Updoot, updoot => updoot.user)
  updoots: Updoot[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}