import React from 'react'
import { Selector } from '../Selector'
import { kebabTypes, meatTypes, sauceTypes, sizes } from '../../../constants/kebabOptions'
import { KebabType, MeatType, SauceType, Size } from '../../../types/record'

type SelectorComponentProps<T> = {
  value: T | ''
  onSelect: (value: T) => void
}

export const KebabTypeSelector: React.FC<SelectorComponentProps<KebabType>> = (props) => {
  return (
    <Selector<KebabType>
      title="ケバブの種類"
      options={kebabTypes}
      value={props.value}
      onSelect={props.onSelect}
    />
  )
}

export const MeatTypeSelector: React.FC<SelectorComponentProps<MeatType>> = (props) => {
  return (
    <Selector<MeatType>
      title="肉の種類"
      options={meatTypes}
      value={props.value}
      onSelect={props.onSelect}
    />
  )
}

export const SauceTypeSelector: React.FC<SelectorComponentProps<SauceType>> = (props) => {
  return (
    <Selector<SauceType>
      title="ソースの種類"
      options={sauceTypes}
      value={props.value}
      onSelect={props.onSelect}
    />
  )
}

export const SizeSelector: React.FC<SelectorComponentProps<Size>> = (props) => {
  return <Selector<Size> title="量" options={sizes} value={props.value} onSelect={props.onSelect} />
}
