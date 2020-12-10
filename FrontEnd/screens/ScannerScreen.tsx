import React, { useEffect, useState } from 'react'
import { View, Text, Vibration, StyleSheet, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Navigation from '../navigation'

export default function Scanner({ navigation }: any) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [scannedItem, setScannedItem] = useState({ type: null, data: null })

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      await setHasCameraPermission(status === 'granted')
      await resetScanner()
    })()
  }, [])

  const resetScanner = () => {
    setScannedItem({ type: null, data: null })
  }

  const onBarCodeRead = ({ type, data }) => {
    if (scannedItem.data == null) {
      Vibration.vibrate()
      setScannedItem({ data, type })
      
      // add points
      navigation.goBack()
      Alert.alert("5 points added")

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
