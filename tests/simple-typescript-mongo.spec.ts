import { validateTs } from '@graphql-codegen/testing';
import { plugin, addToSchema } from './../src/index';
import { buildSchema, print, GraphQLSchema } from 'graphql';
import { plugin as tsPlugin } from '@graphql-codegen/typescript';
import { Types, mergeOutputs } from '@graphql-codegen/plugin-helpers';

describe('TypeScript Mongo', () => {
  const validate = async (content: Types.PluginOutput, schema: GraphQLSchema, config: any) => {
    const tsPluginOutput = await tsPlugin(schema, [], config, { outputFile: '' });
    const result = mergeOutputs([tsPluginOutput, content]);
    await validateTs(result);
  };

  const schema = buildSchema(/* GraphQL */ `
    ${print(addToSchema)}

    type Library {
      branch: String!
      test: String!
      elo: String! @computed
      book: Book!
    }
    
    type Book {
      id: String
      title: String
    }

  `);

  describe('Output', () => {
    it('Should compile TypeScript correctly', async () => {
      const result = await plugin(schema, [], {}, { outputFile: '' });
      await validate(result, schema, {});
    });

    it.skip('Should include only the relevant types', async () => {
      const result = await plugin(schema, [], {}, { outputFile: '' });
      console.log("GOZDECKI result", result)
      expect(result).toContain('export type UserDbObject = {');
      expect(result).not.toContain('export type QueryDbObject = {');
    });

  });
});
