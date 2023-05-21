import React, { useEffect } from "react";

import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import NLWLogo from "../src/assets/logo.svg";
import { api } from "../src/lib/api";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/6c1e659c8b2896add7f2",
};

export default function App() {
  const router = useRouter();

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "6c1e659c8b2896add7f2",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "testprojectmobile",
      }),
    },
    discovery
  );

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post("/register", {
      code,
    });

    const { token } = response.data;

    await SecureStore.setItemAsync("token", token);

    router.push("/memories");
  }

  useEffect(() => {
    console.log(
      "teste",
      makeRedirectUri({
        scheme: "testprojectmobile",
      })
    );
    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View className=" flex-1 items-center  px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center  text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  );
}
