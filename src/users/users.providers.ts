import { REPOSITORY } from 'src/constants';
import { User } from './users.model';

export const usersProviders = [{ provide: REPOSITORY, useValue: User }];
