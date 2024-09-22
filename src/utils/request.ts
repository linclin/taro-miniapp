import Taro from '@tarojs/taro';
import { request } from '@tarojs/taro';
import customFormatDate from './utils';

type RequestOpts = Omit<request.Option, 'url'>;

const safeRequest = (url: string, options: RequestOpts) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'GET',
      ...options,
      header: {
        'Content-Type': 'application/json',
        ...options?.header,
      },    
    }).then(
      response => {
        resolve(response?.data ?? response);
      },
      err => {
        reject(err);
      },
    );
  });
};

/**
 * get
 * @param url
 * @param opts
 * @returns {Promise}
 */
const get = async (url: string, opts: RequestOpts): Promise<any> => {
  return safeRequest(url, opts);
};

/**
 * post
 * @param url
 * @param opts
 * @returns {Promise}
 */
const post = async (url: string, opts: RequestOpts): Promise<any> => {
  return safeRequest(url, {
    ...opts,
    method: 'POST',
  });
};

/**
 * put
 * @param url
 * @param opts
 * @returns {Promise}
 */
const put = async (url: string, opts: RequestOpts): Promise<any> => {
  return safeRequest(url, {
    ...opts,
    method: 'PUT',
  });
};

/**
 * PATCH
 * @param url
 * @param opts
 * @returns {Promise}
 */
const patch = async (url: string, opts: RequestOpts): Promise<any> => {
  return safeRequest(url, {
    ...opts,
    method: 'PATCH',
  });
};
/**
 * delete
 * @param url
 * @param opts
 * @returns {Promise}
 */
const del = async (url: string, opts: RequestOpts): Promise<any> => {
  return safeRequest(url, {
    ...opts,
    method: 'DELETE',
  });
};

export const logError = (name, action, info) => {
  if (!info) {
    info = 'empty'
  }
  try {
    let deviceInfo = Taro.getSystemInfoSync();  
    const device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }
  let time = customFormatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S')
  console.error(time, name, action, info, device)
  // 如果使用了 第三方日志自动上报
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}

export default {
  get,
  post,
  put,
  patch,
  del,
};
