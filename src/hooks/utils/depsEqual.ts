import { isEqual } from 'lodash';
import React, { DependencyList } from 'react';

const depsEqual = (
  prevDeps: DependencyList = [],
  nextDeps: DependencyList = [],
) => isEqual(prevDeps, nextDeps);

export default depsEqual;
