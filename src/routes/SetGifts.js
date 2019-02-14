import React from 'react';
import moment from 'moment';
import { Form, Icon, Input, Button,message, Checkbox,Upload,Row,Col,InputNumber,Select,Table,Pagination,Modal } from 'antd';
import styles from '../styles/IndexPage.less';
import *as programHost from '../utils/ajax';
var store = require('store');

export default class SetGifts extends React.Component {
	constructor(props) {
    super(props);
    this.state={
        a:1,
        giftImg:'',
        previewImg:'',
        previewVisible:false,
        giftMeili:1,
        giftName:'',
        upToken:'',
        giftPrice:1,
        giftRemark:'',
        giftNumber:0,
        fileList:[],
        giftTypeArr:[
            {id:1,label:'普通礼物'},
            {id:2,label:'冠名礼物'},
            {id:3,label:'活动礼物'},
            // {id:4,label:'礼物'},
        ],
        giftType:{id:1,label:'普通礼物'},
        giftList:[],
        colums:[],
        currentPage:1,
        totalPage:0,
        editing:false,
        giftId:'',
    }
      
 }
	componentWillMount(){
        const content =this;
        //七牛uptoken
        fetch(`https://www.neptune66.cn/zhaoliangji/admin/goods/getPanDuoLaQiNiuUpToken`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }),
            }).then((response) => {
            response.json().then((res) => {
                console.log(res);
                if(res.code===1){
                    content.setState({upToken:res.data.upToken});
                }
                },(data) => {
                console.log(data)
            });
            });
        const {currentPage}=this.state;
        
        const sbdata={where:{}};
            //联网
        fetch(`${programHost.APIhost}/admin/get/gift/list/${currentPage}/10`, {
            method: 'POST',
            dataType: 'json',
            body:JSON.stringify(sbdata),
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':programHost.getAuth(`/admin/get/gift/list/${currentPage}/10`),// 获取token
            }),
            }).then((response) => {
            console.log(response);
            response.json().then((res) => {
                console.log(res);
                if(res.statusCode===107){
                    const arr=res.resource;
                    arr.forEach((item,ind)=>{item.key=ind;});
                    content.setState({totalPage:res.sum,giftList:arr});
                }
                },(data) => {
                console.log(data)
            });
        });
  }
  componentDidMount(){
      const colums=[
        {
            align:'center',
            title: '礼物名称',
            dataIndex: 'name',
        },
        {
            align:'center',
            title: '礼物图片',
            dataIndex: 'icon',
            render: (text,record)=>{return(<img style={{width:50,height:50}} src={record.icon}/>)},
        },
        {
            align:'center',
            title: '礼物价格（钻石）',
            dataIndex: 'price',
        },
        {
            align:'center',
            title: '导师获得魅力值',
            dataIndex: 'meiliValue',
        },
        {
            align:'center',
            title: '礼物序号',
            dataIndex: 'codeNum',
        },
        {
            align:'center',
            title: '礼物介绍',
            dataIndex: 'note',
        },
        {
            align:'center',
            title: '操作',
            dataIndex: 'action',
            render: (text,record)=>{return(<div><Button size="small" type="primary"style={{marginRight:10}} onClick={()=>{this.editGift(record)}}>编辑</Button><Button size="small" type="primary"onClick={()=>{this.deleteGift(record)}}>删除</Button></div>)},
        },
      ];
      this.setState({colums});
  }
   //上传礼物图
   handleChange(file) { console.log(file); this.setState({fileList:file.fileList,giftImg:file.file.status==="done"?"http://panduola.media.neptune66.cn/"+file.file.response.hash:""})}
   //预览礼物图
   handlePreview(file){this.setState({ previewImg: file.url || file.thumbUrl,previewVisible: true,});}
   handleCancel(){this.setState({ previewVisible: false });}
  submitGift(){
    const {giftImg,giftName,giftPrice,giftRemark,giftNumber,giftMeili,giftType}=this.state;
    const sbdata={
        name: giftName,
        icon:giftImg,
        price:giftPrice,
        meiliValue:giftMeili,
        giftType:giftType.id,
        type: 1,
        codeNum:giftNumber,
        note:giftRemark,
        state:1,
    }
    console.log(sbdata);
    const content=this;
    fetch(`${programHost.APIhost}/admin/add/gift/info`, {
        method: 'POST',
        dataType: 'json',
        body:JSON.stringify(sbdata),
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':programHost.getAuth('/admin/add/gift/info'),// 获取token
        }),
        }).then((response) => {
        console.log(response);
        response.json().then((res) => {
            console.log(res);
           if(res.statusCode===107){ message.success(res.message);content.emptyGift();content.componentWillMount();}
           else{message.warn(res.message);}
            },(data) => {
            console.log(data)
        });
    });
  }
  emptyGift(){
      this.setState({
        giftImg:'',
        giftMeili:1,
        giftName:'',
        giftPrice:1,
        giftRemark:'',
        giftNumber:0,
        giftType:{id:1,label:'普通礼物'},
      });
  }
  editGift(record){
    console.log(record);
    // const {giftTypeArr}=this.state;
    // let giftType={};
    // giftTypeArr.map((item,index)=>{
    //     if(item.id===record.type){
    //         giftType.id=record.type;
    //         giftType.label=item.label;
    //     }
    // })
    this.setState({
        editing:true,
        giftImg:record.icon,
        giftMeili:record.meiliValue,
        giftName:record.name,
        giftPrice:record.price,
        giftRemark:record.note,
        giftNumber:record.codeNum,
        // giftType,
        giftId:record._id,
    })
}
  deleteGift(record){
      console.log(record);
      const content = this;
      fetch(`${programHost.APIhost}/admin/del/gift/info/${record._id}`, {
        method: 'DELETE',
        dataType: 'json',
        // body:JSON.stringify(sbdata),
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':programHost.getAuth(`/admin/del/gift/info/${record._id}`),// 获取token
        }),
        }).then((response) => {
        console.log(response);
        response.json().then((res) => {
            console.log(res);
           if(res.statusCode===107){
                message.success(res.message);
                content.componentWillMount();
            }
           else{message.warn(res.message);}
            },(data) => {
            console.log(data)
        });
    });
  }
    handleOk(){
        const {giftImg,giftName,giftPrice,giftRemark,giftNumber,giftMeili,giftType,giftId}=this.state;
        const sbdata={
            name: giftName,
            icon:giftImg,
            price:giftPrice,
            meiliValue:giftMeili,
            // giftType:giftType.id,
            // type: 1,
            codeNum:giftNumber,
            note:giftRemark,
            state:1,
        }
        console.log(sbdata);
        const content=this;
        fetch(`${programHost.APIhost}/admin/get/gift/info/${giftId}`, {
            method: 'PUT',
            dataType: 'json',
            body:JSON.stringify(sbdata),
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':programHost.getAuth(`/admin/get/gift/info/${giftId}`),// 获取token
            }),
            }).then((response) => {
            console.log(response);
            response.json().then((res) => {
                console.log(res);
            if(res.statusCode===107){ message.success(res.message);content.emptyGift();content.componentWillMount();content.setState({editing:false})}
            else{message.warn(res.message);}
                },(data) => {
                console.log(data)
            });
        });
    }

    cancelSend() {
      this.setState({
        editing:false,
        giftImg:'',
        giftMeili:1,
        giftName:'',
        giftPrice:1,
        giftRemark:'',
        giftNumber:0,
        giftType:{id:1,label:'普通礼物'},
      })
  }
  changePage (page){
    console.log(page);
    const {totalPage}=this.state;
    if(page>=totalPage){this.setState({currentPage:totalPage});}
    else{ this.setState({currentPage:page});}
    const content=this;
    const sbdata={where:{}};
            //联网
        fetch(`${programHost.APIhost}/admin/add/gift/info`, {
            method: 'POST',
            dataType: 'json',
            body:JSON.stringify(sbdata),
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':programHost.getAuth(`/admin/add/gift/info`),// 获取token
            }),
            }).then((response) => {
            console.log(response);
            response.json().then((res) => {
                console.log(res);
                if(res.statusCode===107){
                    const arr=res.resource;
                    arr.forEach((item,ind)=>{item.key=ind;});
                    content.setState({totalPage:res.sum,gameApplyList:arr});
                }
                },(data) => {
                console.log(data)
            });
        });
  }
    render() {
        const {editing,giftImg,giftName,giftPrice,giftRemark,giftNumber,giftMeili,giftTypeArr,giftType,currentPage,totalPage,colums,giftList}=this.state;
        const Option = Select.Option;
        return ( <div className={styles.normal}>
                <h1 className={styles.title}>添加礼物</h1>
                <div>
                    <Row>
                        <Col span={3}>礼物图片：</Col>
                        <Col span={4}><div className={styles.partItemDiv2}><img style={{width:100,height:100}} src={giftImg} alt="" /></div></Col>
                            <Col span={4}>
                                <div className={styles.partItemDiv2}>
                                    <Upload
                                        action='http://upload-z1.qiniup.com'
                                        data={{
                                            token:this.state.upToken
                                        }}
                                       listType="picture-card"
                                       fileList={this.state.fileList}
                                       onPreview={this.handlePreview.bind(this)}
                                       onChange={this.handleChange.bind(this)}
                                    >
                                        {this.state.fileList.length >= 1 ? null :<div><Icon type="plus" /><div className="ant-upload-text">选择图片</div></div>}
                                    </Upload>
                                    {/*大图预览*/}
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                    <img  style={{ width: '100%' }} alt='' src={this.state.previewImg} />
                                    </Modal>
                                </div>
                            </Col>
                            
                            <Col span={12}><div className={styles.partItemDiv}>请上传您的主页封面照，建议大小为：750*1334</div></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物名称：</Col>
                        <Col span={10}><Input placeholder="请填写礼物名称" style={{width:400}} value={giftName}onChange={(e)=>{this.setState({giftName:e.target.value})}}  /></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物序号：</Col>
                        <Col span={10}><InputNumber min={0} value={giftNumber} style={{width:400}} onChange={(value)=>{this.setState({giftNumber:value})}} /></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物类型：</Col>
                        <Col span={10}>
                        <Select labelInValue style={{ width: 400 }} value={{key:giftType.id,label:giftType.label}} onChange={(value)=> {this.setState({giftType:{id:value.key,label:value.label}}) }}>
                        {giftTypeArr.map((item)=>{return(<Option value={item.id} key={item.id}>{item.label}</Option>)})}
                        </Select>
                        </Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物价格（钻石）：</Col>
                        <Col span={10}><InputNumber min={0} value={giftPrice} style={{width:400}} onChange={(value)=>{this.setState({giftPrice:value})}} /></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>导师获得魅力值：</Col>
                        <Col span={10}><InputNumber min={1}  placeholder="导师收到此礼物可增加的魅力值" style={{width:400}}  value={giftMeili}onChange={(value)=>{this.setState({giftMeili:value})}}  /></Col>
                    </Row>
                </div>
                
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物简介：</Col>
                        <Col span={10}><Input placeholder="请填写礼物介绍" style={{width:400}} value={giftRemark}onChange={(e)=>{this.setState({giftRemark:e.target.value})}}  /></Col>
                    </Row>
                </div>
                <div className={styles.submitDiv}><Button type="primary" onClick={()=>{this.submitGift();}}>提交</Button></div>

                <h1 className={styles.title}>礼物列表</h1>
                <div className={styles.tableDiv}>
                    <Table columns={colums} dataSource={giftList} pagination={false} />
                    <Pagination current={currentPage} onChange={(page)=>{this.changePage(page);}} total={totalPage}/>
                </div>
                <Modal
                    title="编辑礼物"
                    okText='确认'
                    cancelText='取消'
                    width={500}
                    visible={editing}
                    onOk={()=>{this.handleOk()}}
                    onCancel={()=>{this.cancelSend()}}
                >

                    <div className={styles.formItem0}>
                        <Row>
                            <Col span={8}>礼物图片：</Col>
                            <Col span={8}><img style={{width:50,height:50}} src={giftImg} alt=""/></Col>
                            <Col span={8}></Col>
                        </Row>
                    </div>
                    <div className={styles.formItem}>
                        <Row>
                            <Col span={8}>礼物名称：</Col>
                            <Col span={10}><Input placeholder="请填写礼物名称" value={giftName}onChange={(e)=>{this.setState({giftName:e.target.value})}}  /></Col>
                        </Row>
                    </div>
                    <div className={styles.formItem}>
                        <Row>
                            <Col span={8}>礼物序号：</Col>
                            <Col span={10}><InputNumber style={{width:'100%'}} min={0} value={giftNumber} onChange={(value)=>{this.setState({giftNumber:value})}} /></Col>
                        </Row>
                    </div>
                    <div className={styles.formItem}>
                        <Row>
                            <Col span={8}>礼物价格（钻石）：</Col>
                            <Col span={10}><InputNumber style={{width:'100%'}} min={0} value={giftPrice} onChange={(value)=>{this.setState({giftPrice:value})}} /></Col>
                        </Row>
                    </div>
                    <div className={styles.formItem}>
                        <Row>
                            <Col span={8}>导师获得魅力值：</Col>
                            <Col span={10}><InputNumber style={{width:'100%'}} min={1}  placeholder="导师收到此礼物可增加的魅力值"  value={giftMeili}onChange={(value)=>{this.setState({giftMeili:value})}}  /></Col>
                        </Row>
                    </div>
                    
                    <div className={styles.formItem}>
                        <Row>
                            <Col span={8}>礼物简介：</Col>
                            <Col span={10}><Input placeholder="请填写礼物介绍" value={giftRemark}onChange={(e)=>{this.setState({giftRemark:e.target.value})}}  /></Col>
                        </Row>
                    </div>
                </Modal>       
            </div>
        )
    }
}


