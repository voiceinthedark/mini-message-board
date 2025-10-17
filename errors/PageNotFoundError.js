class PageNotFoundError extends Error {
    constructor(message = 'Page Not Found') {
        super(message);
        this.name = 'PageNotFoundError';
        this.statusCode = 404;
    }
}

module.exports = PageNotFoundError;
