/* eslint-disable */// tslint:disable

import * as request from "superagent";
import {
    SuperAgentStatic,
    SuperAgentRequest,
    Response
} from "superagent";

export type RequestHeaders = {
    [header: string]: string;
}
export type RequestHeadersHandler = (headers: RequestHeaders) => RequestHeaders;

export type ConfigureAgentHandler = (agent: SuperAgentStatic) => SuperAgentStatic;

export type ConfigureRequestHandler = (agent: SuperAgentRequest) => SuperAgentRequest;

export type CallbackHandler = (err: any, res ? : request.Response) => void;

export type Entity = {
    'id' ? : string;
    'browser' ? : string;
    'browserVersion' ? : string;
    'platform' ? : string;
    'platformVersion' ? : string;
    'location' ? : string;
    'error' ? : Error;
};

export type Error = {
    'id' ? : string;
    'type' ? : string;
    'stacktrace' ? : string;
    'project' ? : Project;
};

export type Project = {
    'id' ? : string;
    'name' ? : string;
};

export type Response_getEntities_200 = Array < Entity >
;

export type Response_getErrors_200 = Array < Error >
;

export type Response_getProjects_200 = Array < Project >
;

export type Logger = {
    log: (line: string) => any
};

export interface ResponseWithBody < S extends number, T > extends Response {
    status: S;
    body: T;
}

export type QueryParameters = {
    [param: string]: any
};

export interface CommonRequestOptions {
    $queryParameters ? : QueryParameters;
    $domain ? : string;
    $path ? : string | ((path: string) => string);
    $retries ? : number; // number of retries; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#retrying-requests
    $timeout ? : number; // request timeout in milliseconds; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#timeouts
    $deadline ? : number; // request deadline in milliseconds; see: https://github.com/visionmedia/superagent/blob/master/docs/index.md#timeouts
}

/**
 * Glitchy API
 * @class ApiService
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class ApiService {

    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];
    private requestHeadersHandler ? : RequestHeadersHandler;
    private configureAgentHandler ? : ConfigureAgentHandler;
    private configureRequestHandler ? : ConfigureRequestHandler;

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    setRequestHeadersHandler(handler: RequestHeadersHandler) {
        this.requestHeadersHandler = handler;
    }

    setConfigureAgentHandler(handler: ConfigureAgentHandler) {
        this.configureAgentHandler = handler;
    }

    setConfigureRequestHandler(handler: ConfigureRequestHandler) {
        this.configureRequestHandler = handler;
    }

    private request(method: string, url: string, body: any, headers: RequestHeaders, queryParameters: QueryParameters, form: any, reject: CallbackHandler, resolve: CallbackHandler, opts: CommonRequestOptions) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const agent = this.configureAgentHandler ?
            this.configureAgentHandler(request.default) :
            request.default;

        let req = agent(method, url);
        if (this.configureRequestHandler) {
            req = this.configureRequestHandler(req);
        }

        req = req.query(queryParameters);

        if (this.requestHeadersHandler) {
            headers = this.requestHeadersHandler({
                ...headers
            });
        }

        req.set(headers);

        if (body) {
            req.send(body);

            if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
                headers['content-type'] = 'application/json';
            }
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        if (opts.$retries && opts.$retries > 0) {
            req.retry(opts.$retries);
        }

        if (opts.$timeout && opts.$timeout > 0 || opts.$deadline && opts.$deadline > 0) {
            req.timeout({
                deadline: opts.$deadline,
                response: opts.$timeout
            });
        }

        req.end((error, response) => {
            // an error will also be emitted for a 4xx and 5xx status code
            // the error object will then have error.status and error.response fields
            // see superagent error handling: https://github.com/visionmedia/superagent/blob/master/docs/index.md#error-handling
            if (error) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    private convertParameterCollectionFormat < T > (param: T, collectionFormat: string | undefined): T | string {
        if (Array.isArray(param) && param.length >= 2) {
            switch (collectionFormat) {
                case "csv":
                    return param.join(",");
                case "ssv":
                    return param.join(" ");
                case "tsv":
                    return param.join("\t");
                case "pipes":
                    return param.join("|");
                default:
                    return param;
            }
        }

        return param;
    }

    getEntitiesURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Returns entities
     * @method
     * @name ApiService#getEntities
     */
    getEntities(parameters: {} & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_getEntities_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    postEntitiesURL(parameters: {
        'body': Entity,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create entity
     * @method
     * @name ApiService#postEntities
     * @param {} body - Glitchy API
     */
    postEntities(parameters: {
        'body': Entity,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Entity > | ResponseWithBody < 400, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    getEntitiesByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Get entity
     * @method
     * @name ApiService#getEntitiesById
     * @param {string} id - Glitchy API
     */
    getEntitiesById(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Entity > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    putEntitiesByIdURL(parameters: {
        'id': string,
        'body': Entity,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update entity
     * @method
     * @name ApiService#putEntitiesById
     * @param {string} id - Glitchy API
     * @param {} body - Glitchy API
     */
    putEntitiesById(parameters: {
        'id': string,
        'body': Entity,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Entity > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    deleteEntitiesByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete entity
     * @method
     * @name ApiService#deleteEntitiesById
     * @param {string} id - Glitchy API
     */
    deleteEntitiesById(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, void > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/entities/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    getErrorsURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Returns errors
     * @method
     * @name ApiService#getErrors
     */
    getErrors(parameters: {} & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_getErrors_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    postErrorsURL(parameters: {
        'body': Error,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create error
     * @method
     * @name ApiService#postErrors
     * @param {} body - Glitchy API
     */
    postErrors(parameters: {
        'body': Error,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Error > | ResponseWithBody < 400, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    getErrorsByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Get error
     * @method
     * @name ApiService#getErrorsById
     * @param {string} id - Glitchy API
     */
    getErrorsById(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Error > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    putErrorsByIdURL(parameters: {
        'id': string,
        'body': Error,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update error
     * @method
     * @name ApiService#putErrorsById
     * @param {string} id - Glitchy API
     * @param {} body - Glitchy API
     */
    putErrorsById(parameters: {
        'id': string,
        'body': Error,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Error > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    deleteErrorsByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete error
     * @method
     * @name ApiService#deleteErrorsById
     * @param {string} id - Glitchy API
     */
    deleteErrorsById(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, void > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/errors/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    getProjectsURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Returns projects
     * @method
     * @name ApiService#getProjects
     */
    getProjects(parameters: {} & CommonRequestOptions): Promise < ResponseWithBody < 200, Response_getProjects_200 >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    postProjectsURL(parameters: {
        'body': Project,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create project
     * @method
     * @name ApiService#postProjects
     * @param {} body - Glitchy API
     */
    postProjects(parameters: {
        'body': Project,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Project > | ResponseWithBody < 400, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    getProjectsByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Get project
     * @method
     * @name ApiService#getProjectsById
     * @param {string} id - Glitchy API
     */
    getProjectsById(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Project > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    putProjectsByIdURL(parameters: {
        'id': string,
        'body': Project,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update project
     * @method
     * @name ApiService#putProjectsById
     * @param {string} id - Glitchy API
     * @param {} body - Glitchy API
     */
    putProjectsById(parameters: {
        'id': string,
        'body': Project,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, Project > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

    deleteProjectsByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: QueryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace(
            '{id}',
            `${encodeURIComponent(this.convertParameterCollectionFormat(
                        parameters['id'],
                        ''
                    ).toString())}`
        );

        if (parameters.$queryParameters) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            };
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete project
     * @method
     * @name ApiService#deleteProjectsById
     * @param {string} id - Glitchy API
     */
    deleteProjectsById(parameters: {
        'id': string,
    } & CommonRequestOptions): Promise < ResponseWithBody < 200, void > | ResponseWithBody < 400, void > | ResponseWithBody < 404, void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/projects/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: QueryParameters = {};
        let headers: RequestHeaders = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['accept'] = 'application/json';

            path = path.replace(
                '{id}',
                `${encodeURIComponent(this.convertParameterCollectionFormat(
                    parameters['id'],
                    ''
                ).toString())}`
            );

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                queryParameters = {
                    ...queryParameters,
                    ...parameters.$queryParameters
                };
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve, parameters);
        });
    }

}

export default ApiService;