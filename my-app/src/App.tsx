import React from 'react';
import './App.css';
import { MinefieldCreator } from './Minefield';



export default function App(): any {
  return ( 
    <div>
      <MinefieldCreator 
        height={9} 
        width={9} 
        /> 
    </div>
  )
}

