require("dotenv").load();
import "reflect-metadata";
import { bootstrap } from "./infrastructure/bootstrapping/bootstrap";
import { container } from "./infrastructure/ioc/ioc_container";
import { referenceDataIoCModule } from "./inversify.config";

async function runApp() {
    try {
        const app = await bootstrap(container, referenceDataIoCModule);
        return app;
    } catch (ex) {
        throw (ex);
    }
}

(async () => {
    await runApp();
    // console.log("=======", await <UserInteractorImp>container.get<any>(TYPES.TypeUserInteractor).findAll());
})();

export { runApp };