import type { FieldValidationError, Result, ValidationError } from "express-validator";

// type predicate
const isFieldValidationError = (error: ValidationError): error is FieldValidationError =>
    error !== null &&
    typeof (error as any).path === 'string' &&
    typeof (error as any).location === 'string'



/**
 * create error response in format of interface IAuthErroRes
 */
export function createErrorRes<T extends Result<ValidationError> = Result<FieldValidationError>>(errors: T) {
    const errorObj: Record<string, any> = {}
    errors.array().forEach(er => {
        // check by type predicate
        if (isFieldValidationError(er))
            return errorObj[er.path] = er.msg
    })

    return errorObj
}


