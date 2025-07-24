import React from 'react'

type ItemProps ={ itemKey:string; itemVal:string}

export const DocumentItem = ({itemKey,itemVal}: ItemProps) => {

  return (
    <li id={itemKey} key={itemKey} >{itemVal}</li>
  )
}
