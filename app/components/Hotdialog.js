import React from "react";
import {
  Modal,
  Animated,
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AppState,
  Linking,
  DeviceEventEmitter
} from "react-native";
import CodePush from "react-native-code-push";
// import VersionCheck from "react-native-version-check";

export const CODE_PUSH_DID_CHECK_UPDATE_EVENT = "CODE_PUSH_DID_CHECK_UPDATE";

const { width, height } = Dimensions.get("window");
const dialogWidth = width - 20;
const dialogHeight = height * 0.8;
const progressBarWidth = dialogWidth - 40;
const isIOS = Platform.OS === "ios";
const primaryColor = "#007aff";
const lightBlueGrey = "#dae4f2";
const slateColor = "#474f61";

const fontMedium = isIOS ? { fontFamily: "Avenir-Medium" } : { fontFamily: "sans-serif" };
const fontBold = isIOS ? { fontFamily: "Avenir-Heavy" } : { fontFamily: "sans-serif", fontWeight: "bold" };
const fontLight = isIOS ? { fontFamily: "Avenir-Light" } : { fontFamily: "sans-serif-light" };

const TitleStates = {
  None: "有新的版本 !",
  Syncing: "更新进度 !",
  Update: "有新的版本 !",
  Updated: "更新安装",
  NeedStoreUpdate: "有新的版本 !"
};

const OptionTexts = {
  UpdateConfirmText: "你想现在更新吗 ?",
  UpdateMandatoryText: "请更新到最新版本",
  UpdatedText: "安装了最新版本.重新启动应用程序使更新生效.",
  RestartConfirmText: "你想现在重新开始吗 ?",
  RestartMandatoryText: "",
  UpdateText: "新版的已经发布",
  NeedUpdateStoreText: "最新版的已经发布."
};

const DownloadStatus = {
  CheckingForUpdate: "检查更新.",
  DownloadingPackage: "下载包.",
  AwaitingUserAction: "等待操作.",
  InstallingUpdate: "安装更新.",
  UpToDate: "最新应用程序.",
  UpdateIgnored: "用户取消更新.",
  UpdateInstalled: "更新已安装，并将应用于重新启动.",
  UnknownError: "发生未知错误."
};
/**
 * @typedef {import("rn-codepush-dialog").CodePushDialogProps} Props
 * @typedef {import("rn-codepush-dialog").CodePushDialogState} State
 * @extends {React.Component<Props, State>}
 */

class CodePushDialog extends React.Component {
  /**
   * @type {State}
   */
  state = {
    updateInfo: null,
    isMandatory: false,
    currentProgress: 0,
    syncMessage: "",
    state: "None",
    animatedProgressValue: new Animated.Value(0),
    animatedOpacityValue: new Animated.Value(0),
    animatedScaleValue: new Animated.Value(0),
    descriptionTextScrollEnable: false,
    showContent: true,
    updateLater: false,
    storeUrl: ""
  };

  /**
   * @type {Props}
   */
  static defaultProps = {
    titleStates: TitleStates,
    optionTexts: OptionTexts,
    downloadStatus: DownloadStatus,
    modalBackgroundColor: "rgba(35,36,38,0.8)",
    animationType: "scale",
    descriptionContentMaxHeight: 220,
    allowStoreCheck: true,
    storeMandatoryUpdate: true,
    isCodePushSlientUpdate: false,
    codePushTimeoutForSlientUpdate: 30000,
    storeAppID: ""
  };

  UNSAFE_componentWillMount() {
    this.updateInProgress = true;
    CodePush.disallowRestart();

    CodePush.getUpdateMetadata().then(packageInfo => {
      if (packageInfo) {
        const { label, appVersion } = packageInfo;
        const { onGetCurrentPackageInfo } = this.props;
        const version = this._getFormatVersion(label, appVersion);
        if (onGetCurrentPackageInfo) {
          onGetCurrentPackageInfo(version, packageInfo);
        }
        this.packageInfo = packageInfo;
        this.version = version;
      }
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  componentDidMount() {
    CodePush.allowRestart();
    this._handleAppStateChange("active");
    const {
      isCheckOnResume,
      isCodePushSlientUpdate,
      onDidCheckUpdate,
      codePushTimeoutForSlientUpdate = 30000
    } = this.props;
    if (isCheckOnResume && !isCodePushSlientUpdate) {
      AppState.addEventListener("change", this._handleAppStateChange);
    }
    if (isCodePushSlientUpdate) {
      this.timer = setTimeout(() => {
        if (!this.updateInProgress) {
          if (onDidCheckUpdate) {
            onDidCheckUpdate(false, this.version, this.packageInfo);
          }
          DeviceEventEmitter.emit(CODE_PUSH_DID_CHECK_UPDATE_EVENT);
        }
      }, codePushTimeoutForSlientUpdate);
    }
  }

  _getFormatVersion = (label, appVersion) => {
    const buildNumber = label.substring(1);
    const version = `${appVersion}.${buildNumber}`;
    return version;
  };

  _handleAppStateChange = nextAppState => {
    if (nextAppState === "active" && this.state.state === "None") {
      this._syncImmediate();
    }
  };

  _storeCheck = remotePackage => {
    console.log("**** Version miss match", remotePackage);
    this.updateInProgress = true;
    const {
      allowStoreCheck,
      onGetStoreInfo,
      storeAppID: appID,
      storeAppName: appName,
      storeIgnoreErrors: ignoreErrors = true
    } = this.props;

    // if (allowStoreCheck && appID !== "") {
    //   let info = null;
    //   let storeUrl = null;
    //   VersionCheck.needUpdate()
    //     .then(res => {
    //       info = res;
    //       onGetStoreInfo && onGetStoreInfo(res);
    //       return VersionCheck.getStoreUrl({ appID, appName, ignoreErrors });
    //     })
    //     .then(url => {
    //       if (!info.isNeeded || !url) throw Error("No need to update store, will fallback to check code push");
    //       storeUrl = url;
    //       return Linking.canOpenURL(url);
    //     })
    //     .then(canOpen => {
    //       if (!canOpen) throw Error("Can't open store url, will fallback to check code push");
    //       console.log("*** need update store: ", storeUrl);
    //       this.setState({ storeUrl, state: "NeedStoreUpdate", showContent: true }, this._show);
    //     })
    //     .catch(error => {
    //       console.log("**** error", error);
    //       this._syncImmediate();
    //     });
    // }
  };

  _restartNow = () => {
    this.setState({ state: "None" }, () => {
      CodePush.restartApp();
    });
  };

  _show = () => {
    const { animatedOpacityValue, animatedScaleValue } = this.state;
    Animated.sequence([
      Animated.timing(animatedOpacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(animatedScaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  _hide = () => {
    const { animatedOpacityValue, animatedScaleValue } = this.state;
    Animated.sequence([
      Animated.timing(animatedScaleValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(animatedOpacityValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]).start(() => this.setState({ showContent: false }, () => this.setState({ state: "None" })));
  };

  _syncImmediate = () => {
    const { updateLater } = this.state;
    const { isCodePushSlientUpdate } = this.props;
    if (isCodePushSlientUpdate) {
      this._checkAndUpdateImmediate();
    } else {
      if (!updateLater) {
        this._forceSyncImmediate();
      }
    }
  };

  _checkAndUpdateImmediate() {
    const { deploymentKey, onDidCheckUpdate } = this.props;
    CodePush.checkForUpdate(deploymentKey).then(update => {
      console.log("**** Check for update: ", update);
      if (update && !update.failedInstall) {
        const { label, appVersion } = update;
        const { onGetRemotePackageInfo } = this.props;
        if (onGetRemotePackageInfo) {
          const version = this._getFormatVersion(label, appVersion);
          onGetRemotePackageInfo(version, update);
        }
        this._immediateUpdate();
      } else {
        if (onDidCheckUpdate) {
          onDidCheckUpdate(true, this.version, this.packageInfo);
        }
        DeviceEventEmitter.emit(CODE_PUSH_DID_CHECK_UPDATE_EVENT);
      }
    });
  }

  _forceSyncImmediate = () => {
    const { deploymentKey } = this.props;
    CodePush.checkForUpdate(deploymentKey).then(update => {
      if (update && !update.failedInstall) {
        const { label, appVersion, isMandatory } = update;
        const { onGetRemotePackageInfo } = this.props;
        if (onGetRemotePackageInfo) {
          const version = this._getFormatVersion(label, appVersion);
          onGetRemotePackageInfo(version, update);
        }
        this.setState(
          {
            isMandatory,
            updateInfo: update,
            state: "Update",
            showContent: true
          },
          this._show
        );
      }
    });
  };

  _immediateUpdate = () => {
    const { state, storeUrl } = this.state;
    const { deploymentKey, isCodePushSlientUpdate } = this.props;
    if (state === "NeedStoreUpdate") {
      Linking.openURL(storeUrl)
        .then(res => {
          console.log("**** res", res);
        })
        .catch(error => {
          console.log("**** error", error);
        });
    } else {
      if (isCodePushSlientUpdate) {
        this.setState({ state: "Syncing" }, () => {
          const codePushOptions = {
            installMode: CodePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
            deploymentKey: deploymentKey
          };
          CodePush.sync(
            codePushOptions,
            this._codePushStatusDidChange,
            this._codePushDownloadDidProgress,
            this._storeCheck
          );
        });
      } else {
        if (state !== "Syncing") {
          this.setState({ state: "Syncing" }, () => {
            const codePushOptions = {
              installMode: CodePush.InstallMode.ON_NEXT_RESTART,
              mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
              deploymentKey: deploymentKey
            };
            CodePush.sync(
              codePushOptions,
              this._codePushStatusDidChange,
              this._codePushDownloadDidProgress,
              this._storeCheck
            );
          });
        }
      }
    }
  };
  /**
   *
   * @param {import("rn-codepush-dialog").DownloadStatus} state
   */
  _getDownloadStatusFromState(state) {
    const { downloadStatus } = this.props;
    // @ts-ignore
    return downloadStatus[state] || DownloadStatus[state];
  }
  _codePushStatusDidChange = syncStatus => {
    const { isCodePushSlientUpdate } = this.props;
    let syncMessage = "";
    console.log('~~~~~~~~~~~~~~~~~~~syncStatus:',syncStatus)
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.updateInProgress = false;
        syncMessage = this._getDownloadStatusFromState("CheckingForUpdate");
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.updateInProgress = true;
        syncMessage = this._getDownloadStatusFromState("DownloadingPackage");
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        syncMessage = this._getDownloadStatusFromState("AwaitingUserAction");
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.updateInProgress = true;
        syncMessage = this._getDownloadStatusFromState("InstallingUpdate");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        syncMessage = this._getDownloadStatusFromState("UpToDate");
        this.updateInProgress = true;
        if (!isCodePushSlientUpdate) {
          this._hide();
        }
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        syncMessage = this._getDownloadStatusFromState("UpdateIgnored");
        this.updateInProgress = true;
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.updateInProgress = true;
        syncMessage = this._getDownloadStatusFromState("UpdateInstalled");
        this.setState({ state: "Updated" });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.updateInProgress = false;
        syncMessage = this._getDownloadStatusFromState("UnknownError");
        if (!isCodePushSlientUpdate) {
          this._hide();
        }
        break;
    }
    console.log("**** Status changed: ", syncMessage);
    if (!isCodePushSlientUpdate) {
      this.setState({ syncMessage });
    }
  };

  _codePushDownloadDidProgress = progress => {
    if (this.props.isCodePushSlientUpdate) return;

    const { state, animatedProgressValue } = this.state;
    if (state === "Syncing") {
      const { receivedBytes, totalBytes } = progress;
      let temp = receivedBytes / totalBytes;
      this.setState({ currentProgress: temp }, () => {
        if (temp <= 1) {
          animatedProgressValue.setValue(temp);
        }
      });
    }
  };

  _updateLater = () => {
    this.setState({ updateLater: true });
    this._hide();
  };

  _renderUpdateButtonOptions = isMandatory => {
    const {
      updateLaterButtonStyle,
      updateLaterButtonText = "下次更新",
      updateLaterButtonTextStyle,
      updateNowButtonStyle,
      updateNowButtonText = "立即更新",
      updateNowButtonTextStyle
    } = this.props;

    return (
      <View style={styles.row}>
        {!isMandatory && (
          <TouchableOpacity style={[styles.deactiveButton, updateLaterButtonStyle]} onPress={this._updateLater}>
            <Text style={[styles.deactiveButtonText, updateLaterButtonTextStyle]}>{updateLaterButtonText}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.activeButton, updateNowButtonStyle]} onPress={this._immediateUpdate}>
          <Text style={[styles.activeButtonText, updateNowButtonTextStyle]}>{updateNowButtonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderRestartButtonOptions = isMandatory => {
    const {
      restartLaterButtonStyle,
      restartLaterButtonText = "以后",
      restartLaterButtonTextStyle,
      restartNowButtonStyle,
      restartNowButtonText = "现在重启",
      restartNowButtonTextStyle
    } = this.props;

    return (
      <View style={styles.row}>
        {!isMandatory && (
          <TouchableOpacity style={[styles.deactiveButton, restartLaterButtonStyle]} onPress={this._hide}>
            <Text style={[styles.deactiveButtonText, restartLaterButtonTextStyle]}>{restartLaterButtonText}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.activeButton, restartNowButtonStyle]} onPress={this._restartNow}>
          <Text style={[styles.activeButtonText, restartNowButtonTextStyle]}>{restartNowButtonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderProgressBar = () => {
    const {
      progressBarContainerStyle,
      progressBarStyle,
      progressTextStyle,
      progressStatusStyle,
      progressBarColor = primaryColor,
      progressBarThickness = 16
    } = this.props;
    const { animatedProgressValue, syncMessage, currentProgress } = this.state;
    const translateX = animatedProgressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-progressBarWidth, 0]
    });
    const animationStyle = {
      transform: [{ translateX }]
    };
    const color = animatedProgressValue.interpolate({
      inputRange: [0, 0.4, 0.6, 1],
      outputRange: [slateColor, slateColor, "white", "white"]
    });

    const roundedValue = (currentProgress * 100).toFixed(2);
    const progress = `${roundedValue}%`;

    return (
      <View style={[{ alignItems: "center" }, progressBarContainerStyle]}>
        <View style={[styles.progressBar]}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                height: progressBarThickness,
                borderRadius: progressBarThickness / 2,
                backgroundColor: progressBarColor
              },
              progressBarStyle,
              animationStyle
            ]}
          />
          <Animated.Text style={[styles.progress, progressTextStyle, { color }]}>{progress}</Animated.Text>
        </View>
        <Text style={[styles.syncMessage, progressStatusStyle]}>{syncMessage}</Text>
      </View>
    );
  };

  _renderHeader = () => {
    const {
      headerContainerStyle,
      imageHeaderSource,
      imageHeaderStyle,
      imageHeaderContainerStyle,
      titleStates,
      titleStyle,
      versionTextStyle,
      versionTextContainerStyle
    } = this.props;
    const { state } = this.state;
    const title = titleStates[state] || TitleStates[state];
    const version = this._getVersion();
    return (
      <View style={[styles.headerContainer, headerContainerStyle]}>
        {imageHeaderSource && (
          <View style={imageHeaderContainerStyle}>
            <Image style={imageHeaderStyle} source={imageHeaderSource} />
          </View>
        )}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {version && (
          <TouchableOpacity style={[styles.versionContainer, versionTextContainerStyle]} activeOpacity={0.7}>
            <Text style={[styles.version, versionTextStyle]}>{versionTextStyle}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  _getTextFromState(state) {
    const { optionTexts } = this.props;
    //@ts-ignore
    return optionTexts[state] || OptionTexts[state];
  }

  _renderBody = () => {
    const { state, isMandatory } = this.state;
    const { descriptionTitleStyle, storeMandatoryUpdate, confirmTextStyle } = this.props;
    if (state === "NeedStoreUpdate") {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.descriptionTitle, descriptionTitleStyle]}>
            {this._getTextFromState("NeedUpdateStoreText")}
          </Text>
          <Text style={[styles.confirmRestartText, confirmTextStyle]}>
            {storeMandatoryUpdate
              ? this._getTextFromState("UpdateMandatoryText")
              : this._getTextFromState("UpdateConfirmText")}
          </Text>
        </View>
      );
    }

    if (state === "Updated") {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.descriptionTitle, descriptionTitleStyle]}>{this._getTextFromState("UpdatedText")}</Text>
          <Text style={[styles.confirmRestartText, confirmTextStyle]}>
            {isMandatory
              ? this._getTextFromState("RestartMandatoryText")
              : this._getTextFromState("RestartConfirmText")}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={[styles.descriptionTitle, descriptionTitleStyle]}>{this._getTextFromState("UpdateText")}</Text>
        {this._renderDescription()}
        <Text style={[styles.confirmText, confirmTextStyle]}>
          {isMandatory ? this._getTextFromState("UpdateMandatoryText") : this._getTextFromState("UpdateConfirmText")}
        </Text>
      </View>
    );
  };

  _onTextDescriptionLayout = ({ nativeEvent }) => {
    if (nativeEvent && nativeEvent.contentSize) {
      const { descriptionContentMaxHeight } = this.props;
      const { descriptionTextScrollEnable } = this.state;
      const scrollEnabled = nativeEvent.contentSize.height > descriptionContentMaxHeight;
      if (scrollEnabled !== descriptionTextScrollEnable) {
        this.setState({ descriptionTextScrollEnable: scrollEnabled });
      }
    }
  };

  _renderDescription = () => {
    const {
      bodyContainerStyle,
      descriptionTextStyle,
      descriptionTitle ="更新内容:",
      descriptionTitleStyle,
      isHiddenDescription,
      descriptionContentMaxHeight
    } = this.props;

    const { updateInfo, descriptionTextScrollEnable } = this.state;
    if (isHiddenDescription || !updateInfo || !updateInfo.description) return null;

    return (
      <View style={[{ marginBottom: 20 }, bodyContainerStyle]}>
        <Text style={[styles.descriptionTitle, descriptionTitleStyle]}>{descriptionTitle}</Text>
        <TextInput
          scrollEnabled={descriptionTextScrollEnable}
          editable={false}
          underlineColorAndroid="transparent"
          onContentSizeChange={this._onTextDescriptionLayout}
          style={[styles.description, descriptionTextStyle, { maxHeight: descriptionContentMaxHeight }]}
          multiline
        >
          {updateInfo.description}
        </TextInput>
      </View>
    );
  };

  _renderBottom = () => {
    const { state, isMandatory } = this.state;
    const { bottomContainerStyle, storeMandatoryUpdate } = this.props;
    let bottomView = this._renderUpdateButtonOptions(isMandatory);

    if (state === "NeedStoreUpdate") {
      bottomView = this._renderUpdateButtonOptions(storeMandatoryUpdate);
    }

    if (state === "Updated") {
      bottomView = this._renderRestartButtonOptions(isMandatory);
    }
    if (state === "Syncing") {
      bottomView = this._renderProgressBar();
    }

    return <View style={[styles.bottomContainer, bottomContainerStyle]}>{bottomView}</View>;
  };

  _getVersion = () => {
    const { updateInfo } = this.state;
    if (updateInfo) {
      const { label, appVersion } = updateInfo;
      const buildNumber = label.substring(1);
      const version = `Code Push Version: ${appVersion} (${buildNumber})`;
      return version;
    }
    return null;
  };

  _getAnimation = () => {
    const { animatedScaleValue } = this.state;
    const { animationType } = this.props;
    if (animationType === "scale") {
      const scale = animatedScaleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      });

      const opacity = animatedScaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.7, 1],
        extrapolate: "clamp"
      });

      const scaleStyle = {
        transform: [{ scale }],
        opacity
      };

      return scaleStyle;
    }

    const translateY = animatedScaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-height, -height / 4, 0],
      extrapolate: "clamp"
    });
    const opacity = animatedScaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.7, 1],
      extrapolate: "clamp"
    });
    const slideAnimationStyle = {
      opacity,
      transform: [{ translateY }]
    };
    return slideAnimationStyle;
  };

  render() {
    const { animatedOpacityValue, state, showContent } = this.state;
    const { modalBackgroundColor, style } = this.props;
    const visible = state !== "None";

    const opacity = animatedOpacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.7, 1]
    });

    const opacityStyle = {
      opacity
    };

    const animationType = this._getAnimation();

    return (
      <Modal transparent visible={visible}>
        <Animated.View
          style={[
            styles.modal,
            {
              backgroundColor: showContent ? modalBackgroundColor : "transparent"
            },
            opacityStyle,
            style
          ]}
        >
          {showContent && (
            <Animated.View style={[styles.container, animationType]}>
              {this._renderHeader()}
              {this._renderBody()}
              {this._renderBottom()}
            </Animated.View>
          )}
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    marginBottom: 15
  },
  syncMessage: {
    marginTop: 6,
    fontSize: 14,
    color: slateColor,
    ...fontLight
  },
  progressBar: {
    width: progressBarWidth,
    height: 16,
    borderRadius: 8,
    backgroundColor: lightBlueGrey,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    alignItems: "center",
    width: dialogWidth,
    maxHeight: dialogHeight,
    overflow: "hidden",
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6
      }
    }),
    borderRadius: 14
  },
  bottomContainer: {
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 20,
    color: primaryColor,
    ...fontBold
  },
  contentContainer: {
    alignSelf: "stretch",
    marginHorizontal: 20
  },
  descriptionTitle: {
    fontSize: 18,
    color: slateColor,
    marginBottom: 5,
    ...fontMedium
  },
  description: {
    fontSize: 16,
    color: slateColor,
    paddingVertical: 0,
    ...fontLight
  },
  activeButton: {
    flex: 0.5,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,
    borderRadius: 4
  },
  activeButtonText: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    ...fontMedium
  },
  deactiveButton: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: lightBlueGrey,
    borderRadius: 4
  },
  deactiveButtonText: {
    fontSize: 18,
    color: slateColor,
    marginHorizontal: 20,
    marginVertical: 10,
    ...fontMedium
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  versionContainer: {
    marginTop: 4
  },
  version: {
    marginHorizontal: 20,
    fontSize: 14,
    color: slateColor,
    ...fontLight
  },
  confirmRestartText: {
    fontSize: 18,
    color: slateColor,
    marginBottom: 10,
    ...fontMedium
  },
  confirmText: {
    fontSize: 18,
    color: slateColor,
    marginBottom: 10,
    ...fontMedium
  },
  progress: {
    fontSize: 12,
    ...fontMedium
  }
});

/**
 * @type {import("react-native-code-push").CodePushOptions}
 */
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  updateDialog: null
};

export default CodePush(codePushOptions)(CodePushDialog);