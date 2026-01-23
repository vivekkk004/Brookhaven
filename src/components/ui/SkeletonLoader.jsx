import Card from './Card';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
    if (type === 'card') {
        return (
            <>
                {[...Array(count)].map((_, index) => (
                    <Card key={index} hover={false}>
                        <div className="skeleton-image" />
                        <div className="skeleton-title" />
                        <div className="skeleton-text" />
                        <div className="skeleton-text w-2/3" />
                    </Card>
                ))}
            </>
        );
    }

    if (type === 'list') {
        return (
            <>
                {[...Array(count)].map((_, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl mb-3">
                        <div className="skeleton w-16 h-16 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                            <div className="skeleton-title" />
                            <div className="skeleton-text" />
                        </div>
                    </div>
                ))}
            </>
        );
    }

    if (type === 'text') {
        return (
            <>
                {[...Array(count)].map((_, index) => (
                    <div key={index} className="skeleton-text" />
                ))}
            </>
        );
    }

    return null;
};

export default SkeletonLoader;
