import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getDashboardStats,
} from "../services/dashboardService";

const DashboardContext = createContext();

export function DashboardProvider({

    children,

}) {

    const [

        loading,

        setLoading,

    ] = useState(true);

    const [

        dashboard,

        setDashboard,

    ] = useState({

        collections:0,

        documents:0,

        stats:{},

        lastUpdated:null,

    });

    async function loadDashboard(){

        try{

            setLoading(true);

            const data = await getDashboardStats();

            console.log(

                "Dashboard Stats =",

                data

            );

            setDashboard(data);

        }

        catch(error){

            console.error(

                "Dashboard Error :",

                error

            );

        }

        finally{

            setLoading(false);

        }

    }

    useEffect(()=>{

        loadDashboard();

    },[]);

    const value={

        loading,

        dashboard,

        reloadDashboard:loadDashboard,

    };

    return(

        <DashboardContext.Provider

            value={value}

        >

            {

                children

            }

        </DashboardContext.Provider>

    );

}

export function useDashboard(){

    return useContext(

        DashboardContext

    );

}