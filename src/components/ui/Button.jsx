import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    icon = null,
    loading = false,
}) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-kindle-500 text-white hover:bg-kindle-600 active:bg-kindle-700 focus:ring-kindle-500 shadow-sm',
        secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500',
        outline: 'border border-gray-300 text-gray-700 hover:border-kindle-500 hover:text-kindle-600 hover:bg-kindle-50 focus:ring-kindle-500',
        ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm',
        link: 'text-kindle-600 hover:text-kindle-700 underline-offset-4 hover:underline',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-2.5 text-base',
    };

    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        >
            {loading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {!loading && icon && <span>{icon}</span>}
            {children}
        </motion.button>
    );
};

export default Button;
