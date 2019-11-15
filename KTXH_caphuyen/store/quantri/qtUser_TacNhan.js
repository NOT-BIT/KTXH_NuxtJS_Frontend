import {
    set,
    setPropertyNestedObject,
    add,
    update,
    removeByIds
  } from '@/util/actions'
  
  export const state = () => {
    return {
      api: {
        qtUserTacNhan: '/api/v2/crud/qtusers-tacnhan'
      },
      userTacNhanList: [],
      searchUserTacNhanList: [],
      deletedUserTacNhanList: [],
      userTacNhan: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_USER_TAC_NHAN_LIST: set('userTacNhanList'),
  
    SET_SEARCH_USER_TAC_NHAN_LIST: set('searchUserTacNhanList'),
  
    SET_DELETED_USER_TAC_NHAN: set('deletedUserTacNhanList'),
  
    SET_PAGINATION: set('pagination'),
  
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_USER_TAC_NHAN: set('userTacNhan'),
  
    ADD_USER_TAC_NHAN: add('userTacNhanList'),
  
    UPDATE_USER_TAC_NHAN: update('userTacNhanList'),
  
    DELETE_USER_TAC_NHAN: removeByIds('userTacNhanList')
  }
  
  export const actions = {
    async getUserTacNhanList(
      { state, commit },
      payload = { queryData: {}, page: 0, pageSize: 20 }
    ) {
      const { qtUserTacNhan } = state.api
  
      try {
        const whereData =  { where: payload.queryData}
        const data = await this.$axios.$post(`${qtUserTacNhan}/list`, {
          queryData: whereData,
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        commit('SET_USER_TAC_NHAN_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getUserTacNhanList', err)
      }
    },
  
    async getSearchUserTacNhanList(
      { state, commit },
      text
    ) {
      const { qtUserTacNhan } = state.api
  
      let queryData = {}
      if (text) {
        queryData = {where: { ten: { regexp: `^${text}` } } }
      }
  
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/list`, queryData)
  
        commit('SET_SEARCH_USER_TAC_NHAN_LIST', data.rows)
      } catch (err) {
        console.log('getSearchUserTacNhanList', err)
      }
    },
  
    async getDeletedUserTacNhanList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { qtUserTacNhan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_USER_TAC_NHAN', data.rows)
      } catch (err) {
        console.log('getDeletedUserTacNhanList', err)
      }
    },
  
    async getQTUserTacNhan(
      { state, commit },
      id
    ) {
      const { qtUserTacNhan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/read`, {
          id: id
        })
  
        commit('SET_USER_TAC_NHAN', data)
      } catch (err) {
        console.log('getQTUserTacNhan', err)
      }
    },
  
    async addQTUserTacNhan({ state, commit }, userTacNhan) {
      const res = { isSuccess: false }
      const { qtUserTacNhan } = state.api
      const uuidv1 = require('uuid/v1');
  
      userTacNhan.uid = uuidv1();
      userTacNhan.qtDonViId = userTacNhan.qtDonViId ? Number(userTacNhan.qtDonViId) : userTacNhan.qtDonViId;
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/create`, userTacNhan)
  
        commit('ADD_USER_TAC_NHAN', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('addQTUserTacNhan', err)
      }
  
      return res
    },
  
    async updateQTUserTacNhan({ state, commit }, userTacNhan) {
      const res = { isSuccess: false }
      const { qtUserTacNhan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/update`, userTacNhan)
  
        commit('UPDATE_USER_TAC_NHAN', { value: data })
        res.isSuccess = true
      } catch (err) {
        console.log('updateQTUserTacNhan', err)
      }
  
      return res
    },
  
    async deleteQTUserTacNhan({ state, commit }, idList) {
      const res = { isSuccess: false }
      const { qtUserTacNhan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/delete`, { id: idList })
        if (data) {
          commit('DELETE_USER_TAC_NHAN', idList)
          commit('SET_PAGINATION_KEY', {
            property: 'total',
            value: state.pagination.total - idList.length
          })
          res.isSuccess = true
        }
      } catch (err) {
        console.log('deleteQTUserTacNhan', err)
      }
  
      return res
    },
  
    async restoreQTUserTacNhan({ state, commit }, userTacNhan) {
      const res = { isSuccess: false }
      const { qtUserTacNhan } = state.api
  
      try {
        const data = await this.$axios.$post(`${qtUserTacNhan}/restore`, userTacNhan)
  
        commit('ADD_USER_TAC_NHAN', { newEl: data })
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
        res.isSuccess = true
      } catch (err) {
        console.log('restoreQTUserTacNhan', err)
      }
  
      return res
    }
  }
  
  