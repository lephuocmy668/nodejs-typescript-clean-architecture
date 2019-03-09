import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { userInteractor } from "../../../domain/constants/decorators";
import { IUserInteractor } from "../../../domain/interfaces/user_cases/user_interactor";

@controller("/api/users")
export class UserController {
    @userInteractor private _userInteractor: IUserInteractor;

    @httpGet("/")
    public async get() {
        return await this._userInteractor.findAll();
    }
}

