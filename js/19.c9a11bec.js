"use strict";(self["webpackChunkgetpay"]=self["webpackChunkgetpay"]||[]).push([[19],{2019:(e,s,l)=>{l.r(s),l.d(s,{default:()=>f});var a=l(9835),t=l(1957);function i(e,s,l,i,r,n){const u=(0,a.up)("q-icon"),d=(0,a.up)("q-input"),m=(0,a.up)("q-btn"),o=(0,a.up)("q-form"),p=(0,a.up)("q-card"),c=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(c,{padding:"",class:"flex justify-center items-center bg-primary"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{style:{width:"380px"},class:"q-pa-md"},{default:(0,a.w5)((()=>[(0,a.Wm)(o,{onSubmit:(0,t.iM)(n.signIn,["prevent"])},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{filled:"",modelValue:i.url,"onUpdate:modelValue":s[0]||(s[0]=e=>i.url=e),label:"URL",type:"url",class:"q-mt-md q-mb-lg",placeholder:"https://api.getpay.id/v1",required:""},{prepend:(0,a.w5)((()=>[(0,a.Wm)(u,{name:"link"})])),_:1},8,["modelValue"]),(0,a.Wm)(d,{filled:"",modelValue:i.username,"onUpdate:modelValue":s[1]||(s[1]=e=>i.username=e),label:"Email",type:"email",class:"q-mt-md",rules:[e.$rules.required("Email is required"),e.$rules.email("Invalid email")]},{prepend:(0,a.w5)((()=>[(0,a.Wm)(u,{name:"mail"})])),_:1},8,["modelValue","rules"]),(0,a.Wm)(d,{filled:"",modelValue:i.password,"onUpdate:modelValue":s[3]||(s[3]=e=>i.password=e),label:"Password",type:i.isPwd?"password":"text",class:"q-mt-md",rules:[e.$rules.required("Password is required"),e.$rules.minLength(8,"Minimum password length is 8")]},{prepend:(0,a.w5)((()=>[(0,a.Wm)(u,{name:"lock"})])),append:(0,a.w5)((()=>[(0,a.Wm)(u,{name:i.isPwd?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[2]||(s[2]=e=>i.isPwd=!i.isPwd)},null,8,["name"])])),_:1},8,["modelValue","type","rules"]),(0,a.Wm)(m,{color:"primary",type:"submit",label:"sign in",style:{width:"100%"},class:"q-mt-md"})])),_:1},8,["onSubmit"])])),_:1})])),_:1})}var r=l(499),n=l(6928);const u={setup(){const e=(0,n.t)();return{username:(0,r.iH)(null),password:(0,r.iH)(null),url:(0,r.iH)(e.apiUrl||null),isPwd:(0,r.iH)(!0),store:e}},methods:{async signIn(){this.store.setApiUrl(this.url);const{status:e,data:s}=await this.store.signIn(this.username,this.password);console.log(e,s),200===e?await this.$router.push("/"):setTimeout((()=>{this.$q.notify({progress:!0,message:s.detail,color:"negative"})}),2e3)}}};var d=l(1639),m=l(9885),o=l(4458),p=l(8326),c=l(9828),w=l(2857),g=l(7065),h=l(9984),q=l.n(h);const y=(0,d.Z)(u,[["render",i]]),f=y;q()(u,"components",{QPage:m.Z,QCard:o.Z,QForm:p.Z,QInput:c.Z,QIcon:w.Z,QBtn:g.Z})}}]);