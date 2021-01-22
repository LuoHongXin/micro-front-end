/**
 * 设置每个加载状态的超出时间
 * Created by luohongxin on 2021/01/17
*/

'use strict';
// 默认超出时间
const DEFAULT_TIMEOUTS = {
    bootstrap: {
      // 超时毫秒数
      milliseconds: 3000,
      // 当超时，是否
      rejectWhenTimeout: false
    },
    mount: {
      // 超时毫秒数
      milliseconds: 3000,
      // 当超时，是否
      rejectWhenTimeout: false
    },
    unmount: {
      // 超时毫秒数
      milliseconds: 3000,
      // 当超时，是否
      rejectWhenTimeout: false
    },
    unload: {
      // 超时毫秒数
      milliseconds: 3000,
      // 当超时，是否
      rejectWhenTimeout: false
    }
};

// 设置启动超时时间
export function setBootstrapMaxTime(milliseconds, rejectWhenTimeout = false) {
    if (typeof milliseconds !== 'number' || milliseconds <= 0) {
      throw new Error(`${type} max time must be a positive integer number of milliseconds`);
    }
    DEFAULT_TIMEOUTS.bootstrap = {
      milliseconds,
      rejectWhenTimeout
    };
}

// 设置挂载超时时间
export function setMountMaxTime(milliseconds, rejectWhenTimeout = false) {
    if (typeof milliseconds !== 'number' || milliseconds <= 0) {
      throw new Error(`${type} max time must be a positive integer number of milliseconds`);
    }
    DEFAULT_TIMEOUTS.mount = {
      milliseconds,
      rejectWhenTimeout
    };
}

// 设置卸载超时时间
export function setUnmountMaxTime(milliseconds, rejectWhenTimeout = false) {
    if (typeof milliseconds !== 'number' || milliseconds <= 0) {
      throw new Error(`${type} max time must be a positive integer number of milliseconds`);
    }
    DEFAULT_TIMEOUTS.unmount = {
      milliseconds,
      rejectWhenTimeout
    };
}

// 设置未加载超时时间
export function setUnloadMaxTime(milliseconds, rejectWhenTimeout = false) {
    if (typeof milliseconds !== 'number' || milliseconds <= 0) {
      throw new Error(`${type} max time must be a positive integer number of milliseconds`);
    }
    DEFAULT_TIMEOUTS.unload = {
      milliseconds,
      rejectWhenTimeout
    };
}

// 确定和查看超时设置
export function ensureAppTimeouts(timeouts = {}) {
    return {
      ...DEFAULT_TIMEOUTS,
      ...timeouts
    }
}

// 设置自定义超时时间
export function reasonableTime(promise, description, timeouts) {
    return new Promise((resolve, reject) => {
      let finished = false;
  
      promise.then(data => {
        finished = true;
        resolve(data);
      }).catch(e => {
        finished = true;
        reject(e);
      });
  
  
      setTimeout(() => maybeTimeout(), timeouts.milliseconds);
  
      function maybeTimeout() {
        if (finished) {
          return;
        }
        let error = `${description} did not resolve or reject for ${timeouts.milliseconds} milliseconds`;
        if (timeouts.rejectWhenTimeout) {
          reject(new Error(error));
        } else {
          console.error(error);
        }
      }
  
    });
  }