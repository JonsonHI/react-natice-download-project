/**
 * FileName: RNFSUtils.js
 * Author: hf
 * Date: 2019/2/11 14:39
 * Description:封装对文件的【下载、文本写入、文本读取、文本追加、删除】的工具类方法
 *
 */
 import RNFS from 'react-native-fs';


 /** @namespace RNFS.ExternalDirectoryPath */
 /**
  * 常用文件存储目录(ios与android)
  *
  * RNFS.MainBundlePath
  * RNFS.CachesDirectoryPath
  * RNFS.DocumentDirectoryPath
  * RNFS.TemporaryDirectoryPath
  * RNFS.LibraryDirectoryPath
  * RNFS.ExternalDirectoryPath
  * RNFS.ExternalStorageDirectoryPath
 
  */
 const ExternalDirectoryPath = RNFS.DocumentDirectoryPath;
 
 
 /**
  * 功能描述: <br>
  * 〈文件下载(图片、文件、音频、视频)〉
  *
  * @MethodName: _downloadFile
  * @Author: hf
  * @Version: 1.0.0
  * @Param: [formUrl 要下载的文件地址, targetName 目标文件名称(类似text.txt),callback: 1：下载成功   0：下载失败]
  *
  */
 export const _downloadFile = (formUrl, targetName,callback,progressCallback) => {
     // 获取下载文件本地保存路径
     const toLoadPath = `${ExternalDirectoryPath}/${targetName}`;
    //  RNFS.downloadFile({
    //      fromUrl: formUrl,
    //      toFile: toLoadPath,
    //      progressDivider: 5,
    //      begin: (res) => console.log('begin', res) ,
    //      progress: (res) =>  console.log('progress', res)
    //  })
    //  .promise.then(()=>callback(1))
    //          .catch(()=> callback(0));
    const options = {
        fromUrl: formUrl,
        toFile: toLoadPath,
        background: true,
        begin: (res) => {
            console.log('begin', res);
            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        },
        progress: (res) => {
            let pro = res.bytesWritten / res.contentLength;
            progressCallback(pro)

        }
    };
    try {
        const ret = RNFS.downloadFile(options);
        ret.promise.then(res => {
            console.log('success', res);
            callback(1)

            console.log('file://' + toLoadPath)
        }).catch(err => {
            console.log('err', err);
            callback(0)
        });
    }
    catch (e) {
        console.log(error);
    }
 };
 
 /**
  * 功能描述: <br>
  * 〈将内容写入本地文本〉
  *
  * @MethodName: _writeFile
  * @Author: hf
  * @Version: 1.0.0
  * @Param: [ targetName 目标文件名称(类似text.txt)  content 文本内容   callback: 1：成功 ]
  *
  */
 export const _writeFile = (targetName,content, callback) => {
     const path = `${ExternalDirectoryPath}/${targetName}`;
     RNFS.writeFile(path, content, 'utf8')
         .then(result => callback(1));
 };
 
 
 /**
  * 功能描述: <br>
  * 〈读取文本内容〉
  *
  * @MethodName: _readFile
  * @Author: hf
  * @Version: 1.0.0
  * @Param: [fileName 文件名称，callback 回调函数获得读取的文件内容]
  *
  */
 export const _readFile = (fileName, callback) => {
     RNFS.readFile(`${ExternalDirectoryPath}/${fileName}`)
         .then(result => callback(result));
 };
 
 /**
  * 功能描述: <br>
  * 〈在已有的txt上添加新的文本〉
  *
  * @MethodName: _appendFile
  * @Author: hf
  * @Version: 1.0.0
  * @Param: [fileName:要追加的目标文本名称, content 要添加的文本信息, callback:回调函数   1：成功]
  *
  */
 export const _appendFile = (fileName, content, callback) => {
      RNFS.appendFile(`${ExternalDirectoryPath}/${fileName}`, content, 'utf8')
         .then(()=>callback(1));
 };
 
 /**
  * 功能描述: <br>
  * 〈删除本地文件〉
  *
  * @MethodName: _deleteFile
  * @Author: hf
  * @Version: 1.0.0
  * @Param: targetName 要删除的文件名称   callback:回调函数   1：成功  0/其它:失败
  *
  */
 export const _deleteFile = (targetName,callback)=> {
      RNFS.unlink(`${ExternalDirectoryPath}/${targetName}`)
         .then(()=> callback(1));
 };
 
 /**
  * 功能描述: <br>
  * 〈
  * 判断文件是否存在  文件存在返回:true  不存在返回:false
  * 〉
  *
  * @MethodName: _fileEx
  * @Author: hf
  * @Version: 1.0.0
  * @Param: [filePath文件路径    callback:回调函数]
  *
  */
 export const _fileEx = (filePath, callback) => {
     RNFS.exists(filePath)
         .then(res => callback(res));
 };
 
 /**
  * 功能描述: <br>
  * 〈
  * 创建Android目录
  * 〉
  *
  * @MethodName: _mkdir
  * @Author: hf
  * @Version: 1.0.0
  * @Param: [path:要创建的文件夹路径【file:///sacard/AXX/files】  callback: 1:创建成功  0/其它:创建失败]
  *
  */
 export function _mkdir(path, callback) {
     RNFS.mkdir(path)
         .then(() => callback(1),()=>callback(0))
 }
