var uri;

if (process.env.NODE_ENV === "development") {
  uri = "localhost://8080/";
} else if (process.env.NODE_ENV === "production") {
  uri =
    "https://itsamazing-itsamazing.apps.us-east-2.online-starter.openshift.com/";
}
