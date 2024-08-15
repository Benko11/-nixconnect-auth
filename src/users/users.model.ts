import { DataTypes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @Unique @Column nickname: string;
  @Column password: string;

  @CreatedAt
  @Default(DataTypes.NOW)
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Default(DataTypes.NOW)
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
