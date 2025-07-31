// 

const getJWTSecret = () => {

    // use test secret in test environment
    if(process.env.NODE_ENV == 'test') {
        return process.env.JWT_TEST_SECRET || 'fallback_test_secret';
    }

    // in dev/production use main secret
    return process.env.JWT_SECRET || (() => {
        throw new Error('JWT_SECRET is required in production');
    })();;
}

module.exports = { getJWTSecret };