import React from 'react'
import "./Sidebar.css"
import { withRouter } from 'react-router-dom'
import {DatabaseIcon, HomeIcon, ShoppingCartIcon, CollectionIcon, InboxInIcon, FolderOpenIcon, UsersIcon} from '@heroicons/react/solid'


const nav = [
    {
        isAdmin: true,
        items: [
            {
                title: "Inventory",
                itemId: "inventory",
                icon: DatabaseIcon,
                color: "text-yellow-400"
            },
            {
                title: "Orders",
                itemId: "orders",
                icon: CollectionIcon,
                color: "text-blue-500"
            },
            {
                title: "Order History",
                itemId: "order-history",
                icon: InboxInIcon,
                color: 'text-green-500'
            },
            {
                title: "Issued Items",
                itemId: "issued-items",
                icon: FolderOpenIcon,
                color: "text-red-500"
            },
            {
                title: "Users",
                itemId: "users",
                icon: UsersIcon,
                color: "text-indigo-600"
            }
        ]
    },
    {
        isAdmin: false,
        items: [
            {
                title: "Dashboard",
                itemId: "dashboard",
                icon: HomeIcon,
                color: "text-yellow-400"
            },
            {
                title: "Order Items",
                itemId: "order-items",
                icon: ShoppingCartIcon,
                color: "text-blue-500"
            },
            {
                title: "Order History",
                itemId: "history",
                icon: CollectionIcon,
                color: "text-green-500",
            }
        ]
    }
    
]

const App = ({history, isAdmin}) => {
    return(
        <div className="sidebar">
            <div className="logo-container">
                <span className="logo">LNMIIT</span>
            </div>
            <div className="nav-container">
                
                {isAdmin ? nav[0].items.map((item) => (
                    <button
                        className="nav-button"
                        onClick={(e) => {
                        e.preventDefault();
                        history.push(`/inventory/${item.itemId}`);
                        }}>
                        <span class="ml-4 flex items-center">
                            <item.icon className={item.color + " icon"}/>
                            {item.title}
                        </span>
                    </button>
                )): nav[1].items.map((item) => (
                    <button
                        className="nav-button"
                        onClick={(e) => {
                        e.preventDefault();
                        history.push(`/inventory/${item.itemId}`);
                        }}>
                        <span className="ml-4 flex items-center">
                            <item.icon className={item.color + " icon"}/>
                            {item.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default withRouter(App)