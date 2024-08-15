import { Injectable } from '@nestjs/common';
import { StuffDto } from './stuff.dto';
import { Client } from 'pg';

@Injectable()
export class StuffService {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: 'benko11',
      password: 'benko11',
      host: '127.0.0.1',
      port: 5432,
      database: 'nixconnect_auth',
    });
    this.client.connect();
  }

  async findAll(): Promise<StuffDto[]> {
    const data = await this.client.query<StuffDto>('SELECT * FROM stuff');
    const rows = data.rows;
    return rows;
  }

  async create(name: string): Promise<StuffDto> {
    const raw = await this.client.query(
      'INSERT INTO stuff(name) VALUES($1) RETURNING id',
      [name],
    );
    const { rows } = raw;
    const { id } = rows[0];

    return await this.findById(id);
  }

  async findById(id: number): Promise<StuffDto> | undefined {
    const inserted = await this.client.query(
      'SELECT * FROM stuff WHERE id = $1',
      [id],
    );
    console.log(inserted);
    return inserted.rows?.[0];
  }
}
