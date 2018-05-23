/**
 * 创建store，监听store data change事件，初始化store 状态
 * 整个流程其实就是
 * 如果传入了中间件(enhaner)的话，那么就先调用applyMiddleware
 * applyMiddleware，接受中间件, 返回1个高阶函数，参数是redux的createStore方法, 内部结构返回的函数的参数为reducer和preloadedState
 * 在高阶函数内部重新创建store，修改了dispatch，链式化处理middleware
 * middleware也是柯里化，接收包含getState和dispatch两个属性的对象的外部函数，返回高阶函数，高阶函数接收next参数，高阶函数内部函数接收action
 * 在react-thunk中(异步action),就是当检测到action为函数时，直接传入dispatch再调用，如果不是直接dispatch(action)
 * createStore().getState()就是取内部的currentState变量
 * createStore().dispatch(action) action一定是对象并且存在type属性，然后传入currentState和action给combineReducer
 * combineReducers为高阶函数，参数接收reducer对象，过滤掉属性值不是函数的reducer元素，在高阶函数内部遍历过滤后的reducer对象，将key为reduer元素的key的state传入到当前reducer，必须返回值，如果是对象且不能是同一个引用
 * 如果只要1个reducer里返回的值和之前对应的state,那么就重新赋值store的currentState
 * bindActionCreators接收actionCreators和dispatch,将actionCreators重新封装成高阶函数，接收actionCreator和dispatch，返回的函数内部对这两个进行调用
 */

import { createStore as buildStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import fetchToken from './middlewares/fetch-token';
import reducer from './reducers/reducer';

export default function createStore () {
  return buildStore(reducer,
    compose(
      applyMiddleware(fetchToken),
      applyMiddleware(thunk),
      // applyMiddleware(logger)
    )
  );
}
