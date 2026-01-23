import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        primary: 'bg-primary-100 text-primary-800',
    };

    return (
        <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`badge ${variants[variant]} ${className}`}
        >
            {children}
        </motion.span>
    );
};

export default Badge;
