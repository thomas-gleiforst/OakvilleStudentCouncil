import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Vibration, StyleSheet, Alert, Platform } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Navigation from '../navigation'
import UserContext from "../UserContext"

export default function Scanner({ navigation }: any) {
  const userContext = useContext(UserContext)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [scannedItem, setScannedItem] = useState({ type: null, data: null })

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasCameraPermission(status === 'granted')
        await resetScanner()
      }
    })()
  }, [])

  const resetScanner = () => {
    setScannedItem({ type: null, data: null })
  }

  const onBarCodeRead = ({ type, data }: any) => {
    if (scannedItem.data == null) {
      Vibration.vibrate()
      setScannedItem({ data, type })
      
      fetch("http://localhost:8080/markAttended", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: userContext.email, //global email,
          eventID: data.split("-")[0],
        }),
      })

      // add points
      navigation.goBack()
      Alert.alert("Points added")

      setTimeout(resetScanner, 1000)

    }
  }

  const renderMessage = () => {
    if (scannedItem && scannedItem.type) {
      const { type, data } = scannedItem
      return (
        <Text style={styles.scanScreenMessage}>
          {`Scanned \n ${type} \n ${data}`}
        </Text>
      )
    }
    return (
      <Text style={styles.scanScreenMessage}>Focus the barcode to scan.</Text>
    )
  }

  if (Platform.OS === "web") {
    return <Text>No access to camera on Web clients</Text>
  }
  
  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={onBarCodeRead}
          style={StyleSheet.absoluteFill}
          barCodeTypes={["qr"]}
        />
        {renderMessage()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  scanScreenMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
