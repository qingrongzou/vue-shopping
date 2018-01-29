import Vue from 'vue'
// 存放数据
const state = {
  orderList: [],
  params: {}
}

const getters = {
  // 无法直接使用state里面的数据,需要通过getters返回state里面的数据
  getOrderList: state => state.orderList
}

// 异步
const actions = {
  fetchOrderList ({commit, state}) {
    Vue.http.post('https://easy-mock.com/mock/5a5dce8524f2fc35a9bf568b/example_1516097157361/getOrderList', state.params).then(
      (res) => {
        commit('updateOrderList', res.data.list)
      }
    )
  }
}

// 同步
const mutations = {
  updateOrderList (state, payload) {
    state.orderList = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
