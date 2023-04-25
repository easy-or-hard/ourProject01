import express from "express";
import CustomLogger from "../configure/CustomLogger.js";
import * as errors from "../errors/CustomError.js";
const { Request, Response } = express;
const { CustomError } = errors;


export default class ExceptionRouter {
    static #instance;
    #logger = new CustomLogger();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    /**
     *
     * @param { CustomError } err
     * @param {Request} req
     * @param {Response} res
     */
    errorHandler = (err, req, res) => {
        this.#logger.error(err.stack);

        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).send(message);
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async notFound (req, res)  {
        res.status(404).send('Page not found');
    }
}