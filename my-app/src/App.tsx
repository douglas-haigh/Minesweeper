import React from 'react';
import './App.css';
import { RenderMinefield } from './Minefield';



export default function App(): any {
  return ( 
    <div>
      <RenderMinefield
        height={9} 
        width={9} 
        /> 
    </div>
  )
}

