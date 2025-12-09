# Production Keystore Setup

## Overview
This document describes the production keystore configuration for the TodoList React Native application.

## Keystore Details
- **Keystore File**: `todolist-release-key.keystore`
- **Location**: `android/app/todolist-release-key.keystore`
- **Alias**: `todolist-key-alias`
- **Algorithm**: RSA 2048-bit
- **Validity**: 10,000 days (~27 years)

## Configuration
The keystore credentials are stored in `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=todolist-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=todolist-key-alias
MYAPP_RELEASE_STORE_PASSWORD=todolist123456
MYAPP_RELEASE_KEY_PASSWORD=todolist123456
```

## Security Notes
1. **DO NOT commit the keystore file to version control**
   - The keystore file is added to `.gitignore`
   - Store the keystore file securely (backup in secure location)

2. **Change default passwords in production**
   - The current passwords are for development/testing
   - Use strong, unique passwords for production releases
   - Consider using environment variables for CI/CD

## Build Configuration
The `android/app/build.gradle` file is configured to:
- Use debug keystore for debug builds
- Use production keystore for release builds
- Enable ProGuard for release builds (minification)

## Building Release APK
To build a signed release APK:
```bash
cd android
./gradlew assembleRelease
```

The signed APK will be generated at:
`android/app/build/outputs/apk/release/app-release.apk`

## Important Commands

### Generate New Keystore (if needed)
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore todolist-release-key.keystore -alias todolist-key-alias -keyalg RSA -keysize 2048 -validity 10000 -storepass YOUR_STORE_PASSWORD -keypass YOUR_KEY_PASSWORD -dname "CN=TodoList App, OU=Development, O=YourCompany, L=City, ST=State, C=US"
```

### Verify Keystore
```bash
keytool -list -v -keystore todolist-release-key.keystore -alias todolist-key-alias
```

### Check APK Signature
```bash
jarsigner -verify -verbose -certs app-release.apk
```

## Troubleshooting
- **Password mismatch**: Ensure gradle.properties passwords match keystore passwords
- **Keystore not found**: Verify keystore file path in gradle.properties
- **Build fails**: Check that ProGuard rules don't break the app

## Deployment Checklist
- [ ] Keystore file backed up securely
- [ ] Production passwords configured
- [ ] APK tested on device
- [ ] App signed with production keystore
- [ ] Release notes prepared

## Last Updated
December 9, 2025
