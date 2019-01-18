import React from 'react';
import { connect } from 'dva';
import { Table, Divider, Tag,Pagination,Button,Popconfirm,message} from 'antd';
import *as programHost from '../utils/ajax';
import styles from '../styles/IndexPage.less';
var store = require('store');
@connect(state => ({
  user: state.user,
}))


export default class User extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            userList:[],
            totalPage:0,
            currentPage:1,
            columns:[],
        }
    }
    componentWillMount(){
        var username=store.get("storeuser");
        if(!username){
            const{dispatch,history}=this.props;
            // dispatch(routerRedux.push({pathname:"/"}));
            history.push({pathname:"/"})
        }
        else {
            const {currentPage}=this.state;
            const content =this;
            const sbdata={where:{}};
                //联网
            fetch(`${programHost.APIhost}/user/list/${currentPage}/10`, {
                method: 'GET',
                // dataType: 'json',
                // body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/list/${currentPage}/10`),// 获取token
                }),
                }).then((response) => {
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        const arr=res.resource;
                        arr.forEach((item,ind)=>{item.key=ind;});
                        content.setState({totalPage:res.sum,userList:arr});
                    }
                    },(data) => {
                    console.log(data)
                });
            });
        }
    }
    componentDidMount(){
        const columns=[{
            align:'center',
            title: '用户名',
            dataIndex: 'username',
          },{
            align:'center',
            title: '昵称',
            dataIndex: 'nickname',
            
          },{
            align:'center',
            title: '手机号',
            key: 'mobile',
            dataIndex: 'tags',
            render: (text,record)=>{return(<span>{record.mobile}</span>)},
          },{
            align:'center',
            title: '申请时间',
            dataIndex: 'createTime',
            render: (text,record)=>{return(<span>{new Date(record.createTime).toISOString()}</span>)},
          },{
            align:'center',
            title: 'QQ号',
            dataIndex: 'qq',
            
          },{
            align:'center',
            title: '用户等级',
            dataIndex: 'userLevel',
          
          },{
            align:'center',
            title: '钻石数量',
            dataIndex: 'diamonds',
          },{
            align:'center',
            title: '是否是主播',
            dataIndex: 'anchorState',
            render: (text,record)=>(<span>{record.anchorState?'是':'否'}</span>),
          }
        ];
          this.setState({columns});
    }
    changePage (page){
        const {totalPage}=this.state;
        if(page>=totalPage){this.setState({currentPage:totalPage});}
        else{ this.setState({currentPage:page});}
        const content=this;
        const sbdata={where:{}};
                //联网
            fetch(`${programHost.APIhost}/user/list/${page}/10`, {
                method: 'GET',
                // dataType: 'json',
                // body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/list/${page}/10`),// 获取token
                }),
                }).then((response) => {
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        const arr=res.resource;
                        arr.forEach((item,ind)=>{item.key=ind;});
                        content.setState({totalPage:res.sum,userList:arr});
                    }
                    },(data) => {
                    console.log(data)
                });
            });
      }
    render() {
        const {columns,userList,currentPage,totalPage}=this.state;
        return (
            <div className={styles.normal}>
                <h1 className={styles.title}>用户申请列表</h1>
                <div className={styles.tableDiv}>
                    <Table columns={columns} dataSource={userList} pagination={false} />
                    <Pagination current={currentPage} onChange={(page)=>{this.changePage(page);}} total={totalPage}/>
                </div>
            </div>
        )
    }
}

