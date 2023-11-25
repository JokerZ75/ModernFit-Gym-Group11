import { redisClient } from "..";
import { Request, Response, NextFunction } from "express";
import JSONCache from "redis-json";

const cacheGetRequest = (key: string, cb: Function) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key).then(async (data: any) => {
      if (data != null) {
        return resolve(JSON.parse(data));
      } else {
        const freshData = await cb();
        redisClient.setex(key, 3600, JSON.stringify(freshData));
        resolve(freshData);
      }
    });
  });
};

const setCacheWithExpire = (key: any, data: any, expire: number) => {
  redisClient.setex(key, expire, JSON.stringify(data));
};

const clearCache = (key: any) => {
  redisClient.del(key);
};

const clearAllCache = () => {
  redisClient.flushall();
};

const setCachePermanent = (key: any, data: any) => {
  redisClient.set(key, JSON.stringify(data));
};

const getCache = async (key: any) => {
  const data = await redisClient.get(key);
  if (data != null) {
    return JSON.parse(data);
  }
  return null;
};

const setCacheAsJson = async (key: any, data: any) => {
  const jsonCache = new JSONCache(redisClient, { prefix: "jsoncache" });

  await jsonCache.set(key, data);
};

const setCacheAsJsonWithExpire = async (
  key: any,
  data: any,
  expireTime: number = 3600
) => {
  const jsonCache = new JSONCache(redisClient, { prefix: "jsoncache" });
  await jsonCache.set(
    key,
    {
      ...data,
    },
    { expire: expireTime }
  );
};

const getCacheAsJson = async (key: any) => {
  const jsonCache = new JSONCache(redisClient, { prefix: "jsoncache" });

  const data = await jsonCache.get(key);
  if (data != null) {
    return data;
  }
  return null;
};

export {
  cacheGetRequest,
  setCacheWithExpire,
  clearCache,
  clearAllCache,
  setCachePermanent,
  getCache,
  setCacheAsJson,
  getCacheAsJson,
  setCacheAsJsonWithExpire,
};
