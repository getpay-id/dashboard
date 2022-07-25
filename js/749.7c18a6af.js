"use strict";(globalThis["webpackChunkgetpay"]=globalThis["webpackChunkgetpay"]||[]).push([[749],{2749:(e,a,t)=>{t.r(a),t.d(a,{default:()=>X});var l=t(9835),d=t(1957),n=t(6970);const s=(0,l._)("div",{class:"text-h6"},"Edit Payment Channel",-1),i={class:"column justify-center items-center"},o={class:"q-mb-md"},m=(0,l._)("div",{class:"q-mb-md"},"Channel Name",-1),u={class:"q-mb-md"},c=(0,l._)("div",null,"Status",-1),r={class:"q-mb-md"},p=(0,l._)("div",{class:"q-mb-md"},"Unique Code",-1),h={class:"q-mb-md"},w=(0,l._)("div",{class:"q-mb-md"},"Fixed Fee",-1),g={class:"q-mb-md"},f=(0,l._)("div",{class:"q-mb-md"},"Percent Fee",-1),_={class:"q-mb-md"},q=(0,l._)("div",{class:"q-mb-md"},"Minimum Amount",-1),b=(0,l.Uk)("Cancel"),k=(0,l.Uk)("Save"),W=(0,l._)("div",{class:"text-h6 q-pa-sm"},"Media",-1),v={class:"q-ma-md"},y={class:"flex justify-center q-pa-xs"},C=(0,l.Uk)("New Upload"),U=(0,l.Uk)("Select");function V(e,a,t,V,Z,Q){const R=(0,l.up)("q-card-section"),x=(0,l.up)("q-separator"),z=(0,l.up)("q-img"),M=(0,l.up)("q-btn"),P=(0,l.up)("q-input"),D=(0,l.up)("q-toggle"),S=(0,l.up)("q-chip"),j=(0,l.up)("q-card-actions"),F=(0,l.up)("q-form"),$=(0,l.up)("q-card"),I=(0,l.up)("q-space"),T=(0,l.up)("q-icon"),A=(0,l.up)("q-badge"),H=(0,l.up)("q-table"),B=(0,l.up)("q-dialog"),E=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(E,{class:"q-pa-md"},{default:(0,l.w5)((()=>[(0,l.Wm)($,null,{default:(0,l.w5)((()=>[(0,l.Wm)(R,null,{default:(0,l.w5)((()=>[s])),_:1}),(0,l.Wm)(x),(0,l.Wm)(F,{onSubmit:(0,d.iM)(e.updatePaymentChannel,["prevent"])},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{class:"q-gutter-sm"},{default:(0,l.w5)((()=>[(0,l._)("div",i,[(0,l.Wm)(z,{src:e.baseUrl+e.data.img,fit:"contain",width:"250px",height:"250px"},null,8,["src"]),(0,l.Wm)(M,{outline:"",icon:"file_upload",label:"Select File",size:"sm",onClick:e.showMediaDialog},null,8,["onClick"])]),(0,l._)("div",o,[m,(0,l.Wm)(P,{modelValue:e.data.name,"onUpdate:modelValue":a[0]||(a[0]=a=>e.data.name=a),outlined:"",dense:e.dense},null,8,["modelValue","dense"])]),(0,l._)("div",u,[c,(0,l.Wm)(D,{modelValue:e.data.status,"onUpdate:modelValue":a[1]||(a[1]=a=>e.data.status=a),"true-value":1,"false-value":0,color:"green","checked-icon":"check","unchecked-icon":"visibility_off","keep-color":"",size:"sm"},null,8,["modelValue"]),(0,l.Wm)(S,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(1==e.data.status?"Active":"Inactive"),1)])),_:1})]),(0,l._)("div",r,[p,(0,l.Wm)(P,{modelValue:e.data.unique_code,"onUpdate:modelValue":a[2]||(a[2]=a=>e.data.unique_code=a),outlined:"",readonly:"",dense:e.dense},null,8,["modelValue","dense"])]),(0,l._)("div",h,[w,(0,l.Wm)(P,{modelValue:e.data.fee,"onUpdate:modelValue":a[3]||(a[3]=a=>e.data.fee=a),outlined:"",type:"number",dense:e.dense},null,8,["modelValue","dense"])]),(0,l._)("div",g,[f,(0,l.Wm)(P,{modelValue:e.data.fee_percent,"onUpdate:modelValue":a[4]||(a[4]=a=>e.data.fee_percent=a),outlined:"",type:"number",step:"0.1",dense:e.dense},null,8,["modelValue","dense"])]),(0,l._)("div",_,[q,(0,l.Wm)(P,{modelValue:e.data.min_amount,"onUpdate:modelValue":a[5]||(a[5]=a=>e.data.min_amount=a),outlined:"",type:"number",dense:e.dense},null,8,["modelValue","dense"])])])),_:1}),(0,l.Wm)(x),(0,l.Wm)(j,{align:"right"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{flat:"",size:"sm",onClick:a[6]||(a[6]=a=>e.$router.go(-1))},{default:(0,l.w5)((()=>[b])),_:1}),(0,l.Wm)(M,{color:"primary",size:"sm",type:"submit"},{default:(0,l.w5)((()=>[k])),_:1})])),_:1})])),_:1},8,["onSubmit"])])),_:1}),(0,l.Wm)(B,{modelValue:e.mediaDialog,"onUpdate:modelValue":a[8]||(a[8]=a=>e.mediaDialog=a),persistent:"","full-width":""},{default:(0,l.w5)((()=>[(0,l.Wm)($,null,{default:(0,l.w5)((()=>[(0,l.Wm)(R,{horizontal:""},{default:(0,l.w5)((()=>[W,(0,l.Wm)(I),(0,l.Wm)(M,{flat:"",icon:"close",size:"sm",onClick:a[7]||(a[7]=a=>e.mediaDialog=!1)})])),_:1}),(0,l.Wm)(x),(0,l.Wm)(R,null,{default:(0,l.w5)((()=>[(0,l.Wm)(H,{grid:"","hide-header":"","hide-no-data":"",rows:e.mediaRows,columns:e.mediaColumns,pagination:{rowsPerPage:10}},{item:(0,l.w5)((a=>[(0,l._)("div",v,[(0,l.Wm)($,{onClick:t=>e.markMedia(a.row)},{default:(0,l.w5)((()=>[(0,l._)("div",y,[(0,l.Wm)(z,{src:e.baseUrl+a.row.file,width:e.$q.screen.lt.sm?"110px":"100px",height:"100px",fit:"contain"},null,8,["src","width"]),e.selectedRow&&e.selectedRow.id==a.row.id?((0,l.wg)(),(0,l.j4)(A,{key:0,rounded:"",color:"green-7",class:"absolute",style:{top:"0",right:"-10px",transform:"translateY(-50%)"}},{default:(0,l.w5)((()=>[(0,l.Wm)(T,{name:"check"})])),_:1})):(0,l.kq)("",!0)])])),_:2},1032,["onClick"])])])),_:1},8,["rows","columns"])])),_:1}),(0,l.Wm)(j,{class:"justify-between"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{color:"primary",size:"sm",outline:"",onClick:e.newUpload,icon:"file_upload"},{default:(0,l.w5)((()=>[C])),_:1},8,["onClick"]),e.selectedRow?((0,l.wg)(),(0,l.j4)(M,{key:0,color:"primary",size:"sm",outline:"",onClick:e.selectMedia},{default:(0,l.w5)((()=>[U])),_:1},8,["onClick"])):(0,l.kq)("",!0)])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}var Z=t(2276),Q=t(6928),R=t(499),x=t(2502);const z=(0,l.aZ)({name:"PaymentChannelEdit",preFetch({currentRoute:e}){const a=e.params.id,t=(0,Z.t)(),l=(0,Q.t)();return l.axios.get(`/payment/channel/${a}`).then((e=>{t.setPaymentChannelObject(e.data)})).catch((e=>{console.log(e)}))},setup(){const{paymentChannelObject:e}=(0,x.Jk)((0,Z.t)()),{baseUrl:a}=(0,Q.t)();return{dense:!0,mediaDialog:(0,R.iH)(!1),baseUrl:a,selectedRow:(0,R.iH)(null),mediaRows:(0,R.iH)([]),mediaColumns:[{name:"file",align:"center",field:"file"}],data:e}},methods:{newUpload(){console.log("newUpload, belum...")},selectMedia(){console.log("selectMedia",this.selectedRow),this.data.img=this.selectedRow.file,this.selectedRow=null,this.mediaDialog=!1},markMedia(e){for(var a=0;a<this.mediaRows.length;a++){const t=this.mediaRows[a];t.id!=e.id&&(t.selected=!1)}e.selected?(this.selectedRow=null,e.selected=!1):(this.selectedRow=e,e.selected=!0)},showMediaDialog(){const e=(0,Q.t)();e.axios.get("/media/",{params:{page:1,size:100}}).then((e=>{const a=e.data.data.map((e=>({...e,selected:!1})));this.mediaRows=a,this.mediaDialog=!0}))},updatePaymentChannel(){const e={name:this.data.name,status:this.data.status,fee:this.data.fee,fee_percent:parseFloat(this.data.fee_percent),min_amount:this.data.min_amount,img:this.data.img},a=(0,Q.t)();a.axios.put(`/payment/channel/${this.data.id}`,e).then((e=>{this.$q.notify({message:"Payment Channel Updated",color:"positive"})})).catch((e=>{this.$q.notify({message:e.response.data.detail,color:"negative"})}))}}});var M=t(1639),P=t(9885),D=t(4458),S=t(3190),j=t(926),F=t(8326),$=t(335),I=t(4455),T=t(6611),A=t(3175),H=t(7691),B=t(1821),E=t(2074),N=t(136),O=t(7580),J=t(990),Y=t(2857),G=t(9984),K=t.n(G);const L=(0,M.Z)(z,[["render",V]]),X=L;K()(z,"components",{QPage:P.Z,QCard:D.Z,QCardSection:S.Z,QSeparator:j.Z,QForm:F.Z,QImg:$.Z,QBtn:I.Z,QInput:T.Z,QToggle:A.Z,QChip:H.Z,QCardActions:B.Z,QDialog:E.Z,QSpace:N.Z,QTable:O.Z,QBadge:J.Z,QIcon:Y.Z})}}]);