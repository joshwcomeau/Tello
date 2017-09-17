import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isMobile } from '../../helpers/responsive.helpers';


const responsiveRouteFactory = size => (routeProps) => {
  const isValid = (
    size === 'mobile' && isMobile() ||
    size === 'desktop' && !isMobile()
  );

  if (!isValid) {
    return <Redirect to="/" />
  }

  return <Route {...routeProps} />;
};

export const DesktopRoute = responsiveRouteFactory('desktop');
export const MobileRoute = responsiveRouteFactory('mobile');

export default responsiveRouteFactory;
