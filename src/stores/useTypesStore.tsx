import {defineStore} from "pinia"
type State = {
    result: string|null
    kind: string|null
  };
  type Actions = {
    getTypes:()=>void
    setTypes:(value:string,value2:string)=>void;
  };

export const useTypesStore=defineStore<string,State,{},Actions>('types',{
    state:()=>({
        result:'支出',
        kind:'expenses'

    }),
    actions:{
        getTypes(){
            this.result= localStorage.getItem('types') as string
            this.kind=localStorage.getItem('kinds')
        },
        setTypes(value,value2){
            localStorage.setItem('types',value)
            localStorage.setItem('kinds',value2)
        }
    }
})