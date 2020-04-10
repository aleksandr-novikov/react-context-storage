import React from 'react';
import { ContextStorage } from './types';
export declare const createStorage: (storageName: string) => React.Context<ContextStorage>;
export declare const getStorage: (storageName: string) => React.Context<ContextStorage> | null;
