# 📱 iOS Setup & Testing Guide

## 🎯 **How to Run Your App on iOS Simulator**

### **Step 1: Build the App**
```bash
# Navigate to your project
cd /Users/dario/Desktop/SauronV0/Sauron

# Build for iOS (this creates the Xcode project)
quasar build -m capacitor -T ios
```

### **Step 2: Open Xcode Manually**
```bash
# Open the iOS project in Xcode
open src-capacitor/ios/App/App.xcworkspace
```

**⚠️ IMPORTANT: Open `.xcworkspace` NOT `.xcodeproj`**

### **Step 3: Configure Xcode**

When Xcode opens:

1. **Select Target Device**:
   - Top left: Click where it says "App" 
   - Choose a simulator (e.g., "iPhone 15 Pro")

2. **Set Team (for running on device)**:
   - Left panel: Click "App" project
   - Under "Signing & Capabilities"
   - Team: Select your Apple ID or "Personal Team"

3. **Run the App**:
   - Click the ▶️ Play button (or Cmd+R)
   - Simulator will launch automatically

### **Step 4: For Live Reload Development**

If you want to make changes and see them instantly:

```bash
# Terminal 1: Start Quasar dev server
quasar dev

# Terminal 2: Sync changes to iOS
cd src-capacitor
npx capacitor sync ios
```

Then run in Xcode simulator.

## 🔧 **Alternative: Use Capacitor CLI Directly**

```bash
# Build the web app
quasar build

# Sync to iOS
cd src-capacitor
npx capacitor sync ios

# Open in Xcode
npx capacitor open ios
```

## 📱 **Testing on Physical iPhone**

1. **Connect iPhone** via USB
2. **Trust Computer** on iPhone
3. **Select iPhone** as target in Xcode
4. **Click Run** ▶️

## 🐛 **Common Issues & Solutions**

### **Issue: "App" folder appears empty**
**Solution**: Open `.xcworkspace` file, not `.xcodeproj`

### **Issue: "No signing certificate"**
**Solution**: 
- Xcode → Preferences → Accounts
- Add your Apple ID
- Select "Personal Team" in project settings

### **Issue: "Simulator not starting"**
**Solution**:
- Xcode → Window → Devices and Simulators
- Add a new simulator
- Try iPhone 15 or 14 Pro

### **Issue: "White screen in simulator"**
**Solution**:
```bash
# Clean and rebuild
quasar clean
quasar build -m capacitor -T ios
```

## ✅ **Verification Steps**

Your app is working correctly if you see:
- ✅ Sauron login screen
- ✅ Modern UI with split layout (branding + form)
- ✅ Responsive design
- ✅ Touch interactions work
- ✅ No white screen or errors

## 🚀 **Quick Start Command**

**Copy & paste this complete sequence:**

```bash
# 1. Build the app
quasar build -m capacitor -T ios

# 2. Open Xcode
open src-capacitor/ios/App/App.xcworkspace

# 3. In Xcode: Select iPhone simulator → Click Play ▶️
```

**That's it! Your beautiful Sauron app will run on iOS! 📱**