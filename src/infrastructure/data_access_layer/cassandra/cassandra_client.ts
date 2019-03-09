
import { auth } from "cassandra-driver";

export interface CassandraConnection {
    contactPoints: string[];
    authProvider: auth.PlainTextAuthProvider;
}

export interface CassandaraClient { };

export async function getCassandraClient(connection: CassandraConnection, option?: any): Promise<CassandaraClient> {
    return new Promise<CassandaraClient>((resolve, reject) => {
        const cassandaraClient = require("cassanknex")({
            connection: connection,
            exec: option || { prepare: false }
        });
        cassandaraClient.on("ready", (err: any) => {
            return err ? reject(err) : resolve(cassandaraClient);
        });
    });
}

