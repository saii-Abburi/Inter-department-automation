import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Button = forwardRef(
  ({ className = '', variant = 'default', size = 'md', isLoading = false, children, ...props }, ref) => {
    const baseStyles =
      'font-medium rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      default:
        'bg-medical-dark text-white hover:bg-medical-light shadow-soft-md hover:shadow-soft-lg focus:ring-medical-dark',
      outline:
        'border border-border text-foreground hover:bg-muted focus:ring-medical-dark',
      ghost: 'text-foreground hover:bg-muted focus:ring-medical-dark',
      secondary: 'bg-muted text-foreground hover:bg-muted/80 focus:ring-medical-dark',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </span>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
