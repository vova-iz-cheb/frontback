import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Users = Reflector.createDecorator<string[]>();

export const Money = (...money: string[]) => SetMetadata('money', money);
