import React from 'react';
import { Action, StorageSettings } from './types';
/**
 * HOC providing context storage provider to the component
 */
export declare const withStorageProvider: ({ storageName, defaultValues, reducer, useSession, useLocal, }: StorageSettings) => <P extends {}>(WrappedComponent: React.ComponentType<P>) => (props: P) => JSX.Element;
/**
 * HOC providing context storage values via context prop
 */
export declare const withStorage: (storageName: string) => <P extends {
    context?: {
        storage: object;
        dispatch: (action: Action) => void;
    } | undefined;
}, R = Pick<P, Exclude<keyof P, "context">>>(WrappedComponent: React.ComponentType<P>) => (props: R) => JSX.Element;
