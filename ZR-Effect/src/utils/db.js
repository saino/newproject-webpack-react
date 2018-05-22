import { get, set } from './configure-auth';

export default class DB {
  constructor(name, storeName, version) {
    if (!this.checkIsSupport()) {
      alert('浏览器不支持indexedDB');
      return;
    }

    // 创建数据库
    DB.list[ name ] = this;
    this.res = indexedDB.open(name, version);
    this.version = version;
    this.storeName = storeName;

    // 注册固有事件
    this.regHandles({
      success() {
        console.log('连接数据成功');
      },
      error() {
        console.log('连接数据库失败');
      }
    });
  }

  // 注册事件
  regHandles(eventName, eventHandle, context) {
    if (typeof eventName === 'object') {
      context = eventHandle || this;
      Object.keys(eventName).forEach(name => {
        this.res[ `on${ name }` ] = eventName[ name ].bind(context);
      });
    } else {
      context || ( context = this );
      this.res[ `on${ eventName }` ] = eventHandle.bind(context);
    }

    return this;
  }

  // 检测浏览器是否支持indexedDB
  checkIsSupport() {
    return !!window.indexedDB;
  }

  // 创建对象仓库
  createStore(keyPath) {
    let db, store;

    this.res = indexedDB.open(this.name, this.version + 1);
    this.regHandles('upgradeneeded', event => {
      db = event.target.result;

      // 检测对象仓库是否存在，不存在才新创建
      if (!db.objectStoreNames.contains(this.storeName)) {
        store = db.createObjectStore(this.storeName, { keyPath, autoIncrement: false });
        console.log(event.newVersion, 'dd');
        this.updateVersion(event.newVersion);
      } else {
        console.log('存在');
      }
    });
  }

  getStore(db) {
    const tx = db.transaction(this.storeName, 'readwrite');

    return tx.objectStore(this.storeName);
  }

  updateVersion(v) {
    this.version = v;
    set(`indexdb-${ this.name }`, v);
  }

  // 查询单条数据
  findByOne(keyPath, success, error) {
    let store, res;

    this.res = indexedDB.open(this.name, ++this.version);
    this.regHandles({
      upgradeneeded({ newVersion }) {
        this.updateVersion(newVersion);
      },

      success(event) {
        store = this.getStore(event.target.result);
        res = store.get(keyPath);

        res.onsuccess = function () {
          console.log(this.result, 'rs');
          success && success(this.result);
        };
        res.onerror = function (error) {
          console.log(error, 'ddd');
          error && error();
        };
      },

      error(error) {
        console.log(error, '错误');
      }
    });
  }

  // 保存(添加\修改)数据
  save(data, success, error) {
    let store, res;

    this.res = indexedDB.open(this.name, ++this.version);
    this.regHandles({
      upgradeneeded({ newVersion }) {
        this.updateVersion(newVersion);
      },

      success(event) {
        store = this.getStore(event.target.result);
        res = store.put(data);

        res.onsuccess = function () {
          success && success(this.result);
        };
        res.onerror = function () {
          error && error();
        };
      },

      error(error) {
        console.log(error, 'xx')
      }
    });
  }

  // 删除数据
  del(keyPath, success, error) {
    let store, res;

    this.res = indexedDB.open(this.name, ++this.version);
    this.regHandles({
      upgradeneeded({ newVersion }) {
        this.updateVersion(newVersion);
      },

      success(event) {
        store = this.getStore(event.target.result);
        res = store.del(keyPath);

        res.onsuccess = function () {
          success && success(this.result);
        };
        res.onerror = function () {
          error && error();
        };
      }
    });
  }
}

DB.list = {};

// 获取数据库实例
DB.getDatabase = (name, storeName) => {
  if (!(name in DB.list)) {
    return new DB(name, storeName, 1);
  } else {
    DB.list[ name ].version = DB.list[ name ].version + 1;
    return DB.list[ name ];
  }
};
