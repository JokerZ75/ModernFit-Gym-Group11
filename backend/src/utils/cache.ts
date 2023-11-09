import { redisClient } from "..";
import { Request, Response, NextFunction } from "express";

const cacheGetRequest = (key: string, cb: Function) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key).then(async (data: any) => {
      if (data != null) {
        return resolve(JSON.parse(data));
      } else {
        const freshData = await cb();
        redisClient.setEx(key, 3600, JSON.stringify(freshData));
        resolve(freshData);
      }
    });
  });
};

const setCacheWithExpire = (key: string, data: any, expire: number) => {
  redisClient.setEx(key, expire, JSON.stringify(data));
};

const clearCache = (key: string) => {
  redisClient.del(key);
};

const clearAllCache = () => {
  redisClient.FLUSHALL();
};

const setCachePermanent = (key: string, data: any) => {
  redisClient.set(key, JSON.stringify(data));
};

const getCache = (key: string) => {
  return redisClient.get(key);
};



export { cacheGetRequest, setCacheWithExpire, clearCache, clearAllCache, setCachePermanent, getCache };
