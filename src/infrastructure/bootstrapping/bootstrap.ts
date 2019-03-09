import { Container, ContainerModule } from "inversify";
import { TYPES } from "../../domain/constants/injection_type";
import { getCassandraClient, CassandaraClient } from "../data_access_layer/cassandra/cassandra_client";
import { auth } from "cassandra-driver";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as express from "express";
import "../../delivery/http/controllers/user_controller";

export function reqMiddleware(req: express.Request, res: express.Response, next: () => void) {
    console.log(`
    ----------------------------------
    REQUEST MIDDLEWARE
    HTTP ${req.method} ${req.url}
    ----------------------------------
    `);
    next();
}

export function exceptionLoggerMiddleware(error: Error, req: express.Request, res: express.Response, next: () => void) {

    // Log exception
    console.error(`
    ----------------------------------
    EXCEPTION MIDDLEWARE
    HTTP ${req.method} ${req.url}
    ${error.message}
    ${error.stack}
    ----------------------------------
    `);

    // Hide stack from client for security reasons
    const e = { error: "Internal server error" };
    res.status(500).json(e);

}


export async function bootstrap(container: Container, appPort: number = 3000, ...modules: ContainerModule[]) {
    if (container.isBound(TYPES.TypeApp) === false) {
        const dbClient = await getCassandraClient({
            contactPoints: [process.env.CASSANDRA_HOST],
            authProvider: new auth.PlainTextAuthProvider(
                process.env.CASSANDRA_USER || "cassandra",
                process.env.CASSANDRA_PASSWORD || "cassandra"
            )
        });

        container.bind<CassandaraClient>(TYPES.TypeInfrastructureCassandaraClient).toConstantValue(dbClient);
        container.load(...modules);

        // Configure express server
        const server = new InversifyExpressServer(container);

        server.setConfig((app) => {

            // Disable default cache
            app.set("etag", false);

            // Configure requests body parsing
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());

            // Adds some decurity defaults
            app.use(helmet());

            app.use(reqMiddleware);

        });

        server.setErrorConfig((app) => {
            // Catch and log all exceptions
            app.use(exceptionLoggerMiddleware);
        });

        const app = server.build();

        // Run express server
        console.log(`Application listening on port ${appPort}...`);
        app.listen(appPort);

        container.bind<express.Application>(TYPES.TypeApp).toConstantValue(app);

        return app;
    }
}
