import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, onClick = null }) => {
    return (
        <motion.div
            whileHover={hover ? { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)' } : {}}
            onClick={onClick}
            className={`card p-4 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
