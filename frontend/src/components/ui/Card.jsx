import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Card = forwardRef(
  ({ className = '', hoverable = false, children, ...props }, ref) => {
    const baseStyles =
      'rounded-lg border border-border bg-card text-card-foreground shadow-soft'

    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          className={`${baseStyles} ${className}`}
          whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 42, 71, 0.12)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          {...props}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className={`${baseStyles} ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card

export function CardHeader({ className = '', ...props }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

export function CardTitle({ className = '', ...props }) {
  return <h2 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}

export function CardDescription({ className = '', ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

export function CardFooter({ className = '', ...props }) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}
