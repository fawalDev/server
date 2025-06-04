// type predicate
const isFieldValidationError = (error) => error !== null &&
    typeof error.path === 'string' &&
    typeof error.location === 'string';
/**
 * create error response in format of interface IAuthErroRes
 */
export function createErrorRes(errors) {
    const errorObj = {};
    errors.array().forEach(er => {
        // check by type predicate
        if (isFieldValidationError(er))
            return errorObj[er.path] = er.msg;
    });
    return errorObj;
}
