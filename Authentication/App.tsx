/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // Set an initializing state Fwhilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<string>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  useEffect(() => {
    // Update the document title using the browser API
    GoogleSignin.configure({
      webClientId: '169465656219-eamrb5d45c734n8ftau1434r879s982g.apps.googleusercontent.com',
    });
  }, []);

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // // Handle user state changes
  // function onAuthStateChanged(user: any) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  //  if (initializing) return null;

  // if (!user) {
  //   return (
  //     <View>
  //       <Text style={{fontSize:50, color:'black', backgroundColor:'white'}}>Login</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      />
      <View
        style={{ backgroundColor: 'blue', flex: 1, justifyContent: 'center' }}
      >
        {
          Platform.OS == 'ios' ?
          null
            // <Pressable
            //   onPress={appleLogin}
            //   style={styles.logginButton}>

            //   <Image style={{ height: 25, width: 25, marginRight: 10, borderRadius: 10 }}
            //     source={{ uri: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png' }}></Image>
            //   <Text style={{
            //     color: 'black',
            //     fontSize: 18,
            //   }}>Sign in with Apple</Text>
            // </Pressable>
            : null
        }

        <Pressable
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          style={styles.logginButton}>

          <Image style={{ height: 25, width: 25, marginRight: 10, borderRadius: 10 }}
            source={{ uri: 'https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png' }}></Image>
          <Text style={{
            color: 'black',
            fontSize: 18,
          }}>Sign in with Google</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );


}

const appleLogin = () => {
  console.warn('apple login')
}

async function onGoogleButtonPress() {

  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  console.warn('Success login')
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const styles = StyleSheet.create({
  logginButton: {
    height: 40,
    backgroundColor: 'white',
    marginLeft: 20, marginRight: 20, marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row', alignItems: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
