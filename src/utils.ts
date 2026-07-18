import { GraphQLError } from 'graphql/error';
import { Agent } from 'undici';

const customDispatcher = new Agent({
  keepAliveTimeout: 10000,
  connectTimeout: 5000,
  connections: 100,
})

export const responseIsOkOrThrow = (resp: any, id?: string | number, message?: string) => {
  if (!resp.ok) {
    throw new GraphQLError(`oops! ${message}. \n ID: ${id}`)
  }
}


export const fetchItem = async (url: string) => {
  const resp = await fetch(url);
  responseIsOkOrThrow(resp)

  return await resp.json()
}

export const fetchAllItems = async (ids: number[] | string[], args, info) => {
  const safeLimit = resolveItemsLimitValue(args, info)

  const allItems = ids.slice(0, safeLimit).map(async (id) => {
    const itemResp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      { dispatcher: customDispatcher as any }
    )

    responseIsOkOrThrow(itemResp, id, 'failed fetching story item')

    const itemData = await itemResp.json()

    return itemData
  }) as unknown[]

  return allItems.filter(Boolean);
}

export const resolveItemsLimitValue = (args, info) => {
  const fieldDef = info.parentType.getFields()[info.fieldName];
  const defaultLimit = fieldDef.args.find(arg => arg.name === 'limit')?.defaultValue ?? 100;

  const safeLimit = Math.min(defaultLimit, args.limit ?? defaultLimit)

  return safeLimit;
}
