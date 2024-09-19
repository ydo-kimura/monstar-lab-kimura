import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

export function Button({ children, variant = 'default', ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-semibold transition-colors"
  const variantStyles = {
    default: "bg-[#fcff01] text-gray-900 hover:bg-opacity-80",
    outline: "bg-transparent text-[#fcff01] border border-[#fcff01] hover:bg-[#fcff01] hover:text-gray-900"
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}