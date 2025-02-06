import { getConnection } from "typeorm";
import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./montadora.entity";

export const resolvers = {
  Query: {
    // montadoras: () => Montadora.find()
    montadoras: (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)
      return Montadora.find()
    },
    montadora(_parent: void, {id}: {id: number}) {
      return Montadora.findOneByOrFail({ id });
    }
  },
  Mutation: {
    async addMontadora(_parent: void, {input: {nome}}: {input:{nome:string}}) {
      const id = await Montadora
        .createQueryBuilder()
        .insert()
        .values([{ nome }])
        .returning("id")
        .execute();
      return { id,nome };
    },
    // async updateMontadora(_parent: void, {id, input: {nome}}: {id: number, input:{nome:string}}) {
    //   await Montadora
    //     .createQueryBuilder()
    //     .update()
    //     .set({ nome })
    //     .execute();
    //   return { id,nome };
    // },
    async excluiMontadora(_parent: void, {id}: {id: number}) {
      await Montadora
        .createQueryBuilder()
        .delete()
        .whereInIds(id)
        .execute();
      return id;
    },
  },
};