import React from "react";



export interface ItemMenu {
    id: number | string;
    name: string;
    choseSub:boolean;
    subMenu?:ItemMenu[];
    link:string
}

export const ListMenu:ItemMenu[] = [
    {
        id:1,
        name:'Giày',
        choseSub:true,
        subMenu:[
            {
                id:1,
                name:"xem tất cả giày",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:2,
                name:"giày cao gót",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:3,
                name:"giày bít",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:4,
                name:"giày scandals",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:5,
                name:"giày búp bê",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:6,
                name:"giày sneaker",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:7,
                name:"giày boots",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:8,
                name:"giày da thật",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
            {
                id:9,
                name:"giày lười",
                choseSub:false,
                subMenu:[],
                link:'giay'
            },
        ],
        link:'giay'
    },
    {
        id:2,
        name:'Túi xách',
        choseSub:true,
        subMenu:[
            {
                id:1,
                name:'Xem tất cả túi xách',
                choseSub:false,
                subMenu:[],
                link:'tui-xach'
            },
            {
                id:2,
                name:'túi xách tay',
                choseSub:false,
                subMenu:[],
                link:'tui-xach'
            },
            {
                id:3,
                name:'túi đeo chéo',
                choseSub:false,
                subMenu:[],
                link:'tui-xach'
            },
            {
                id:4,
                name:'túi xách da thật',
                choseSub:false,
                subMenu:[],
                link:'tui-xach'
            },
        ],
        link:'tui-xach'
    },
    {
        id:3,
        name:'balo',
        choseSub:false,
        subMenu:[],
        link:'balo'
    },
    {
        id:4,
        name:'Ví bóp',
        choseSub:true,
        subMenu:[
            {
                id:1,
                name:'xem tất cả ví bóp',
                choseSub:false,
                subMenu:[],
                link:''
            },
            {
                id:2,
                name:'Ví cầm tay',
                choseSub:false,
                subMenu:[],
                link:''
            },
            {
                id:3,
                name:'Ví dự tiệc',
                choseSub:false,
                subMenu:[],
                link:''
            },
            {
                id:4,
                name:'Ví da thật',
                choseSub:false,
                subMenu:[],
                link:''
            },
        ],
        link:''
    },
    {
        id:5,
        name:'Dép & Guốc',
        choseSub:false,
        subMenu:[],
        link:''
    },
    {
        id:6,
        name:'Phụ kiện',
        choseSub:true,
        subMenu:[
            {
                id:1,
                name:'xem tất cả phụ kiện',
                choseSub:false,
                subMenu:[],
                link:'phu-kien'
            },
            {
                id:2,
                name:'mắt kính',
                choseSub:false,
                subMenu:[],
                link:'phu-kien'
            },
            {
                id:3,
                name:'thắt lưng',
                choseSub:false,
                subMenu:[],
                link:'phu-kien'
            },
        ],
        link:'phu-kien'
    },
    {
        id:7,
        name:'giftcard',
        choseSub:false,
        subMenu:[],
        link:''
    },
    {
        id:8,
        name:'sale off',
        choseSub:false,
        subMenu:[],
        link:''
    },
    {
        id:9,
        name:'new arrival',
        choseSub:false,
        subMenu:[],
        link:''
    },
    {
        id:10,
        name:'tin tức',
        choseSub:false,
        subMenu:[],
        link:'/tin-tuc'
    },
]


