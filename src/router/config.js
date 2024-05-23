import Home from '@/views/home/Home.vue'
import Analysis from '@/views/analysis/Analysis.vue'

import Overview from '@/views/database/overview/Overview.vue'
import SrpProject from '@/views/database/bioproject/SrpProject.vue'
import RunProject from '@/views/database/bioproject/RunProject.vue'
import ContigProject from '@/views/database/contigproject/ContigProject.vue'

import DataVisual from '@/views/database/datavisual/DataVisual.vue'
import GeneomeContigDetail from '@/views/database/datavisual/GeneomeContigDetail.vue'

import Download from '@/views/download/Download.vue'
import Tutorial from '@/views/tutorial/Tutorial.vue'
import NotFound from '@/views/notfound/NotFound.vue'

const routesConfig = [
    {
        path: '/index',
        name: 'index',
        component: Home
    },
    {
        path: '/analysis',
        name: 'analysis',
        component: Analysis
    },
    {
        path: '/database',
        name: 'database',
        redirect: '/database/overview'
    },
    {
        path: '/database/overview',
        name: 'overview',
        component: Overview
    },
    {
        path: '/database/srpproject',
        name: 'srpproject',
        component: SrpProject
    },
    {
        path: '/database/srpproject/runproject/:param',
        name: 'runproject',
        component: RunProject
    },
    {
        path: '/database/contigproject',
        name: 'contigproject',
        component: ContigProject
    },
    {
        path: '/database/datavisual',
        name: 'datavisual',
        component: DataVisual
    },
    {
        path: '/database/geneomecontigdetail',
        name: 'geneomecontigdetail',
        component: GeneomeContigDetail
    },
    {
        path: '/download',
        name: 'download',
        component: Download
    },
    {
        path: '/tutorial',
        name: 'tutorial',
        component: Tutorial
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound
    }
]


export default routesConfig