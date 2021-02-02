import { Token } from "../auth/token.entity";
import { Proxy } from "../proxy/proxy.entity";
import { User } from "../user/user.entity";

export default () => ({
    DBConfig: {
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [User, Proxy, Token],
        synchronize: true,
      },
      DBConfigTest: {
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.TEST_DB,
        entities: [User, Proxy, Token],
        synchronize: true,
      },
})