/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:38:15 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:38:15 
 */

import { observable, action } from 'mobx';

class ConfigStore {
    @observable
    isError: boolean = false;
    @observable
    isLoading: boolean = true;
    @observable
    isConnect: boolean = false;
    @observable
    errorInfo: ErrorInfo;
    @observable
    loadingType: string;
}  
export { ConfigStore };