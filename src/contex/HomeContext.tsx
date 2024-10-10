import React, { createContext, useState, ReactNode, useContext } from 'react';

interface HomeContexType {
    userInfo: string | null | undefined;
    setuserInfo: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const HomeContext = createContext<HomeContexType | undefined>(undefined);

export const HomeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [userInfo, setuserInfo] = useState<string | null | undefined>('');
    return (
        <HomeContext.Provider value={{userInfo, setuserInfo}}>
            {children}
        </HomeContext.Provider>
    )
};

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useHomeContext must be used within a HomeProvider');
    }
    return context;
};