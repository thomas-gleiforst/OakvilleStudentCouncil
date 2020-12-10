import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          AllMember: {
            screens: {
              AllMemberScreen: "one",
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: "two",
            },
          },
          CreateEvent: {
            screens: {
              CreateEventScreen: "three",
            },
          },
          CreateUser: {
            screens: {
              CreateUserScreen: "four",
            },
          },
          Home: {
            screens: {
              HomeScreen: "five",
            },
          },
          Main: {
            screens: {
              MainScreen: "six",
            },
          },
          MeetingStat: {
            screens: {
              MeetingStatScreen: "seven",
            },
          },
          QRCode: {
            screens: {
              QRCodeScreen: "eight",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
