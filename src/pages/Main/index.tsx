import React, { useContext } from 'react';
import { Aside } from '../../components/Aside';
import { ScreenContext } from '../../context/ContextScreen';
import { Metrics } from '../Metrics';
import { Survey } from '../Survey';
import * as Component from './style';

export const Main = () => {

  const Screen = useContext(ScreenContext);

  return(
    <Component.ContainerMain>
      <Aside />
      <div className="Content">
        {(() => {
          if(Screen.getScreen == 1){
            return <Survey />
          }

          return <Metrics />
        })()}
      </div>
    </Component.ContainerMain>
  );
}