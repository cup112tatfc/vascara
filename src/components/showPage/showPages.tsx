import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouterType } from 'types/type.router';


export default function showPages(routes: RouterType[]) {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return <Route key={index} path={route.path} element={<route.element/>} />;
    });
  }
  
  return <Routes>{result}</Routes>;
}
