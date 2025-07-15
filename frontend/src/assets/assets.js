import logo_finance from '../assets/logo_finace.png';
import logo_taxia from '../assets/logo_taxia.png';
import logo_smaratDoctor from '../assets/logo_smaratDoctor.png';
import demo1 from '../assets/demo1.png';
import demo2 from '../assets/demo2.png';
import { AiFillCheckSquare } from "react-icons/ai";



export const assets = {
    logo_finance,
    logo_taxia,
    logo_smaratDoctor,

}

export const applications = [
    {
        _id: '1',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_smaratDoctor,
        demoImage: [demo1, demo2],
        price: {
            Start: {
                price: 50,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },
    {
        _id: '2',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_finance,
        demoImage: [demo1, demo2],
        price: {
             Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        },
        demoImage: [],
    },
    {
        _id: '3',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_smaratDoctor,
        demoImage: [demo1],
        price: {
             Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },
    {
        _id: '4',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_finance,
        demoImage: [demo1, demo2],
        price: {
            Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },
    {
        _id: '4',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_smaratDoctor,
        demoImage: [demo1, demo2],
        price: {
            Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },

    {
        _id: '4',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_smaratDoctor,
        demoImage: [demo1, demo2],
        price: {
            Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },

    {
        _id: '4',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_smaratDoctor,
        demoImage: [demo1, demo2],
        price: {
            Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },

    {
        _id: '4',
        name: 'SmartDoctor',
        description: 'Healthcare management system for clinics and medical professionals.',
        image: logo_smaratDoctor,
        demoImage: [demo1, demo2],
        price: {
            Start: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Bussiness: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
            Premium: {
                price: 100,
                feture: ['Basic support', 'Limited storage', 'Access to basic features'],
            },
        }
    },

]

export const links = [
    {
        href: '/',
        icon: AiFillCheckSquare,
        text: 'Dashboard',
    },
    {
        href: '/home',
        icon: AiFillCheckSquare,
        text: 'Apps',
        badge: {
            text : 'Pro',
            color : 'bg-gray-100 text-gray-800',
            darkColor : 'dark:bg-gray-700 dark:text-gray-300'
        }
    },
    {
        href: '/dashboard',
        icon: AiFillCheckSquare,
        text: 'All Servicess',
        badge: {
            text : 'Pro',
            color : 'bg-gray-100 text-gray-800',
            darkColor : 'dark:bg-gray-700 dark:text-gray-300'
        }
    },
    {
        href: '#c',
        icon: AiFillCheckSquare,
        text: 'Billing History',
        badge: {
            text : 'Pro',
            color : 'bg-gray-100 text-gray-800',
            darkColor : 'dark:bg-gray-700 dark:text-gray-300'
        }
    },
    
  
    
]