import React from 'react'
import { Selector } from '../Selector'
import {
  kebabTypes,
  meatTypes,
  sauceTypes,
  sizes,
} from '../../../constants/kebabOptions'
import { KebabType, MeatType, SauceType, Size } from '../../../types/record'

type SelectorComponentProps<T> = {
  value: T | ''
  onSelect: (value: T) => void
}

export const KebabTypeSelector: React.FC<SelectorComponentProps<KebabType>> = ({
  value,
  onSelect,
}) => (
  <Selector
    title="ケバブの種類"
    options={kebabTypes}
    value={value}
    onSelect={onSelect}
  />
)

export const MeatTypeSelector: React.FC<SelectorComponentProps<MeatType>> = ({
  value,
  onSelect,
}) => (
  <Selector
    title="肉の種類"
    options={meatTypes}
    value={value}
    onSelect={onSelect}
  />
)

export const SauceTypeSelector: React.FC<SelectorComponentProps<SauceType>> = ({
  value,
  onSelect,
}) => (
  <Selector
    title="ソースの種類"
    options={sauceTypes}
    value={value}
    onSelect={onSelect}
  />
)

export const SizeSelector: React.FC<SelectorComponentProps<Size>> = ({
  value,
  onSelect,
}) => (
  <Selector
    title="量"
    options={sizes}
    value={value}
    onSelect={onSelect}
  />
)
