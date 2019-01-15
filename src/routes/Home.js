import React from 'react';
import { connect } from 'dva';
import { Table, Divider, Tag,Pagination,Button,Popconfirm,message} from 'antd';
import { routerRedux } from 'dva/router';
import *as programHost from '../utils/ajax';
import styles from '../styles/IndexPage.less';
var store = require('store');
@connect(state => ({
  user: state.user,
}))

export default class Home extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            applyList:[],
            totalPage:0,
            currentPage:1,
            columns:[],
        }
    }
    componentWillMount(){
        const userAgent= navigator.userAgent;
	    console.log(userAgent);
        console.log(this.props);
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
            fetch(`${programHost.APIhost}/user/apply/list/${currentPage}/10`, {
                method: 'POST',
                dataType: 'json',
                body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/apply/list/${currentPage}/10`),// 获取token
                }),
                }).then((response) => {
                console.log(response);
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        const arr=res.resource;
                        arr.forEach((item,ind)=>{item.key=ind;});
                        content.setState({totalPage:res.sum,applyList:arr});
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
            title: '手机号',
            key: 'mobile',
            dataIndex: 'tags',
            render: (text,record)=>{return(<span>{record.mobile}</span>)},
          },{
            align:'center',
            title: '生日',
            dataIndex: 'birthday',
           
          },{
            align:'center',
            title: '所在地',
            dataIndex: 'address',
            render: (text,record)=>{return(<span>{record.province+record.city}</span>)},
            key: 'age',
          }, {
            align:'center',
            title: '职业',
            dataIndex: 'occupation',
          
          },{
            align:'center',
            title: '申请项目',
            dataIndex: 'gameServiceNum',
            render: (text,record)=>{
                return(<span>{record.serviceList[record.gameServiceNum-1].title}</span>)
            },
          },{
            align:'center',
            title: '申请状态',
            dataIndex: 'state',
            render: (text,record)=>{
                return(<span>{record.state===3?"已驳回":record.state===2?"已通过":"等待审核"}</span>)
            },
          },{
            align:'center',
            title: '操作',
            dataIndex: 'action',
            render: (text,record)=>{
                return (record.state===1?<div>
                    <Button size="small" type="primary" style={{marginRight:20}}onClick={()=>{this.sureApply(record)}}>同意申请</Button>
                    <Popconfirm placement="top" title="确认驳回申请吗" onConfirm={()=>{this.cancelApply(record);}} okText="是" cancelText="否">
                        <Button size="small" type="danger">驳回申请</Button>
                    </Popconfirm>
                </div>:"")
            },
          },
        ];
          this.setState({columns});
    }
    sureApply(record){
        console.log(record);
        const content =this;
        const sbdata={state:2};
        //联网
        fetch(`${programHost.APIhost}/user/apply/update/${record._id}`, {
            method: 'PUT',
            dataType: 'json',
            body:JSON.stringify(sbdata),
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':programHost.getAuth(`/user/apply/update/${record._id}`),// 获取token
            }),
            }).then((response) => {
            console.log(response);
            response.json().then((res) => {
                console.log(res);
                if(res.statusCode===107){
                    message.success('同意申请成功！！');
                    content.componentWillMount();
                }
                else{ message.warn(res.message);}
                
                },(data) => {
                console.log(data)
            });
        });
    }
    cancelApply(record){
        console.log(record);
        const content =this;
        const sbdata={state:3};
        //联网
        fetch(`${programHost.APIhost}/user/apply/update/${record._id}`, {
            method: 'PUT',
            dataType: 'json',
            body:JSON.stringify(sbdata),
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':programHost.getAuth(`/user/apply/update/${record._id}`),// 获取token
            }),
            }).then((response) => {
            console.log(response);
            response.json().then((res) => {
                console.log(res);
                if(res.statusCode===107){
                    message.success('驳回申请成功！！');
                    content.componentWillMount();
                }
                else{ message.warn(res.message);}
                },(data) => {
                console.log(data)
            });
        });
    }
    changePage (page){
        console.log(page);
        const {totalPage}=this.state;
        if(page>=totalPage){this.setState({currentPage:totalPage});}
        else{ this.setState({currentPage:page});}
        const content=this;
        const sbdata={where:{}};
                //联网
            fetch(`${programHost.APIhost}/user/apply/list/${page}/10`, {
                method: 'POST',
                dataType: 'json',
                body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/apply/list/${page}/10`),// 获取token
                }),
                }).then((response) => {
                console.log(response);
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        const arr=res.resource;
                        arr.forEach((item,ind)=>{item.key=ind;});
                        content.setState({totalPage:res.sum,applyList:arr});
                    }
                    },(data) => {
                    console.log(data)
                });
            });
      }
    render() {
        const {columns,applyList,currentPage,totalPage}=this.state;
        return (
            <div className={styles.normal}>
                <h1 className={styles.title}>用户申请列表</h1>
                <div className={styles.tableDiv}>
                    <Table columns={columns} dataSource={applyList} pagination={false} />
                    <Pagination current={currentPage} onChange={(page)=>{this.changePage(page);}} total={totalPage}/>
                </div>
            </div>
        )
    }
}

