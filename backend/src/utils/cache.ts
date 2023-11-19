import { redisClient, jsonCache } from "..";
import { Request, Response, NextFunction } from "express";

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

const getCache = (key: any) => {
  return redisClient.get(key);
};

const setCacheAsJson = async (key: any, data: any) => {
  await jsonCache.set(key, data);
};

const getCacheAsJson = async  (key: any) => {
  const value = await jsonCache.get(key);
  return value;
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
};
