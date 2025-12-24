/**
 * Shared type definitions following TypeScript best practices
 */

export interface AnimationConfig {
  duration?: number
  delay?: number
  once?: boolean
}

export interface SectionProps {
  className?: string
  children: React.ReactNode
}

export interface ButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'topmate'
  className?: string
  external?: boolean
}

export interface ListItem {
  id: string
  text: string
}

export interface StepItem {
  id: string
  number: string
  text: string
}
