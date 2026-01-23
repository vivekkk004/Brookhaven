import { motion } from 'framer-motion';

const EmptyState = ({
    icon,
    title,
    description,
    action,
    actionLabel
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
        >
            {icon && (
                <div className="w-24 h-24 mb-6 text-gray-300">
                    {icon}
                </div>
            )}
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
                {description}
            </p>
            {action && actionLabel && (
                <button
                    onClick={action}
                    className="btn-primary"
                >
                    {actionLabel}
                </button>
            )}
        </motion.div>
    );
};

export default EmptyState;
