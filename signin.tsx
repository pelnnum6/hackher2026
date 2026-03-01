import { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = '852536999408-76dole4qkedns9s6qo6svsnkicf8mdgv.apps.googleusercontent.com'

export default function SignInScreen({ navigation }: { navigation: any }) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: WEB_CLIENT_ID,
        redirectUri: 'https://auth.expo.io/@p_chan26/hackher2026',
        scopes: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/gmail.readonly',
        ]
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential).then((userCredential) => {
                const user = userCredential.user;
                const token = response.authentication?.accessToken;
                navigation.navigate('ExEmail', { user, token });
            });
        }
    }, [response]);

    // const fetchUserInfo = async (token: string) => {
    //     const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    //         headers: { Authorization: `Bearer ${token}` },
    //     });

    //     const user = await res.json();
    //     console.log(user);

    //     navigation.navigate('ExEmail', { user, token });
    // };

    //this part is just basic styling for now
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Breakup Security Kit</Text>
            <Button
                title="Sign in with Google"
                disabled={!request}
                onPress={() => promptAsync()}
            />
        </View>
    );
}