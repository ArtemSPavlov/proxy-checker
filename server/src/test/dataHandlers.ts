import { Connection } from "typeorm"

export async function loadTestData(connection: Connection, repo: any, data: any): Promise<void>{
    connection
        .createQueryBuilder()
        .insert()
        .into(repo)
        .values(data)
        .execute()
}

export async function deleteTestData(connection: Connection, repo: any): Promise<void>{

    connection
        .getRepository(repo)
        .createQueryBuilder()
        .softDelete();
}