/**
 * @format
 */

 import { AppRegistry, TextInput, Text, LogBox } from 'react-native';
 TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { allowFontScaling: false })
 Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false })
 import Theme from './app/components/Theme/Theme'
 import DefaultTheme from './app/resource/thems/DefaultTheme';
 import debounce from './app/components/debounce'; 
 import './app/resource/Global';
 import './app/resource/images'
 import Root from './app/Root';
 import './app/utils/NetWorkUtils'
 import 'react-native-gesture-handler'
 
 import { name as appName } from './app.json';
 Theme.set(DefaultTheme);
if (!Text.defaultProps) Text.defaultProps = {};
if (!TextInput.defaultProps) TextInput.defaultProps = {};
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps.allowFontScaling = false
 if (!__DEV__) {
   global.console = {
     info: () => { },
     log: () => { },
     assert: () => { },
     warn: () => { },
     debug: () => { },
     error: () => { },
     time: () => { },
     timeEnd: () => { },
   }
   global.debounce = debounce
 
 }
//  console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
 console.disableYellowBox = true; // 关闭全部黄色警告
 LogBox.ignoreAllLogs(true)

AppRegistry.registerComponent(appName, () => Root);
