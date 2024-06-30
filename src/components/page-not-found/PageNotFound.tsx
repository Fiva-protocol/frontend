import React from 'react';

const PageNotFound: React.FC = () => {
    return (
        <div className="container py-8">
            <div className="text-center">
                <h1>404 - Page Not Found</h1>
                <div>The page you are looking for does not exist.</div>
            </div>
        </div>
    );
};

export default PageNotFound;