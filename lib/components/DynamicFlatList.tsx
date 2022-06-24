import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { useDynamicList } from '../hooks/useDynamicList';
import { ListWrapper } from './ListWrapper';

type DynamicFlatListProps<T> = FlatListProps<T> & {
  singularMessage: string;
  pluralMessage: string;
  isPlural?: (count: number) => boolean;
};

export const DynamicFlatList = React.forwardRef<
  FlatList,
  DynamicFlatListProps<any>
>(
  (
    { data, singularMessage, pluralMessage, isPlural, ...rest },
    forwardedRef,
  ) => {
    const { rowsCount, columnsCount } = useDynamicList({
      data: data!,
      pluralMessage,
      singularMessage,
      numColumns: rest.numColumns,
      isPlural,
    });

    return (
      <ListWrapper rowsCount={rowsCount} columnsCount={columnsCount}>
        <FlatList data={data} {...rest} ref={forwardedRef} />
      </ListWrapper>
    );
  },
);