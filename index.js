const robotjs = require('robotjs')


//封装一个函数，入参是第一个是s，也就是秒数，number类型，第二个是一个坐标对象，具有x和y属性
// 使用 robotjs操作鼠标在等待s秒（setTimeout）之后立即移动到指定位置（x，y），并点击，当当前节点有next属性时，继续执行下一个节点
// 当没有next属性时，结束
const config ={
    "wallet": { "x": 1855, "y": 1020 },
    "sendBtn1": { "x": 1540, "y": 580 },
    "addressBook": { "x": 1846, "y": 530 },
    "firstAddress": { "x": 1550, "y": 425 },
    "amount": { "x": 1533, "y": 650 },
    "sendBtn2": { "x": 1695, "y": 915 },
    "sendBtn3": { "x": 1689, "y": 915 },
    "verify": { "x": 1804, "y": 731 },
    "sign": { "x": 1804, "y": 731 }
  }
  const time = {
    "wallet": 2000,
    "sendBtn1": 3000,
    "addressBook": 3000,
    "firstAddress": 3000,
    "amount": 2000,
    "sendBtn2": 2000,
    "sendBtn3": 2000,
    "verify": 1000,
    "sign": 8000,
  }

 const arrLink = [
    {
        "objKey": "wallet",
        "next": "sendBtn1"
    },
    {
        "objKey": "sendBtn1",
        "next": "addressBook"
    },
    {
        "objKey": "addressBook",
        "next": "firstAddress"
    },
    {
        "objKey": "firstAddress",
        "next": "amount"
    },
    {
        "objKey": "amount",
        "next": "sendBtn2"
    },
    {
        "objKey": "sendBtn2",
        "next": "sendBtn3"
    },
    {
        "objKey": "sendBtn3",
        "next": "verify"
    },
    {
        "objKey": "verify",
        "next": "sign"
    },
    {
        "objKey": "sign",
        "next": null
    }
]

//封装一个函数，用链表的思想，实现链式调用
//链表的每个节点是一个对象，有objKey和next属性，objKey是config对象的key，next是下一个节点的objKey
//每个节点的执行时间是time对象的对应属性值
//每个节点执行完之后，立即执行下一个节点
//当没有next属性时，结束
// 输出这个链表函数
function runLink() {
    let index = 0
    let timer = null
    function run() {
        if(timer){
            clearTimeout(timer)
        }
        const item = arrLink[index]
        if (!item) {
            return
        }
        const objKey = item.objKey
        const next = item.next
        const position = config[objKey]
        const delay = time[objKey]
        // 打印当前节点
        robotjs.moveMouse(position.x, position.y)
        timer = setTimeout(() => {
            if (!next) {
                return
            }
            if(objKey === 'amount'){
                // 输入一个0.0001到0.00016之间的随机数,小数点后使用toFixed保留7位
                const amount = (Math.random() * (0.00016 - 0.0001) + 0.0001).toFixed(7)
                robotjs.mouseClick()
                robotjs.typeString(amount)
            }else{
                robotjs.mouseClick()
            }
            index++
            run()
        }, delay)
    }
    run()
}
runLink()