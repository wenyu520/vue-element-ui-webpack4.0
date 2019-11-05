/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:51:44
 * @LastEditTime: 2019-08-26 16:38:43
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import vuexAlong from 'vuex-along'
import router from '../router/index' //路由
import axiosMethods from '../axios/index.js' //ajax封装
import states from './states'
import DimensionTable from './2DTable'
import InvBill from './invBill'
import Transfer from './transfer'
import ScrollTable from './scrollTable'
import { Message } from 'element-ui'
import { DEEP_CLONE, setCookie, clearCookie,OPEN_DIALOG } from '../common/common.js'
import { vuexAlongFun } from './vuexAlongArray'
import { Loading } from 'element-ui'

Vue.use(vuex)
vuexAlongFun(states)

// vuexAlong.setKey("str")
vuexAlong.watch(['home'], true)
import ModuleIndex from './modules'


// let router = ''
const store = new vuex.Store({
  state: states,
  mutations: {
    currrentGoodFileIsOuSelf(state,data){
      state.currentGoodsFileIsOuSelf = data
    },
    currentRouteIsHome(state,data){
      state.currentRouteIsHome = data
    },
    SET_ROUTER(state, Router) {
      // router = Router
    },
    /**
     * 查询更多 状态 数据 存储
     * @param state
     * @param params
     * @constructor
     */
    SET_MORE_PARAMS(state, params) {
      state[`${state.routeName}ParamsMore`] = params
    },
    /**
     * 登录错误信息提示
     * @param state
     * @param flag 状态
     * @param text 提示内容
     * @constructor
     */
    SET_LOGIN_TIG(state, { flag, text }) {
      Object.assign(state.loginTigParams, {
        status: flag,
        text: text,
      })
    },
      /**
       * 删除本地缓存字段
       * @constructor
       */
      REMOVE_LOCAL_STORAGE(){
          ['ERP', 'MemberCenterOuID','CurrentShop', 'CurrentShopID', 'CurrentShopName', 'ouId', 'GroupId','navigatorLanguage','erpLanguage'].map(item => {
              window.localStorage.removeItem(item)
          })
      },

      SET_CURRENT_SHOP(state, data){
        state.CurrentShop = data
      },
      SET_CURRENT_OU(state, data){
          state.CurrentOu = data
      },
    SET_CURRENT_USER_DATA(state, data) {
      state.currentUserData = data
    },
    setBussinessAreaOuId(state, data) {
      state.BussinessAreaOuId = data
    },
    menuHeightValue(state, data) {
      state.menuWidth += data
    },
    menuWidthValue(state, data) {
      state.menuHeight += data
    },
    setMenuLanguage(state, data) {
      state.menuLanguageKeyRow = data
    },
    changeErpLanguage(state, data) {
      state.erpLanguage = data
    },
    setLanguageChangeFlag(state, data) {
      state.languageChangeFlag = data
    },
    InitConfigLanguage(state, data) {
      state.configLanguage = data
    },
    changeErpUrl(state, data) {
      state.erpUrl = data
    },
    changePageLanguage(state, data) {
      state[data.name + 'LanguageUrl'] = data.text
    },
    initLanguageKey(state, data) {
      state.languageKey = data
    },
    initLanguageUrl(state, data) {
      //state.languageUrl=data;
      state[state.routeName + 'LanguageUrl'] = data
    },
    Push_Route(state, data) {
      state.routeArr.unshift(data)
      window.sessionStorage.setItem('routeArr', JSON.stringify(state.routeArr))
    },
    setRoutes(state, data) {
      //取消路由重定向
      state.routes[data].url = state.routes[data].default
    },
    go(state) {
      //控制slidebar显示隐藏
      state.show = !state.show
    },
    setPageLoading(state, data) {
      state.pageLoading = data
    },
    slidbarData(state) {
      //页签数组
      if (window.localStorage.getItem('ERP') != '') {
        state.slidbarData = JSON.parse(window.localStorage.getItem('ERP'))
      }
    },
    username(state) {
      if (window.localStorage.getItem('_ERP') != '') {
        state.username = JSON.parse(window.sessionStorage.getItem('_ERP'))
      }
    },
    add_bookmark(state, data) {
      state.bookmark.push(data)
    },
    go1(state) {
      state.fixed = true
    },
    go2(state) {
      state.fixed = false
    },
    //导入API
    setImportAPI(state, data) {
      state.importAPI = data
    },
    // 穿梭框模块
    setTransferName(state, data) {
      //设置穿梭框特定名称
      state.transferName = data
    },
    setTransferOptionalApi(state, api) {
      //设置穿梭框可选接口地址
      state[state.transferName + 'TransferOptionalApi'] = api
    },
    setTransferOptionalParams(state, obj) {
      //设置穿梭框可选接口参数
      state[state.transferName + 'TransferOptionalParams'] = obj
    },
    setTransferSelectedApi(state, api) {
      //设置穿梭框已选接口地址
      state[state.transferName + 'TransferSelectedApi'] = api
    },
    setTransferSelectedParams(state, obj) {
      //设置穿梭框已选接口参数
      state[state.transferName + 'TransferSelectedParams'] = obj
    },
    Init_TransferOptional(state, array) {
      //设置穿梭框可选表格数据
      state[state.transferName + 'OptionalTable'] = array
    },
    Init_TransferSelected(state, array) {
      //设置穿梭框已选表格数据
      state[state.transferName + 'SelectedTable'] = array
    },

    // 表格模块
    setTableName(state, name) {
      //对应表格名称
      state.tableName = name
    },
    setQueryParams(state, params) {
      //查询请求参数
      state[state.tableName + 'QueryParams'] = params
    },
    Init_Table(state, data) {
      //表格数据模型
      state[state.tableName + 'Table'] = data
      //console.log(state[state.tableName + 'Table'])
    },
    Table_Sync(state, data) {
      //微信处理返回的同步字段
      state[state.tableName + 'Sync'] = data
    },
    Init_TableClone(state, data) {
      state[state.tableName + 'TableClone'] = data
    },
    setQueryApi(state, api) {
      //查询api地址
      state[state.tableName + 'QueryApi'] = api
    },
    setHttpType(state, httpType) {
      // 设置接口类型
      state[state.tableName + 'HttpType'] = httpType
    },
    tableLoad_Complete(state, data) {
      //加载动画
      if (typeof state[state.tableName + 'TableLoading'] !== 'undefined') {
        state[state.tableName + 'TableLoading'] = data
      }
    },
    tableReload(state,data){
      state.tableReload = data
    },
    Init_pagination(state, data) {
      //页码总数
      state[state.tableName + 'TotalPagination'] = data
    },
    Init_TotalCount(state, data) {
      //总条数
      state[state.tableName + 'TotalCount'] = data
    },
    setCurrentPage(state, page) {
      //当前页码
      state[state.tableName + 'CurrentPage'] = page
    },
    setEachPage(state, page) {
      //设置每页显示条数
      state[state.tableName + 'EachPage'] = page
    },
    setAddColArray(state, array) {
      //重置行内新增集合
      state[state.tableName + 'NewColArray'] = array
    },
    setUpdateColArray(state, array) {
      //重置行内修改集合
      state[state.tableName + 'UpdateColArray'] = array
    },
    setTableSelection(state, array) {
      //设置表格多选集合
      state[state.tableName + 'Selection'] = array
    },
    add_col(state, data) {
      //表格行内新增
      state[state.tableName + 'Table'].unshift(data)
      state[state.tableName + 'NewColArray'].unshift(data)
    },
    Add_UpdateArray(state, data) {
      //行内修改集合
      state[state.tableName + 'UpdateColArray'].push(data)
    },
    get_RowId(state, data) {
      //行id
      state[state.tableName + 'UpdateRowId'] = data
    },
    Init_OuId(state, data) {
      state.OuId = data
    },
    //树形模块
    Init_Tree(state, data) {
      //树型数据
      state[state.treeName + 'TreeData'] = data
    },
    setTreeName(state, data) {
      //设置树形组件数据模型名称
      state.treeName = data
    },
    setInitTreeApi(state, api) {
      //初始化树节点接口地址
      state[state.treeName + 'TreeApi'] = api
    },
    treeLoad_Complete(state, data) {
      //加载动画
      state[state.treeName + 'TreeLoading'] = data
    },
    setTreeQueryParams(state, params) {
      //查询树节点请求参数
      state[state.treeName + 'TreeQueryParams'] = params
    },

    setDialogVisible(state, boolean) {
      //设置对话框是否显示
      state[state.tableName + 'DialogVisible'] = boolean
    },
    Init_userCode(state, data) {
      //登录用户名
      state.user_code = data
    },
    Init_passWord(state, data) {
      //登录密码
      state.pass_word = data
    },
    Init_menu(state, data) {
      //菜单
      state.sideBarMenu = data
    },
    setPermissonMenu(state, data) {
      //权限菜单
      state.PermissonMenu = data
    },
    menu_loading(state, data) {
      //菜单加载
      state.menuLoading = data
    },
    reset_accessToken(state, data) {
      //token
      state.accessToken = data
    },
    TOKEN_FRESHTIME(state, data) {
      //TOKEN刷新时间
      state.token_freshtime = data
    },
    TOKEN_FRESH_FLAG(state, data) {
      //TOKEN刷新标志
      state.token_fresh_flag = data
    },
    //多语言
    set_lang(state, data) {
      state.lang = data
    },
    //多语言包
    set_langEn(state, data) {
      state.langEn = data
    },
    //设置路由名称
    Init_Route(state, data) {
      state.routeName = data
    },
    //按钮权限数据
    Init_Permission(state, data) {
      state[state.routeName + 'Permission'] = data
    },
    //DTO自定义表单验证
    Init_DTO_Rules(state, data) {
      state[state.routeName + 'DTOrules'] = data
    },
    //生成DTO验证对象
    set_Init_Dto_Validators(state, data) {
      state[state.routeName + 'DTOValidators'] = data
    },
    //存储DTO验证对象模型
    set_MODEL_DTO_DATA(state, data) {
      state[state.routeName + 'DTOModelData'] = data
    },
    //打印模板
    set_PrintTemplate(state, data) {
      state[state.routeName + 'PrintTemplate'] = data
    },
    //临时页签组
    Set_temporary(state, data) {
      state.temporary = data
    },
    // resetState () {
    //     store.replaceState(JSON.parse(JSON.stringify(statesDefalut)))
    //     console.log(stateDefalut);
    // },
    setDiyTemplete(state, data) {
      state.diyTempleteArray = data
    },
    //设置导入模块ip
    setDownLoadIp(state, data) {
      state.downLoadIp = data
    },
    Init_Centent_Height(state, data) {
      state.contentHeight = data
    },
    init_table_Height(state, data) {
      state.tableHeight = data
    },
    Init_Source(state, data) {
      //取消异步请求标记
      state.source = Object.assign({}, data)
    },
    Init_Current_Router(state, data) {
      //当前路由
      state.currentRouter = data
    },
    setModuleCode(state, data) {
      //模块编码
      state.moduleCode = data
      // console.log(state.moduleCode)
    },
    orderStatusFn(state, data) {
      //当前路由
      state.orderStatusData = data
    },
    memberStatusFn(state, data) {
      //当前路由
      state.MemberStatusData = data
    },
    orderChannelTypeFn(state, data) {
      //当前路由
      state.orderChannelTypeData = data
    },
    set_keepAliveRouter(state, data) {
      //缓存路由集合
      if (data.flag && state.keepAliveRouter.indexOf(data.value) == -1) { //添加缓存
        state.keepAliveRouter.push(data.value)
      } else if (typeof data !== 'string' &&　!data.flag) { //删除缓存
        if (typeof(data.value) === 'string' && state.keepAliveRouter.findIndex(item => item === data.value) !== -1) {
            state.keepAliveRouter.splice(state.keepAliveRouter.findIndex(item => item === data.value), 1)
        } else if (Array.isArray(data.value)) {//批量删除
          data.value.map(obj=>{
            state.keepAliveRouter.splice(state.keepAliveRouter.findIndex(item => item === obj), 1)
          })
        }
      } else if (data === 'reset') { //清除所有缓存
        state.keepAliveRouter = []
      }
    },
    cardSendDataFn(state, data) {
      //卡券发送
      state.cardSendData = data
    },
    msgSendDataFn(state, data) {
      //消息发送
      state.msgSendData = data
    },
    memberGroupPageFn(state, data) {
      //会员分组
      state.memberGroupEachPage = data
    },
    memberGroupCurrentPageFn(state, data) {
      //会员分组
      state.memberGroupCurrentPage = data
    },
    footTestPageFn(state, data) {
      state.footTestEachPage = data
    },
    footTestCurrentPageFn(state, data) {
      state.footTestCurrentPage = data
    },
    //客单价详情
    customerObjFn(state, data) {
      state.customerObj = data
    },
    //货单价详情
    membershipObjFn(state, data) {
      state.membershipObj = data
    },


    mailInterfaceCurrentPageFn(state, data) {
      //邮件设置
      state.mailInterfaceCurrentPage = data
    },
    mailInterfacePageFn(state, data) {
      //邮件设置
      state.mailInterfaceEachPage = data
    },
    babyInSalesCurrentPageFn(state, data) {
      //会员分组
      state.babyInSalesCurrentPage = data
    },
    msgChatPageFn(state, data) {
      //会员分组
      state.msgChatEachPage = data
    },
    msgChatCurrentPageFn(state, data) {
      //会员分组
      state.msgChatCurrentPage = data
    },
    setIsReload(state, data) {
      // 设置列表页是否重新加载
      state[state.routeName + 'IsReload'] = data
    },
    setGoodsFilesCopyData(state, data) {
      state['goodsFilesCopyData'] = data
    },
  },
  actions: {
    userLogin({ state, commit,dispatch }, data) {
      //用户登录
      const loading = Loading.service({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
      })

      commit('Set_temporary', [])
      commit('REMOVE_LOCAL_STORAGE')
      window.cleanVuexAlong()
      axiosMethods
        .instancePosts('/connect/token', data)
        .then(function(res) {
          // if (state.loginTigParams.isChecked) {//判断记住密码是否勾选
          //     // setCookie(data.get('username'), data.get('password'), 7);
          // } else {
          //     clearCookie();//清空cookie
          // }

          commit('SET_LOGIN_TIG', { flag: true, text: '' })
          resetState()
          state.home.isHomeClick = true
          window.sessionStorage.setItem('erpLanguage', '')
          let win_height = window.innerHeight
          let _height = win_height - 340
          commit('Init_Centent_Height', _height)
          let flag = false
          if (state.username) {
            state.temporaryLogin = state.username
          }
          let temporaryLogin = state.temporaryLogin
          if (temporaryLogin.length == 0) {
            //temporary为空
            flag = true
          } else {
            //temporary不为空
            for (var i = 0; i < temporaryLogin.length; i++) {
              if (temporaryLogin[i].name == 'admin') {
                //相同用户登录
                flag = false
                break
              } else {
                flag = true
              }
            }
          }
          window.sessionStorage.setItem('Token', 'Bearer ' + res.access_token)
          commit('reset_accessToken', res.access_token)
          if (flag) {
            let pushItem = { name: 'admin', accessToken: 'Bearer ' + res.access_token }
            temporaryLogin.push(pushItem)
          }
          window.sessionStorage.setItem('_ERP', JSON.stringify(temporaryLogin))
          commit('username')
          state.alerts = true
          state.url = '/home' //跳转至首页

          // pos收银判断用户 是否重新登录，重新登录则清除pos登录缓存   tbp
          if (data.get('username') != window.localStorage.getItem('user_code')) {
            window.localStorage.removeItem('posLogin')
          }
          window.localStorage.setItem('isLogin', true)
          // pos收银判断用户 是否重新登录，重新登录则清除pos登录缓存   tbp
          // router.push(context.state.url);
          // context.commit('set_keepAliveRouter','reset');
          window.sessionStorage.setItem('TOKEN_FRESHTIME', res.expires_in) //刷新时间
          window.sessionStorage.setItem('TOKEN_FRESH_FLAG', res.refresh_token) //刷新标志
          window.sessionStorage.setItem('IS_SYSTEM', typeof res.is_system === 'undefined' ? false : res.is_system) //刷新标志
          axios
            .get('/api/services/app/OuManagement/GetWithCurrentUser')
            .then(function(res) {
              loading.close()
              localStorage.setItem('countryId',res.data.result.countryId)
              localStorage.setItem('ouId', res.data.result.id)
              localStorage.setItem('GroupId', res.data.result.groupId)
              localStorage.setItem('SET_CURRENT_USER_DATA', JSON.stringify(res.data.result))
              localStorage.setItem('GroupName', res.data.result.groupName)
              localStorage.setItem('ouName', res.data.result.ouName)
              localStorage.setItem('platformType', res.data.result.platformType);
              localStorage.setItem('user_name', res.data.result.userName)//用户名
              // if (Number(res.data.result.platformType) === 1) {
              //   //通用平台
              //   sessionStorage.setItem('SET_NAV_INDEX_LOAD_SYSTEM', 'SYSTEM')
              //   window.location.href = 'basic.html?' //跳转至首页
              //
              // } else if (Number(res.data.result.platformType) === 2) {
              //   sessionStorage.setItem('SET_NAV_INDEX_LOAD_SYSTEM', 'RM')
              //   window.location.href = 'rm.html?' //跳转至零售首页
              // } else {
              //   sessionStorage.setItem('SET_NAV_INDEX_LOAD_SYSTEM', 'SYSTEM')
              //   window.location.href = 'basic.html?' //跳转至首页
              // }
                state.url='/home';//跳转至首页
                router.push(state.url);
            })
            .catch(err => {
              loading.close()
            })
        })
        .catch(err => {
          loading.close()
          commit('SET_LOGIN_TIG', { flag: true, text: err.response.data.error_description })
        })
    },
    // cancel(context,router) {
    //     context.state.source.cancel(router)
    // },
    InitTable(context,_this, fn) {
      //表格初始化
      context.commit('setPageLoading', true)
      context.commit('tableLoad_Complete', true)
      context.commit('setEachPage', context.state[context.state.tableName + 'QueryParams'].MaxResultCount) //重置分页显示条数
      //context.commit('Init_Source',axios.CancelToken.source());
      let AJAX = ''
      if (context.state[context.state.tableName + 'HttpType']) {
        AJAX = axios.post(context.state[context.state.tableName + 'QueryApi'], context.state[context.state.tableName + 'QueryParams'])
      } else if(context.state.tableName==='goodsFilesList'){
        AJAX = axios.post(context.state[context.state.tableName + 'QueryApi'], context.state[context.state.tableName + 'QueryParams'])
      }else {
        AJAX = axios.get(context.state[context.state.tableName + 'QueryApi'], {
          params: context.state[context.state.tableName + 'QueryParams'],
          //cancelToken:context.state.source.token
        })
      }
      AJAX.then(
        function(res) {
          context.commit('setPageLoading', false)
          context.commit('tableLoad_Complete', false)
          context.commit('tableReload', true)
          if (res.data.result == null) {
            let nullData = []
            context.commit('Init_Table', nullData)
            context.commit('Init_TotalCount', 0)
          } else {
            let tableData = []
            let tableClone = []
            let totalCount = 0
            if (res.data.result.pagedResultDtoList) {
              tableData = res.data.result.pagedResultDtoList.items
              if (tableData.length > 0) {
                res.data.result.subtotalDto[context.state[context.state.tableName + 'TotalKey']] = '小计'
                res.data.result.totalDto[context.state[context.state.tableName + 'TotalKey']] = '总计'
                tableData.push(res.data.result.subtotalDto)
                tableData.push(res.data.result.totalDto)
              }
              totalCount = res.data.result.pagedResultDtoList.totalCount
            } else {
              tableClone = DEEP_CLONE(res.data.result.items)
              tableData = res.data.result.items
              totalCount = res.data.result.totalCount
            }
            context.commit('Init_TableClone', tableClone)
            context.commit('Init_Table', tableData)
            context.commit('Init_TotalCount', Number(totalCount))
            let totalPage = Math.ceil(totalCount / context.state[context.state.tableName + 'EachPage'])
            context.commit('Init_pagination', totalPage)
            context.commit('Table_Sync', res.data.result.isSync ? res.data.result.isSync : false) //微信处理返回的同步字段
            context.commit('setAddColArray',[])//置空新增集合
            context.commit('setUpdateColArray',[])//置空修改增集合
          }
          if (typeof fn === 'function') {
            fn()
          }
        },
        function(err) {
          context.commit('setPageLoading', false)
          context.commit('tableLoad_Complete', false)
          OPEN_DIALOG('errDialog', err.error.message, 'onlyOk', _this, 'submit', err.error.details)
        },
      )
    },
    InitTree(context, fn) {
      //树型初始化
      context.commit('setPageLoading', true)
      if(context.state.treeName==='businessAreaList'){
        axios
        .post(context.state[context.state.treeName + 'TreeApi'],
          context.state[context.state.treeName + 'TreeQueryParams'],
        )
        .then(function(res) {
          context.commit('setPageLoading', false)
          if (!Array.isArray(res.data)) {
            context.commit('Init_Tree', res.data.result)
          } else {
            context.commit('Init_Tree', res.data)
          }
          if (typeof fn === 'function') {
            fn()
          }
          context.commit('treeLoad_Complete', false)
        })
        .catch(function(err) {
          context.commit('setPageLoading', false)
        })
      }else{
        axios
        .get(context.state[context.state.treeName + 'TreeApi'], {
          params: context.state[context.state.treeName + 'TreeQueryParams'],
          //cancelToken:context.state.source.token
        })
        .then(function(res) {
          context.commit('setPageLoading', false)
          if (!Array.isArray(res.data)) {
            context.commit('Init_Tree', res.data.result)
          } else {
            context.commit('Init_Tree', res.data)
          }
          if (typeof fn === 'function') {
            fn()
          }
          context.commit('treeLoad_Complete', false)
        })
        .catch(function(err) {
          context.commit('setPageLoading', false)
        })
      }

    },

    InitOptionalTransfer(context) {
      //获取穿梭框可选数据
      axios
        .get(context.state[context.state.transferName + 'TransferOptionalApi'], {
          params: context.state[context.state.transferName + 'TransferOptionalParams'],
        })
        .then(function(res) {
          context.state.ceshiOptionalTotalCount = res.data.result.totalCount //可选数据总条数
          context.commit('Init_TransferOptional', res.data.result.items) //可选数据
          context.state[context.state.transferName + 'OptionalTableLoading'] = false
        })
        .catch(function(err) {
          context.state[context.state.transferName + 'OptionalTableLoading'] = false
        })
    },
    InitSelectedTransfer(context) {
      //获取穿梭框已选数据
      axios
        .get(context.state[context.state.transferName + 'TransferSelectedApi'], {
          params: context.state[context.state.transferName + 'TransferSelectedParams'],
        })
        .then(function(res) {
          context.state.ceshiSelectedTotalCount = res.data.result.totalCount //已选数据总条数
          context.commit('Init_TransferSelected', res.data.result.items) //已选数据
          context.state[context.state.transferName + 'SelectedTableLoading'] = false
        })
        .catch(function(err) {
          context.state[context.state.transferName + 'SelectedTableLoading'] = false
          if (typeof err.timeout != 'undefined' && err.timeout == 15000) {
            Message({
              message: '请求超时，数据加载失败，请重试！',
              type: 'error',
              duration: 5 * 1000,
            })
          } else {
            Message({
              message: err.error.message,
              type: 'error',
              duration: 5 * 1000,
            })
          }
        })
    },
    addCol(context, item) {
      //添加行
      //通过参数传递
      context.commit('add_col', item)
    },
    AddUpdateArray(context, param) {
      let repeat = false
      let key = 'id'
      if (param.updateFlagKey) {
        key = param.updateFlagKey
      }
      for (let i in context.state[context.state.tableName + 'UpdateColArray']) {
        if (param.updateRow[key] === context.state[context.state.tableName + 'UpdateColArray'][i][key]) {
          repeat = true
        } else {
          repeat = false
        }
      }
      if (!repeat) {
        context.commit('Add_UpdateArray', param.updateRow)
      }
    },
    loginCe() {
      router.push('/home')
    },
    ChangeLanguage(context, language) {
      let arr = context.state.routeArr
      if (arr.length === 0) {
        arr = JSON.parse(window.sessionStorage.getItem('routeArr'))
      }
      if (arr.length === 0) {
        return
      } else {
        arr.map(item => {
          axios
            .get('/api/services/app/DtoVaildate/GetLangueTextByUrl', {
              params: {
                url: item,
                cultureInfo: language,
              },
            })
            .then(function(res) {
              if (JSON.stringify(res.data.result) === '{}') {
                Message({
                  message: item + '多语言文本获取失败！',
                  type: 'warning',
                  duration: 5 * 1000,
                })
              } else {
                let a = {
                  name: item,
                  text: res.data.result,
                }
                context.commit('changePageLanguage', a)
              }
            })
        })
      }
    },
  },
  modules: {
    DimensionTable,
    InvBill,
    Transfer,
    ScrollTable,
    ...ModuleIndex
  },
  plugins: [vuexAlong],
})
export default store
const initialStateCopy = JSON.parse(JSON.stringify(store.state))

// const initialHomeStateCopy =  JSON.parse(JSON.stringify(store.state.home))
export function resetState() {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
  store.state.InvBill = {
    // isSearchInv: false,
  }
  store.state.home = {
    moduleCodeIs_MSG: false,
    IS_MSG: [],
    __THIS__: {},
    addBookName: '',
    erpLanguageOption: [],
    twoHoverIndex: '',
    navIndex: 0, // 一级导航点击小标
    towNavIndex: -1, //二级导航点击下标
    threeNavIndex: -1, //三级导航点击下标
    sideBarMenu: [], // 所有目录
    sideBarMenuContainDisable: [],
    versionNumber: '2.0.1', //版本号
    isThreeData: false, //判断是否有三级目录 状态
    sideBarData: [], //页签数组
    AllSystemMenuData: [], //所有已打开页签数据
    systemMenuData: {}, //子系统页签数据
    systemLevelData: {}, //子系统页签数据
    clickThreeStatus: false, //是否三级导航点击
    isHomeClick: false, //首页图标点击
    searchModule: '',
    searchModuleList: [],
    contextMenuArray: [
      {
        text: '关闭当前页签',
        icon: 'icon-tianjia',
      },
      {
        text: '关闭其它页签',
        icon: 'icon-shanchu',
      },
      {
        text: '关闭所有页签并回到首页',
        icon: 'icon-shanchu',
      },
    ],
    visible: false, //popover 隐藏
    depositItem: {}, //存放当前页面
    indexNavObj: {
      moduleName: '首页',
      url: '/home',
      active: true,
    },
    twoNavShow: true,
    asideShow: false,
    scrollShow: false,
    towMouseOver: [],
    sideMouseItem: [],
    systemModule: ['BASIC','SYSTEM', 'CRM', 'OMS', 'RM'],
    eliminateCacheObj: {
      //删除指定页面vuex缓存
      handMessageModify: 'msgSendDataFn',
      cardSendDetail: 'cardSendDataFn',
    },
    publicPageList: [
      //公共页签
      {
        moduleName: '个人信息',
        moduleCode: 'personalInformation',
        url: 'personalInformation',
        active: false,
      },
        {
            moduleName: '系统版本',
            moduleCode: 'systemVersion',
            url: 'systemVersion',
            active: false,
        },
    ],
    maxPageNum: 10,
  }
}
