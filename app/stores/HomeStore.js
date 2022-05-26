/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:39:27 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:39:27 
 */

import React from 'react';
import { action, computed, observable, toJS } from "mobx";
import {
    ENVS,
} from '../config';
import { ConfigStore } from "./ConfigStore";

export default class HomeStore extends ConfigStore {
    
    @observable ProjectItems = []; // 首页菜单
    /** 
    * @description
    * @param {*}
    * @return {*}
    */
       @action
       async ProjectPageList(){
       
        
        }


    
}