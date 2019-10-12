import {
    set,
    setPropertyNestedObject,
    add,
    update,
    remove
  } from '../util/actions'
  
  export const state = () => {
    return {
      api: {
        sysKyBaoCao: '/api/v2/crud/syskybaocao'
      },
      loaikybaocaoList: [],
      deletedloaikybaocaoList: [],
      loaikybaocao: {},
      pagination: {
        page: '',
        pageSize: '',
        total: ''
      }
    }
  }
  
  export const mutations = {
    SET_LOAI_KY_BAO_CAO_LIST: set('loaikybaocaoList'),
    SET_DELETED_LOAI_KY_BAO_CAO: set('deletedloaikybaocaoList'),
    SET_PAGINATION: set('pagination'),
    SET_PAGINATION_KEY: setPropertyNestedObject('pagination'),
  
    SET_LOAI_KY_BAO_CAO: set('loaikybaocao'),
  
    ADD_LOAI_KY_BAO_CAO: add('sysKyBaoCao'),
  
    UPDATE_LOAI_KY_BAO_CAO: update('sysKyBaoCao'),
  
    DELETE_LOAI_KY_BAO_CAO: remove('sysKyBaoCao'),
  }
  
  export const actions = {
    async getLoaiKyBaoCaoList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/list`, {
          page: payload.page,
          pageSize: payload.pageSize
  
        })
  
        console.log("data", data.rows)
        commit('SET_LOAI_KY_BAO_CAO_LIST', data.rows)
        commit('SET_PAGINATION', {
          total: data.total,
          page: data.page,
          pageSize: data.pageSize
        })
      } catch (err) {
        console.log('getLoaiKyBaoCaoList', err)
      }
    },
  
    async getDeletedLoaiKyBaoCaoList(
      { state, commit },
      payload = { page: 0, pageSize: 20 }
    ) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/delete-list`, {
          page: payload.page,
          pageSize: payload.pageSize
        }
        )
  
        commit('SET_DELETED_LOAI_KY_BAO_CAO', data.rows)
      } catch (err) {
        console.log('getLoaiKyBaoCaoList', err)
      }
    },
  
    async getLoaiKyBaoCao(
      { state, commit },
      id
    ) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/read`, {
          id: id
        })
  
        commit('SET_LOAI_KY_BAO_CAO', data.rows)
      } catch (err) {
        console.log('getLoaiKyBaoCao', err)
      }
    },
  
    async addLoaiKyBaoCao({ state, commit }, loaikybaocao) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/create`, loaikybaocao)
  
        commit('ADD_LOAI_KY_BAO_CAO', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('addLoaiKyBaoCao', err)
      }
    },
  
    async updateLoaiKyBaoCao({ state, commit }, loaikybaocao) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/update`, loaikybaocao)
  
        commit('UPDATE_LOAI_KY_BAO_CAO', data)
      } catch (err) {
        console.log('updateLoaiKyBaoCao', err)
      }
    },
  
    async deleteLoaiKyBaoCao({ state, commit }, loaikybaocao) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/delete`, loaikybaocao)
  
        commit('DELETE_LOAI_KY_BAO_CAO', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total - 1
        })
      } catch (err) {
        console.log('deleteLoaiKyBaoCao', err)
      }
    },
  
    async restoreLoaiKyBaoCao({ state, commit }, loaikybaocao) {
      const { sysKyBaoCao } = state.api
  
      try {
        const data = await this.$axios.$post(`${sysKyBaoCao}/restore`, loaikybaocao)
  
        commit('ADD_LOAI_KY_BAO_CAO', data)
        commit('SET_PAGINATION_KEY', {
          property: 'total',
          value: state.pagination.total + 1
        })
      } catch (err) {
        console.log('restoreLoaiKyBaoCao', err)
      }
    }
  }
  