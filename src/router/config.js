import Home from '@/views/home/Home.vue'
import Analysis from '@/views/analysis/Analysis.vue'

import Overview from '@/views/database/overview/Overview.vue'
import BioProject from '@/views/database/project/BioProject.vue'
import RunProject from '@/views/database/project/RunProject.vue'
import ContigProject from '@/views/database/contig/ContigProject.vue'
import DataVisual from '@/views/database/DataVisual.vue'

import Download from '@/views/download/Download.vue'
import Tutorial from '@/views/tutorial/Tutorial.vue'

const routesConfig = [
    // home
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: Home
    },

    // analysis
    {
        path: '/analysis',
        name: 'analysis',
        component: Analysis
    },

    // database
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
    // 
    {
        path: '/database/bioproject',
        name: 'bioproject',
        component: BioProject
    },
    {
        path: '/database/bioproject/runproject/:param',
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

    // download
    {
        path: '/download',
        name: 'download',
        component: Download
    },

    // tutorial
    {
        path: '/tutorial',
        name: 'tutorial',
        component: Tutorial
    }
    
]

export default routesConfig