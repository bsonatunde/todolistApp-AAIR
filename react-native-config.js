// React Native Vector Icons configuration
// This file is automatically read by the React Native build process

module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: {
          // disable iOS platform, other platforms will still autolink if provided
          project: './ios/TodoListApp.xcodeproj',
          xcodeprojPath: './ios/TodoListApp.xcodeproj',
          pbxprojPath: './ios/TodoListApp.xcodeproj/project.pbxproj',
          plistPath: './ios/TodoListApp/Info.plist',
        },
        android: {
          sourceDir: '../android',
          packageImportPath: 'import com.oblador.vectoricons.VectorIconsPackage;',
          project: {
            android: {
              sourceDir: './android/',
              buildGradlePath: './android/build.gradle',
            },
          },
        },
      },
    },
  },
};
