import {BoardContextProps} from "./Types";


const BoardContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({children}: BoardContextProps) => {

}